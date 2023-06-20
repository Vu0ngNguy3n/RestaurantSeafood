import Header from "../components/header"
import SideBar from "./SideBar"
import styles from './DefaultLayout.module.scss'


function DefaultLayout({children}){
    return (
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <SideBar />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
}

export default DefaultLayout