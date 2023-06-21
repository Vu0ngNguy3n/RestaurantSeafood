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
            <h3 onClick={() => navigate("/")}>
              <FontAwesomeIcon className={styles.icon} icon={faHouse} />
              Trang chủ
            </h3>
          </li>
          <li>
            <h3 onClick={() => navigate("/cart")}>
              <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
              Giỏ hàng
            </h3>
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
              <a className={styles.address} href="https://www.google.com/maps/place/Ch%E1%BB%A3+H%E1%BA%A3i+s%E1%BA%A3n+C%E1%BB%ADa+L%C3%B2/@18.8077607,105.7166993,17z/data=!3m1!4b1!4m6!3m5!1s0x3139d471c8830e93:0x6c7abeb80585df45!8m2!3d18.8077607!4d105.7192742!16s%2Fg%2F12vsljb4j?hl=vi-VN&entry=ttu">
                <FontAwesomeIcon
                  className={styles.iconcontact}
                  icon={faLocationDot}
                />
                Cửa Lò, Nghệ An
              </a>
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
