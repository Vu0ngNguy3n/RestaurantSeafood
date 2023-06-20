import React from "react";
import CarouselImage from "../../components/Layout/components/carousel";
import BestSeller from "./BestSeller";
import styles from "./Home.module.scss";

function Home() {
  return (
    <React.Fragment>
      <CarouselImage />
      <div className={styles.policy}>
        <button>
          <div className={styles.left}>
            <img
              src="https://haisanhuubo.com/wp-content/uploads/2019/09/icon-chat-luong.png"
              class="attachment-medium size-medium"
              alt="icon-chat-luong"
              loading="lazy"
            />
          </div>
          <div className={styles.right}>
            <p>Cam Kết</p>
            <span>Sản phẩm chất lượng</span>
          </div>
        </button>

        <button>
          <div className={styles.left}>
            <img
              width="187"
              height="153"
              src="https://haisanhuubo.com/wp-content/uploads/2019/09/211-2115126_delivery-time-ios-7-interface-symbol-comments-thi.png"
              class="attachment-medium size-medium"
              alt="Giao hàng"
              loading="lazy"
            />
          </div>
          <div className={styles.right}>
            <p>Giao Hàng</p>
            <span>Nhanh chóng toàn quốc</span>
          </div>
        </button>

        <button>
          <div className={styles.left}>
            <img
              width="187"
              height="188"
              src="https://haisanhuubo.com/wp-content/uploads/2019/09/24h-icon2.png"
              class="attachment-medium size-medium"
              alt="Miễn phí vận chuyển"
              loading="lazy"
              srcset="https://haisanhuubo.com/wp-content/uploads/2019/09/24h-icon2.png 187w, https://haisanhuubo.com/wp-content/uploads/2019/09/24h-icon2-100x100.png 100w, https://haisanhuubo.com/wp-content/uploads/2019/09/24h-icon2-150x150.png 150w"
              sizes="(max-width: 187px) 100vw, 187px"
            />
          </div>
          <div className={styles.right}>
            <p>Free Giao Hàng</p>
            <span>Cho đơn hàng {'>'} 3.000.000đ</span>
          </div>
        </button>

        <button>
          <div className={styles.left}>
            <img
              width="187"
              height="187"
              src="https://haisanhuubo.com/wp-content/uploads/2019/09/1521127848_iconthanhtoan.png"
              class="attachment-medium size-medium"
              alt="Thanh toán"
              loading="lazy"
              srcset="https://haisanhuubo.com/wp-content/uploads/2019/09/1521127848_iconthanhtoan.png 187w, https://haisanhuubo.com/wp-content/uploads/2019/09/1521127848_iconthanhtoan-100x100.png 100w, https://haisanhuubo.com/wp-content/uploads/2019/09/1521127848_iconthanhtoan-150x150.png 150w"
              sizes="(max-width: 187px) 100vw, 187px"
            />
          </div>
          <div className={styles.right}>
            <p>Thanh Toán</p>
            <span>Thanh toán khi đặt hàng</span>
          </div>
        </button>
      </div>
      <BestSeller/>
    </React.Fragment>
  );
}

export default Home;
