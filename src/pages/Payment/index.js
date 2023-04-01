import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./Payment.scss";

function Payment() {
  const cartList = useSelector((state) => state.cart);
  const [seafoodPrice, setSeafoodPrice] = useState();
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [hometown, setHometown] = useState('')
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    let total = 0;
    cartList.forEach((cart) => {
      total = total + cart.totalPrice;
    });
    setSeafoodPrice(total);
  }, [cartList]);

  return (
    <div className="paymentContent">
      <div className="leftPayment">
        <h2>Thông tin thanh toán</h2>
        <div className="paymentInput">
          <label>
            Họ Và Tên <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="paymentInput">
          <label>
            Địa Chỉ <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={address} onChange={e=> setAddress(e.target.value)}/>
        </div>
        <div className="paymentInput">
          <label>
            Tỉnh/ Thành Phố <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={hometown} onChange={e => setHometown(e.target.value)}/>
        </div>
        <div className="paymentInput">
          <label>
            Số điện thoại <span style={{ color: "#f9004d" }}>*</span>
          </label>
          <input value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <button onClick={() => navigate('/cart')}>Quay lại giỏ hàng</button>
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
                  <span>{cart.totalPrice}VNĐ</span>
                </div>
              );
            })}
          </div>
          <hr />
          <div className="totalPrice">
            <h5>Tạm tính</h5>
            <span>{seafoodPrice}VNĐ</span>
          </div>
          <hr />
          <div className="totalPrice">
            <h5>Giao hàng</h5>
            <span style={{ color: "#ccc" }}>Đồng giá</span>
          </div>
          <hr />
          <div className="totalPrice">
            <h5>Tổng</h5>
            <span>{seafoodPrice}VNĐ</span>
          </div>
          <hr />
          <div className="typePayment">
            <div className="banking">
              <div className="bankingTitle">
                <input type={"radio"} name="pay" id="banking" checked />
                <h2 htmlFor='banking' style={{ marginBottom: "0", marginLeft: "10px" }}>
                  {" "}
                  Chuyển khoản ngân hàng
                </h2>
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
                <input type={"radio"} name="pay" />
                <h2 style={{ marginBottom: "0", marginLeft: "10px" }}>
                  Thanh toán khi nhận hàng
                </h2>
              </div>
            </div>
          </div>
          <div className="confirmPayment">
            <button>ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
