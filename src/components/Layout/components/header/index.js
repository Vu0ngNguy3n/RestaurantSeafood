import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner, faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {default as Image} from './seafood.png'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../actions/accountAction";
function Header() {
  const navigate = useNavigate()
  const account = useSelector(state => state.account)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleLogin = () =>{
    navigate('/login')
  }

  const handleLogout = () =>{
    const  account = {}
    const action = logout(account)
    dispatch(action)
    navigate('/login')
  }

  return (
    <header className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Image} />
          </Link>
        </div>
        <div className={styles.search}>
          <input placeholder="Tìm kiếm hải sản... " spellCheck={false} />
          <button className={styles.clear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <FontAwesomeIcon className={styles.loading} icon={faSpinner} />
          <button className={styles.searchBtn}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        <div className={styles.actions}>
          <Link to="/cart">
            <FontAwesomeIcon
              className={styles.cartShopping}
              icon={faCartShopping}
            />
            <span className={styles.dot}>{cart.length}</span>
          </Link>
          <button className={styles.loginBtn}>
            {account?.username === undefined
              ? ""
              : `Chào ${account?.displayName}`}
          </button>
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/admin/home")}
          >
            {account?.role === 0 ? <p>Quản lí</p> : ""}
          </button>
          {account?.username === undefined ? (
            <button className={styles.loginBtn} onClick={handleLogin}>
              <p>Đăng nhập</p>
            </button>
          ) : (
            <button className={styles.loginBtn} onClick={handleLogout}>
              <p>Đăng xuất</p>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
