import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./OrderList.scss";

function OrderList() {
  const [orderList, setOrderList] = useState();
  const [page, setPage] = useState(0);
  const [isDelivered, setIsDelivered] = useState([]);

  const navigate = useNavigate();

  const handleDeleteOrder = (slug) => {
    axios
      .delete(`/restaurant/order/deleteOrder/${slug}`)
      .then((res) => {
        const index = orderList.findIndex((item) => {
          return item._id === slug;
        });
        orderList.splice(index, 1);
        setOrderList([...orderList]);
        toast("Xoá order thành công");
      })
      .catch(() => toast("Không thể xoá order"));
  };

  const handleSelect = (value, id) => {
    if (isDelivered.includes(id) == true ) {
      const indexId = isDelivered.findIndex(e => e == id)
      const newDelivered = isDelivered.splice(indexId, 1)
      setIsDelivered([...newDelivered])
      console.log(isDelivered);
    } else {
      const newDelivered = isDelivered
      newDelivered.push(id)
      setIsDelivered([...newDelivered])
      console.log("id", isDelivered);
    }
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
                      <select
                        className="statusDeliver"
                        onChange={(e) =>
                          handleSelect(e.target.value, order?._id)
                        }
                      >
                        <option value={false}>Chưa giao</option>
                        <option value={true}>Đã giao hàng</option>
                      </select>
                      <button className="deliveredBtn">Lưu</button>
                    </div>
                  )}
                </td>
                <td
                  className="tdOrder tdDelete"
                  onClick={() => handleDeleteOrder(order?._id)}
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
    </div>
  );
}

export default OrderList;
