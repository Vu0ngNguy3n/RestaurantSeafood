import { useEffect } from "react";
import { useState } from "react";
import "./ContentDashboard.scss";
import axios from "axios";
import { useNavigate } from "react-router";

function ContentDashboard() {
  const [seafoods, setSeafood] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("/restaurant/seafood/")
      .then((res) => {
        const seafoodsList = res.data;
        setSeafood(seafoodsList);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="contentDashboard">
      <div className="card" onClick={() => navigate("/admin/addSeafood")}>
        <img src="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg" />
        <h3>Thêm hải sản</h3>
      </div>
      {seafoods.map((item, index) => (
        <div className="card" key={index} >
          <img src={item.img} alt={item.name} />
          <h3 onClick={() => navigate(`/admin/editSeafood/${item._id}`)}>
            {item.name} <i class="fa-solid fa-pen-to-square"></i>
          </h3>
          <span>
            {item.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      ))}
      <div className="card" onClick={() => navigate("/admin/addSeafood")}>
        <img src="https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg" />
        <h3>Thêm hải sản</h3>
      </div>
    </div>
  );
}

export default ContentDashboard;
