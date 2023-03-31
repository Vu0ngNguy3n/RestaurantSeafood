import styles from "./Squid.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

function Squid() {
  return (
    <div className={styles.squid}>
      <div className={styles.left}>
        <div className={styles.squidtitle}>
          <p>
            <FontAwesomeIcon icon={faShoppingBag} /> SHOP MỰC
          </p>
          <hr />
        </div>
        <div className={styles.squidlist}>
          <div className={styles.squidItems}>
            <img src="https://haisantuyhoa.com/wp-content/uploads/2021/11/Muc-la-lon.jpg" />
            <b>Mực lá tươi sống</b>
            <br />
            <span>450.000đ/kg</span>
          </div>
          <div className={styles.squidItems}>
            <img src="https://danviet.mediacdn.vn/thumb_w/650/296231569849192448/2022/3/23/muc-nhay-la-muc-gi-1648018071890398617865.png" />
            <b>Mực nháy tươi sống</b>
            <br />
            <span>500.000đ/kg</span>
          </div>
          <div className={styles.squidItems}>
            <img src="http://haisancongminh.com/wp-content/uploads/2020/10/img_7849_7b272acbfee846f4acded4fb388576a4_master.jpg" />
            <b>Mực trứng hấp dẫn</b>
            <br />
            <span>400.000đ/kg</span>
          </div>
        </div>
        <div className={styles.squidcontent}>
          <img src="https://img.freepik.com/premium-photo/seafood-banner-raw-saury-fish-squid-top-view-free-space-your-text_187166-54901.jpg?w=2000" />
        </div>
      </div>
      <div className={styles.right}>
        <img src="https://thumbs.dreamstime.com/z/squid-seafood-vintage-icon-label-logo-print-sticker-meat-restaurant-butchery-shop-poster-text-typography-silhouette-160975945.jpg" />
      </div>
    </div>
  );
}
export default Squid;
