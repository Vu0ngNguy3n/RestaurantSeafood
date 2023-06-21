import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  addDetail,
  decreaseItem,
  increaseItem,
  removeItem,
} from "../../actions/cartAction";
import "./Cart.scss";

function Cart() {
  const cartList = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [itemCover, setItemCover] = useState(null);

  useEffect(() => {
    let newTotalPrice = 0;
    cartList.forEach((cart) => {
      newTotalPrice = newTotalPrice + cart.price * cart.total;
    });
    setTotal(newTotalPrice);
  }, [cartList]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToShop = () => {
    navigate("/");
  };

  const moveToDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handeIncrease = (item) => {
    const newItem = item;
    const action = increaseItem(newItem);
    dispatch(action);
    toast(`${item.name} đã được tăng lên ${item.total + 1} Kg!!!`);
  };
  const handeDecrease = (item) => {
    if (item.total !== 0) {
      const newItem = item;
      const action = decreaseItem(newItem);
      dispatch(action);
      toast(`${item.name} đã được giảm xuống ${item.total - 1} Kg!!!`);
    } else {
      toast(`Không thể giảm số lượng của ${item.name}`);
    }
  };
  const handleRemove = (item) => {
    const newItem = item;
    setItemCover(item);
    const action = removeItem(newItem);
    dispatch(action);
    toast(`Xoá ${newItem.name} khỏi giỏ hàng thành công!!!`);
  };

  const handleAdd = () => {
    const action = addDetail(itemCover);
    dispatch(action);
    toast(`Khôi phục ${itemCover.name} thành công`);
    setItemCover(null);
  };

  const handlePayment = () => {
    if(cartList[0]?.name === undefined){
      toast("Đơn hàng rỗng!!")
    }else{
      navigate("/payment");
    }
  };
  return (
    <div className="cartDetail">
      <h2>Shopping Cart</h2>
      <hr />
      <div className="cartContent">
        <div className="cartLeft">
          {itemCover !== null ? (
            <div className="cover">
              <p>"{itemCover.name}" đã bị xoá.</p>
              <span onClick={() => handleAdd()}>Khôi phục?</span>
            </div>
          ) : (
            ""
          )}
          <table>
            <thead>
              <th>SẢN PHẨM</th>
              <th>GIÁ</th>
              <th>SỐ LƯỢNG</th>
              <th>TỔNG</th>
              <th></th>
            </thead>
            <tbody>
              {cartList[0]?.name === undefined ? 'Giỏ hàng rỗng':''}
              {cartList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td onClick={() => moveToDetail(item?._id)} className="name" >
                      {item?.name}
                      <img  src={item?.img} alt=""/>
                    </td>
                    <td>
                      {item?.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                      VNĐ/kg
                    </td>
                    <td className="totalNumber">
                      <button
                        className="btnTotal"
                        onClick={() => handeDecrease(item)}
                      >
                        -
                      </button>
                      <span>{item?.total}</span>
                      <button
                        className="btnTotal"
                        onClick={() => handeIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      {item?.totalPrice?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                      VNĐ
                    </td>
                    <td>
                      <i
                        class="fa-sharp fa-regular fa-circle-xmark"
                        onClick={() => handleRemove(item)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="backToShop">
            <button onClick={() => backToShop()}>
              <i class="fa-solid fa-arrow-left"></i>
              <span>Tiếp tục xem sản phẩm</span>
            </button>
          </div>
        </div>
        <div className="cartRight">
          <h3>Tổng Giỏ Hàng</h3>
          <hr />
          <div className="temporaryPrice">
            <b>Tạm tính:</b>
            <span>
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}{" "}
              VNĐ
            </span>
          </div>
          <div className="temporaryPrice">
            <b>Giao hàng:</b>
            <span>
              Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.
            </span>
          </div>
          <div className="totalPrice">
            <b>Tổng:</b>
            <span>
              {total?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}{" "}
              VNĐ
            </span>
          </div>
          <hr />
          <button onClick={handlePayment}>Tiến hành thanh toán</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
