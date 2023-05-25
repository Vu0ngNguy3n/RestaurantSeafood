import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./OrderList.scss";

function OrderList() {
  const [orderList, setOrderList] = useState();
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [deleverId, setDeliverId] = useState()
  const [modalDeliver, setModalDeliver] = useState(false)

  const navigate = useNavigate();

  const handleClose = () => {
    setModalShow(false);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setModalShow(true);
  };

  const handleDeleteOrder = () => {
    axios
      .delete(`/restaurant/order/deleteOrder/${deleteId}`)
      .then((res) => {
        const index = orderList.findIndex((item) => {
          return item._id === deleteId;
        });
        orderList.splice(index, 1);
        setOrderList([...orderList]);
        setModalShow(false);
        toast("Xoá order thành công");
      })
      .catch(() => toast("Không thể xoá order"));
  };

  const handleCloseDeliver = () => {
    setModalDeliver(false)
  }

  const handleClickDeliver = (id) => {
    setDeliverId(id)
    setModalDeliver(true)
  }

  const setDelivered = () => {
    const newOrder = orderList?.find((item) => item._id == deleverId);
    newOrder.delivered = true;
    const index = orderList?.findIndex((item) => item._id == deleverId);
    orderList.splice(index, 1, newOrder);
    axios
      .post(`/restaurant/order/updateDelivered`, newOrder)
      .then((res) => {
        toast(
          `Đơn hàng ${deleverId} đã được chuyển sang trạng thái giao hàng thành công!!!`
        );
        setOrderList([...orderList]);
        setModalDeliver(false)
      })
      .catch((err) => toast("Không thể update"));
  };

  const handleInfo = (id) => {
    navigate(`/admin/orderInfo/${id}`);
  };

  useEffect(() => {
    axios
      .get("/restaurant/order/getOrderList")
      .then((res) => {
        const orders = res.data;
        console.log(res.data);
        setPage(Math.round(orders.length / 10) + 1);
        return setOrderList(orders);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orderListContainer">
      <h1 className="titleOrder">Danh sách đơn hàng </h1>
      <table className="tableOrder">
        <thead>
          <tr>
            <th className="thOrder">Tên tài khoản</th>
            <th className="thOrder">Tên khách hàng</th>
            <th className="thOrder">SĐT</th>
            <th className="thOrder">Email</th>
            <th className="thOrder">Hình thức thanh toán</th>
            <th className="thOrder">Tổng giá trị đơn hàng</th>
            <th className="thOrder">Vận chuyển</th>
            <th className="thOrder">Xoá</th>
            <th className="thOrder"></th>
          </tr>
        </thead>

        <tbody className="tbodyOrder">
          {orderList?.map((order, index) => {
            return (
              <tr className="trOrder" key={index}>
                <td className="tdOrder">
                  <i className="email">{order?.customer}</i>
                </td>
                <td className="tdOrder">
                  <i>{order?.name}</i>
                </td>
                <td className="tdOrder">
                  <i>{order?.phone}</i>
                </td>
                <td className="tdOrder">
                  <i className="emaili">{order?.email}</i>
                </td>
                <td className="tdOrder">
                  <i>{order?.typePay}</i>
                </td>
                <td className="tdOrder">
                  <i>
                    {order?.totalCart?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </i>
                </td>
                <td className="tdOrder">
                  {order?.delivered == true ? (
                    <i
                      style={{
                        color: "green",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      Giao hàng thành công
                    </i>
                  ) : (
                    <div className="delivered">
                      <i
                        style={{
                          color: "red",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        Đang giao hàng
                      </i>
                      <button
                        className="deliveredBtn"
                        onClick={() => handleClickDeliver(order?._id)}
                      >
                        Đã giao
                      </button>
                    </div>
                  )}
                </td>
                <td
                  className="tdOrder tdDelete"
                  onClick={() => handleClickDelete(order?._id)}
                >
                  <i class="fa-solid fa-trash-can"></i>
                </td>
                <td
                  className="tdOrder tdInfo"
                  onClick={() => handleInfo(order?._id)}
                >
                  <i class="fa-solid fa-circle-info"></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        className="modal-card"
        style={{ display: modalShow === true ? "flex" : "none" }}
      >
        <div className="card cardContentOrder">
          <h5 className="card-title">Xoá Đơn Hàng Này?</h5>
          <p className="card-text">Bạn chắc chắn muốn xoá đơn hàng này?</p>
          <div className="btnRow">
            <button className="btnSuccess" onClick={handleDeleteOrder}>
              Đồng ý
            </button>
            <button className="btnFail" onClick={handleClose}>
              Huỷ Bỏ
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal-card"
        style={{ display: modalDeliver === true ? "flex" : "none" }}
      >
        <div className="card cardContentOrder">
          <h5 className="card-title">Đơn hàng này đã được chuyển?</h5>
          <p className="card-text">Bạn chắc chắn đơn hàng này đã được vận chuyển thành công?</p>
          <div className="btnRow">
            <button className="btnSuccess" onClick={setDelivered}>
              Đồng ý
            </button>
            <button className="btnFail" onClick={handleCloseDeliver}>
              Huỷ Bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
