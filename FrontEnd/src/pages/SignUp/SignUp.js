import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./SignUp.scss";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      displayName === ""
    ) {
      toast("Các thông tin người dùng không được để trống");
    } else if (password !== confirmPassword) {
      toast("Mật khẩu và xác nhận mật khẩu phải trùng khớp!");
    } else {
      axios
        .get(`/restaurant/account/isExistAccount/${username}`)
        .then((res) => {
          if (res.data == false) {
            const newAccount = {
              username: username,
              password: password,
              displayName: displayName,
              role: 1,
            };
            axios
              .post(`/restaurant/account/createAccount`, newAccount)
              .then((res) => {
                toast("Tạo tài khoản thành công!");
                navigate("/");
              })
              .catch((err) => toast("Không thể tạo tài khoản"));
          }
        })
        .catch((err) => toast(err));
    }
  };
  return (
    <div className="container">
      <div className="loginContent">
        <div className="leftContent">
          <h1>Sign Up</h1>
          <img src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg" />
          <h2>Privacy policy {"&"} Term of service</h2>
        </div>
        <div className="rightContent">
          <div className="input">
            <label htmlFor="mail">Username: </label>
            <input
              placeholder="Enter Username "
              id="mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              placeholder="Password"
              type={"password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              placeholder="Confirm Password"
              type={"password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="displayName">Display Name: </label>
            <input
              placeholder="Enter Display Name"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="handle">
            <button onClick={() =>  navigate("/login")}><i class="fa-solid fa-arrow-left"></i></button>
            <button onClick={() => handleSignUp()}>Đăng Ký</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
