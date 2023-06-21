import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import './ChangePassword.scss'

function ChangePassword(){

    const [username, setUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [confirmPass2, setConfirmPass2] = useState('')
    const [isCorrect, setIsCorrect] = useState('true')
    const [accounts, setAccounts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/restaurant/account")
            .then((res) => {
                setAccounts(res.data);
            })
            .catch((err) => console.log(err));
    },[])

    useEffect(() => {
        confirmPass !== confirmPass2?setIsCorrect(false):setIsCorrect(true) 
    },[confirmPass2, confirmPass])

    const handleChangePassword = () =>{
        // confirmPass !== confirmPass2?setIsCorrect(false):setIsCorrect(true) 
        if(username  === '' || oldPassword === '' || confirmPass === '' || confirmPass2 === '' ){
            toast("Vui lòng không để rỗng thông tin")
        }else if(isCorrect===true){
            const account = accounts.find(acc => {
                return acc.username === username && acc.password === oldPassword
            })
            if(account === undefined){
                toast("Tài khoản hoặc mật khẩu không đúng")
            }else{
                    const saveAccount = {username: username, password: confirmPass}
                    axios
                    .put("/restaurant/account/changePassword",saveAccount)
                    .then((res) => {
                        toast("Bạn đã đổi mật khẩu thàng công!");
                        navigate('/login')
                    })
                    .catch(() => toast("Có lỗi khi đổi mật khẩu"))
            }
        }
    }

    return (
        <div className='container'>
            <div className='rememberPass'>
                <h2>Đổi Mật Khẩu</h2>
                <div className='input'>
                    <label htmlFor='username'>Tên tài khoản</label>
                    <input 
                    placeholder='Nhập tên tài khoản'
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value= {username}
                    />
                </div>
                <div className='input'>
                    <label htmlFor='oldPassword'>Mật khẩu cũ</label>
                    <input 
                    placeholder='Nhập mật khẩu cũ'
                    id="oldPassword"
                    type={"password"}
                    onChange={(e) => setOldPassword(e.target.value)}
                    value = {oldPassword}
                    />
                </div>
                <div className='input'>
                    <label htmlFor='confirmPass'>Mật khẩu mới</label>
                    <input 
                    placeholder='Nhập mật khẩu mới'
                    id="confirmPass"
                    type={"password"}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    value = {confirmPass}
                    />
                    {isCorrect?"":<label style={{color: "red"}}>Mật khẩu không trùng khớp</label>}
                </div>
                <div className='input'>
                    <label htmlFor='confirmPass2'>Nhập lại mật khẩu </label>
                    <input 
                    placeholder='Xác nhận mật khẩu mới'
                    id="confirmPass2"
                    type={"password"}
                    onChange={(e) => setConfirmPass2(e.target.value)}
                    value = {confirmPass2}
                    />
                    {isCorrect?"":<label style={{color: "red"}}>Mật khẩu không trùng khớp</label>}
                </div>
                <div className='handle'>
                    <button className='changeBtn' onClick={handleChangePassword}>Đổi mật khẩu</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
