import styles from "./Shrimp.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
function Shrimp() {
  return (
    <div className={styles.shrimp}>
      <div className={styles.left}>
        <img src="https://img.freepik.com/free-vector/seafood-banners-design_1284-9776.jpg?w=2000" />
      </div>
      <div className={styles.right}>
        <div className={styles.rowContent}>
          <p>
            <FontAwesomeIcon
              className={styles.iconShopping}
              icon={faShoppingBag}
            />
            Shop Tôm
          </p>
        </div>
        <hr />
        <div className={styles.shrimpList}>
          <div className={styles.shrimpItems}>
            <img src="https://bienhalong.com/wp-content/uploads/2021/04/Tom-Su-Bien-1.jpg" />
            <b>Tôm sú tươi sống</b>
            <br />
            <span>600.000đ/kg</span>
          </div>
          <div className={styles.shrimpItems}>
            <img src="https://cf.shopee.vn/file/a2cfae493b412b804de47660842da623" />
            <b>Tôm rằn tươi sống</b>
            <br />
            <span>500.000đ/kg</span>
          </div>
          <div className={styles.shrimpItems}>
            <img src="https://tigfood.vn/wp-content/uploads/2022/02/tom-hum-nuong.jpg" />
            <b>Tôm hùm tươi sống</b>
            <br />
            <span>900.000đ/kg</span>
          </div>
        </div>
        <div className={styles.shrimpContent}>
          <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX50554772.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Shrimp;
