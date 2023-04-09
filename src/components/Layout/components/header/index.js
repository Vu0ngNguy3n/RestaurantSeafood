import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner, faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {default as Image} from './seafood.png'
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate()
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
          </Link>
          <button className={styles.loginBtn} onClick={() => navigate('/admin/home')}>
            <p>Quản lí</p>
          </button>
          <button className={styles.loginBtn}>
            <p>Đăng nhập</p>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
