import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { resetItem } from "../../actions/cartAction";
import "./Payment.scss";

function Payment() {
  const cartList = useSelector((state) => state.cart);
  const [seafoodPrice, setSeafoodPrice] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [hometown, setHometown] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [typePay, setTypePay] = useState(0);
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    cartList.forEach((cart) => {
      total = total + cart.totalPrice;
    });
    setSeafoodPrice(total);
  }, [cartList]);

  const handlePayment = () => {
    if (
      name == "" ||
      address == "" ||
      hometown == "" ||
      email == "" ||
      phone == ""
    ) {
      toast("Vui lòng điền tất cả thông tin thanh toán");
    } else if (account.username !== undefined) {
      const userPayment = {
        name: name,
        address: address,
        hometown: hometown,
        email: email,
        phone: phone,
        typePay:
          typePay == 0 ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng",
        cart: cartList,
        totalCart: seafoodPrice,
        delivered: false,
        customer: account.username,
      };
      axios
        .post("/restaurant/order/addOrder", userPayment)
        .then((res) => {
          axios
            .post("/restaurant/mail", userPayment)
            .then((res) => {
              toast(
                "Đặt hàng thành công, thông tin đơn hàng sẽ được gửi qua mail và sđt của bạn"
              );
              const action = resetItem();
              dispatch(action);
              navigate("/");
            })
            .catch(() => toast("Có lỗi khi đặt hàng "));
        })
        .catch(() => toast("CO loi"));
    } else {
      toast("Vui lòng đăng nhập để đặt hàng!!");
      navigate("/login");
    }
  };

  return (
    <div className="paymentContent">
      <div className="leftPayment">
        <h2>Thông tin thanh toán</h2>
        <div className="paymentInput">
          <label>
            Họ Và Tên <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="paymentInput">
          <label>
            Địa Chỉ <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="paymentInput">
          <label>
            Tỉnh/ Thành Phố <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
          />
        </div>
        <div className="paymentInput">
          <label>
            Email <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="paymentInput">
          <label>
            Số điện thoại <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input
            value={phone}
            type="number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button onClick={() => navigate("/cart")}>Quay lại giỏ hàng</button>
      </div>

      <div className="rightPayment">
        <h2>ĐƠN HÀNG CỦA BẠN</h2>
        <div className="paymentDetail">
          <div className="titleDetail">
            <label>SẢN PHẨM</label>
            <label>TẠM TÍNH</label>
          </div>
          <hr />
          <div className="paymentPrice">
            {cartList.map((cart) => {
              return (
                <div className="detailPrice">
                  <h5>
                    {cart.name} x {cart.total}
                  </h5>
                  <span style={{ textAlign: "right" }}>
                    {cart.totalPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                    VNĐ
                  </span>
                </div>
              );
            })}
          </div>
          <hr />
          <div className="totalPrice">
            <h5>Tạm tính</h5>
            <span>
              {seafoodPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
              VNĐ
            </span>
          </div>
          <hr />
          <div className="totalPrice">
            <h5>Giao hàng</h5>
            <span style={{ color: "#ccc" }}>Đồng giá</span>
          </div>
          <hr />
          <div className="totalPrice">
            <h5>Tổng</h5>
            <span>
              {seafoodPrice?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
              VNĐ
            </span>
          </div>
          <hr />
          <div className="typePayment">
            <div className="banking">
              <div className="bankingTitle">
                <input
                  type={"radio"}
                  name="pay"
                  id="banking"
                  onClick={() => setTypePay(0)}
                  checked
                />
                <label
                  htmlFor="banking"
                  style={{
                    marginBottom: "0",
                    marginLeft: "10px",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  Chuyển khoản ngân hàng
                </label>
              </div>
              <h4>
                Quý khách chuyển tiền vui lòng ghi nội dung thanh toán ” Tên
                nick Facebook” Sau đó gửi ảnh chụp thanh toán thành công và gửi
                vê Fanpage Vương Nguyễn https://www.facebook.com/vuongnguyen282.
                Chúng tôi sẽ liên hệ lại và xác nhận đơn hàng
                <br />
              </h4>
              <span>STK: 10087209504</span>
              <span>Người Thụ Hưởng: Nguyễn Văn Vương</span>
            </div>
            <hr />
            <div className="money">
              <div className="bankingTitle">
                <input
                  type={"radio"}
                  name="pay"
                  id="banking1"
                  onClick={() => setTypePay(1)}
                />
                <label
                  htmlFor="banking1"
                  style={{
                    marginBottom: "0",
                    marginLeft: "10px",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Thanh toán khi nhận hàng
                </label>
              </div>
            </div>
          </div>
          <div className="confirmPayment">
            <button onClick={() => handlePayment()}>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
