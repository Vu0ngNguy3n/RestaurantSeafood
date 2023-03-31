import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { decreaseItem, increaseItem } from "../../actions/cartAction";
import "./Cart.scss";

function Cart() {
  const cartList = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  useEffect(() => {
      let newTotalPrice = 0;
      cartList.forEach((cart) => {
        console.log(cart.price * cart.total);
        newTotalPrice = newTotalPrice + cart.price * cart.total;
      });
      setTotal(newTotalPrice);
  }, [cartList]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backToShop = () => {
    navigate("/");
  };

  const handeIncrease = (item) => {
    const newItem = item;
    const action = increaseItem(newItem);
    dispatch(action);
    toast(`${item.name} đã được tăng lên ${item.total + 1} Kg!!!`)
  };
  const handeDecrease = (item) => {
    if(item.total !== 0){
      const newItem = item;
      const action = decreaseItem(newItem);
      dispatch(action);
      toast(`${item.name} đã được giảm xuống ${item.total - 1} Kg!!!`);
    }else{
      toast(`Không thể giảm số lượng của ${item.name}`);
    }
  };

  return (
    <div className="cartDetail">
      <h2>Shopping Cart</h2>
      <hr />
      <div className="cartContent">
        <div className="cartLeft">
          <table>
            <thead>
              <th>SẢN PHẨM</th>
              <th>GIÁ</th>
              <th>SỐ LƯỢNG</th>
              <th>TỔNG</th>
            </thead>
            <tbody>
              {cartList.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.price}VNĐ/kg</td>
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
                    <td>{item?.totalPrice}VNĐ</td>
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
            <span>{total}</span>
          </div>
          <div className="temporaryPrice">
            <b>Giao hàng:</b>
            <span>
              Tùy chọn giao hàng sẽ được cập nhật trong quá trình thanh toán.
            </span>
          </div>
          <div className="totalPrice">
            <b>Tổng:</b>
            <span>{total}</span>
          </div>
          <hr />
          <button>Tiến hành thanh toán</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
