import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./AddSeafood.scss";

function AddSeafood() {
  const [typesSeafood, setTypesSeafood] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (name == "" || price === undefined) {
      toast("Vui long dien day du thong tin hai san!!!");
    } else {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "seafood");
      data.append("cloud_name", "dggciohw8");

      fetch("https://api.cloudinary.com/v1_1/dggciohw8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const newSeafood = {
            seafoodType: type,
            name: name,
            price: price,
            img: data.url,
          };
          axios
            .post("/restaurant/seafood/", newSeafood)
            .then((res) => {
              toast(`Đã thêm Hải sản ${name} thành công!!!`);
              navigate("/admin/home");
            })
            .catch(console.log("Khong the them"));
        });
    }
  };

  useEffect(() => {
    axios
      .get("/restaurant/typeSeafood")
      .then((res) => {
        setTypesSeafood(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="addSeafood">
      <div className="card">
        <div className="inputRow">
          <label>Tên hải sản</label>
          <input
            placeholder="Nhập tên hải sản..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputRow">
          <label>Loại hải sản </label>
          <select name="typeSeafood" onChange={(e) => setType(e.target.value)}>
            {typesSeafood.map((item, index) => (
              <option name="typeSeafood" key={index} value={item?.seafoodType}>
                {item?.seafoodName}
              </option>
            ))}
          </select>
        </div>
        <div className="inputRow">
          <label>Giá bán</label>
          <input
            placeholder="Nhập giá hải sản..."
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="inputRow">
          <label>Ảnh Hải sản</label>
          <input
            type="file"
            placeholder="Nhập giá hải sản..."
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
            
        </div>
        <div className="inputButton">
          <button onClick={handleAdd}>Thêm</button>
          <button onClick={() => navigate("/admin/home")}>Trở về </button>
        </div>
      </div>
    </div>
  );
}
export default AddSeafood;
