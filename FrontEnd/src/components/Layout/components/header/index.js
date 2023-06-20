import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSpinner,
  faSearch,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { default as Image } from "./seafood.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../actions/accountAction";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const cart = useSelector((state) => state.cart);
  const [search, setSearch] = useState('')
  const [fullSeafood, setFullSeafood] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const dispatch = useDispatch();

   useEffect(()=>{
    axios.get("/restaurant/seafood")
    .then(res => {
      const bestSellers = res.data
      return setFullSeafood(bestSellers)
    })
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    const listSeafood = fullSeafood;
    const result = listSeafood.filter(item => {
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
    console.log(result);
    setSearchResult([...result])
  },[search])

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    const account = {};
    const action = logout(account);
    dispatch(action);
    navigate("/login");
  };

  const navigationDetail = (id) =>{
    navigate(`/detail/${id}`)
    setSearch('')
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
          <input 
          placeholder="Tìm kiếm hải sản... " 
          spellCheck={false} 
          onChange={(e)=> {setSearch(e.target.value)}}
          value={search} />
          <button className={styles.clear} onClick={() => setSearch('')}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          {/* <FontAwesomeIcon className={styles.loading} icon={faSpinner} /> */}
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
          <button
            className={styles.loginBtn}
            onClick={() =>
              account?.role === 0
                ? navigate("/admin/orderList")
                : navigate(`/userOrder/${account.username}`)
            }
          >
            <p>Đơn hàng</p>
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
      <div className={styles.searchBox} style={{display: search ==''?"none":"flex"}}> 
            <div className={styles.searchContent}>
                {searchResult?.length === 0 ? <p className={styles.noneResult}>Không có hải sản nào</p>:""}
                {searchResult?.map(item => {
                  return(
                     <div className={styles.card} onClick={() => navigationDetail(item?._id)}>
                      <img src={item?.img} />
                      <label >{item?.name}</label>
                    </div>
                  )
                })}
                
               
            </div>
      </div>
    </header>
  );
}

export default Header;
