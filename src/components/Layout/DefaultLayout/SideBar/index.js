import styles from "./SideBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faShrimp,
  faFishFins,
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

function SideBar() {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  const handleForward = (id) => {
    navigate(`/seafood/${id}`);
    window.scroll(0,0)
  };
  useEffect(() => {
    axios.get("http://localhost:8000/restaurant/typeSeafood")
    .then(res => {
      const types = res.data
      setTypes(types)
    })
    .catch(err => console.log(err))
  }, []); 
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarFixed}>
        <ul className={styles.menu}>
          <li>
            <Link to="/" className="homepageLi">
              <h3>
                <FontAwesomeIcon className={styles.icon} icon={faHouse} />
                <p>Trang chủ</p>
              </h3>
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <h3>
                <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
                Giỏ hàng
              </h3>
            </Link>
          </li>
          <li>
            <FontAwesomeIcon />
          </li>
        </ul>
        <hr className={styles.hr} />
        <div className={styles.listseafood}>
          <p>Hải sản Hồng Liên</p>
          <ul>
            {types.map((t) => {
              return (
                <li key={t?.seafoodType}>
                  <span onClick={() => handleForward(t?.seafoodType)}>
                    <FontAwesomeIcon
                      className={styles.seafoodicon}
                      icon={faShrimp}
                    />
                    Shop {t?.seafoodName}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <hr className={styles.hr} />
        <div className={styles.contact}>
          <p>Contact</p>
          <ul>
            <li>
              <span>
                <FontAwesomeIcon
                  className={styles.iconcontact}
                  icon={faPhone}
                />
                +84 888 637 937
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon
                  className={styles.iconcontact}
                  icon={faLocationDot}
                />
                Cửa Lò, Nghệ An
              </span>
            </li>
            <li>
              <span>
                <FontAwesomeIcon
                  className={styles.iconcontact}
                  icon={faEnvelope}
                />
                Vương Nguyễn
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
