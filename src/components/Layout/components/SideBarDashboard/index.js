import axios from "axios";
import { useEffect, useState } from "react";
import "./SideBarDashboard.scss";

function SideBarDashboard() {
  const [seafoodName, setSeafoodName] = useState([]);

  useEffect(() => {
    axios
      .get("/restaurant/typeSeafood")
      .then((res) => {
        const typeList = res.data;
        setSeafoodName(typeList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sidebarDashboard">
        <h2>Quản lí các loại hải sản</h2>
      {seafoodName.map((item, index) => {
        return <p key={index}>{item.seafoodName}</p>;
      })}
    </div>
  );
}

export default SideBarDashboard;
