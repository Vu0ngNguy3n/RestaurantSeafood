import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "./OrderInformation.scss";

function OrderInformation() {
  const [orderDetail, setOrderDetail] = useState({});
  const [cart, setCart] = useState([]);

  const { slug } = useParams();
  const navigate = useNavigate();

  const handleDeleteOrder = (slug) => {
    axios
      .delete(`/restaurant/order/deleteOrder/${slug}`)
      .then((res) => {
        toast("Xoá order thành công");
        navigate("/admin/orderList");
      })
      .catch(() => toast("Không thể xoá order"));
  };

  useEffect(() => {
    axios
      .get(`/restaurant/order/getOrderInfo/${slug}`)
      .then((res) => {
        const order = res.data;
        console.log(order?.cart);
        setCart(order?.cart);
        return setOrderDetail(order);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="userInfo card">
        <div className="userHeader">
          <h2>Thông tin khách hàng</h2>
        </div>
        <div className="userContent">
          <div className="userDetail">
            <i class="fa-solid fa-user"></i>
            {orderDetail?.name}
          </div>
          <div className="userDetail">
            <i class="fa-solid fa-house"></i>
            {orderDetail?.address}
          </div>
          <div className="userDetail">
            <i class="fa-solid fa-phone"></i>
            {orderDetail?.phone}
          </div>
          <div className="userDetail">
            <i class="fa-solid fa-location-dot"></i>
            {orderDetail?.hometown}
          </div>
          <div className="userDetail">
            <i class="fa-regular fa-envelope"></i>
            {orderDetail?.email}
          </div>
        </div>
      </div>
      <div className="product card">
        <table>
          <thead className="theadProduct">
            <th>#</th>
            <th>SẢN PHẨM</th>
            <th>SL</th>
            <th>GIÁ</th>
            <th>TỔNG</th>
          </thead>
          <tbody className="tbodyProduct">
            {cart.map((item, index) => {
              return (
                <tr key={index} className="trProduct">
                  <td>{index}</td>
                  <td>{item?.name}</td>
                  <td>{item?.total}</td>
                  <td>
                    {item?.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                  <td>
                    {item?.totalPrice?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              );
            })}
            <tr style={{ borderTop: "2px solid #ccc" }}>
              <td></td>
              <td></td>
              <td></td>
              <td className="tdFocus">Tổng giá tiền:</td>
              <td>
                {orderDetail?.totalCart?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="tdFocus">Đã cọc:</td>
              <td>
                {orderDetail?.totalCart?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="tdFocus">Số tiền còn lại:</td>
              <td>
                {orderDetail?.totalCart?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="handleAction">
        <div className="leftAction">
          <h2>Trạng thái đơn hàng:</h2>
          <label
            style={{ color: orderDetail?.delivered == true ? "green" : "red" }}
          >
            {orderDetail?.delivered == true ? "Đã giao" : "Chưa giao"}
          </label>
        </div>
        <div className="rightAction">
          <button onClick={() => handleDeleteOrder(orderDetail?._id)}>
            <i class="fa-solid fa-trash-can"></i>
            <label>Xoá đơn hàng</label>
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderInformation;
