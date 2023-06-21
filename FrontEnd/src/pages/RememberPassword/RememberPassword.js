import axios from "axios"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import "./RememberPassword.scss"

function RememberPassword(){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [confirmPass2, setConfirmPass2] = useState('') 
    const [statusPage, setStatusPage] = useState(1)
    const [codeDefault, setCodeDefault] = useState()

    const navigate = useNavigate()

    const createRandomNumber = () => {
        let resultCode =0;
        for (let index = 0; index < 6; index++) {
            resultCode+=(Math.random()*10)*(Math.pow(10,index));
        }
        setCodeDefault(Math.round(resultCode))
        return Math.round(resultCode)
    }

    const handleSendCode= () => {
        if(username.trim() === '' || email.trim() === ''){
            toast("Vui lòng điền thông tin tài khoản và email!!")
        }else{
            axios
            .get(`/restaurant/account/isExistAccount/${username}`)
            .then((res) => {
                if(res.data === true){
                    let resultCode =0;
                    for (let index = 0; index < 6; index++) {
                        resultCode+=(Math.random()*10)*(Math.pow(10,index));
                    }
                    setCodeDefault(Math.round(resultCode))
                    setStatusPage(2)
                }else{
                    toast("Tài khoản này không tồn tại")
                }
            })
            .then(err => toast(err))
        }
    }

    const handleChangePass = () => {
        if(+code !== +codeDefault){
            toast("Code không đúng!!")
        }else{
            setStatusPage(3)   
        }
    }

    const submitChange = () =>{ 
        if(confirmPass.trim() !== confirmPass2.trim()){
            toast("Mật khẩu không trùng khớp")
        }else{
            const account = {
                username: username,
                password: confirmPass
            }
            axios
            .put('/restaurant/account/changePassword',account)
            .then(res => {
                toast("Đổi mật khẩu thàng công")
                navigate('/login')
            })
            .then(err => toast(err))
        }
    }

    return (
    <React.Fragment>
        <div className="container rememberPage">
            <div className="rememberPassword" style={{display: statusPage === 1 ? "flex":"none"}}>
                <h2 className="titleRemember">Quên mật khẩu</h2>
                <div className="input">
                    <label htmlFor="username">Tên tài khoản</label>
                    <input
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="handleBtn">
                    <button onClick={handleSendCode}>Nhận mã xác nhận</button>
                </div>
            </div>
            <div className="receiveCode" style={{display: statusPage === 2 ? "flex":"none"}}>
                <h2 className="titleRemember">Xác Minh Code</h2>
                 <div className="input">
                    {codeDefault}
                    <label htmlFor="code">Code</label>
                    <input
                        id="code"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        type={"number"}
                    />
                </div>
                <div className="handleSubmitCode">
                    <button
                     onClick={() => {
                        setCode('')
                        setStatusPage(1)
                    }}
                     ><i class="fa-solid fa-arrow-left"></i></button>
                    <button onClick={() => handleChangePass()}>Xác nhận</button>
                </div>
            </div>
            <div className="changePass" style={{display: statusPage === 3 ? "flex":"none"}}>
                    <h2 className="titleRemember">Đổi Mật Khẩu</h2>
                    <div className="input">
                        <label htmlFor="confirmPass">Mật khẩu mới</label>
                        <input
                            id="confirmPass"
                            type={"password"}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            value={confirmPass}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="confirmPass2">Xác nhận mật khẩu mới</label>
                        <input
                            type={"password"}
                            id="confirmPass2"
                            onChange={(e) => setConfirmPass2(e.target.value)}
                            value={confirmPass2}
                        />
                    </div>
                    <div className="handleSubmitCode">
                        <button onClick={() => setStatusPage(2)}><i class="fa-solid fa-arrow-left"></i></button>
                        <button onClick={() => submitChange()}>Xác nhận</button>
                    </div>
            </div>
        </div>
    </React.Fragment>)
}

export default RememberPassword