import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginAccount } from '../../actions/accountAction';
import './Login.scss'

function Login() {
  const [accounts, setAccounts ] = useState([])
  const [usename, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(()=>{
    axios.get("/restaurant/account")
    .then(res => {
      setAccounts(res.data)
    })
    .catch(err => console.log(err))
  },[])

  const handleLogin =() =>{
    const findAccount = accounts.find(acc => {
      return acc.username === usename && acc.password === password
    })
    if(findAccount === undefined){
      toast('Sai tên tài khoản hoặc mật khẩu')
    }else{
      const action = loginAccount(findAccount)
      dispatch(action)
      toast('Đăng nhập thành công')
    }
  }
    return (
      <div className="container">
        <div className="loginContent">
          <div className="leftContent">
            <h1>Sign In</h1>
            <img src="https://daizdje8zyv90.cloudfront.net/wp-content/uploads/2016/12/Grilled-Clams-with-Charred-Jalapen%CC%83o-Basil-Butter-Half-Baked-Harvest.jpg" />
            <h2>Privacy policy {"&"} Term of service</h2>
          </div>
          <div className="rightContent">
            <div className="input">
              <label htmlFor="mail">Username: </label>
              <input placeholder="Enter Username " id="mail" value={usename}  onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className="input">
              <label htmlFor="password">Password:</label>
              <input placeholder="Password" type={"password"} id="password" value={password}  onChange={e => setPassword(e.target.value)}/>
            </div>
            <p
              style={{
                color: "#f9004d",
                textAlign: "left",
                fontSize: "12px",
                display: 'none'
              }}
            >
              Incorrect Email or Password
            </p>
            <p
              style={{
                color: "#f9004d",
                textAlign: "left",
                fontSize: "12px",
                display: 'none'
              }}
            >
              Account is Blocked
            </p>
            <div className="handle">
              <button onClick={handleLogin}>Đăng nhập</button>
              <a className="remember">Quên mật khẩu</a>
            </div>
            <div className="register">
              <b>Bạn chưa có tài khoản? </b>
              <p>Đăng ký</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login