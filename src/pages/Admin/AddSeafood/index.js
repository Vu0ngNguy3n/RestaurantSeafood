import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./AddSeafood.scss";

function AddSeafood() {
  const [typesSeafood, setTypesSeafood] = useState([]);
    const [name, setName] = useState('')
    const [type, setType]  = useState('')
    const [price, setPrice] = useState()
    const navigate = useNavigate()

    const handleAdd = () => {
        const newSeafood = {
          seafoodType: type,
          name: name,
          price: price,
          img: "https://haisantrungnam.vn/wp-content/uploads/2020/03/cua-hoang-de-king-crab-cua-huynh-de-cua-alaska-5-600x600.jpg",
        };
        axios.post("/restaurant/seafood/",newSeafood);
        toast(`Đã thêm Hải sản ${name} thành công!!!`)
        navigate('/admin/home')
    }

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
              <option name="typeSeafood" key={index} value={item.seafoodType}>
                {item.seafoodName}
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
          <input type="file" placeholder="Nhập giá hải sản..." />
        </div>
        <div className="inputButton">
          <button onClick={handleAdd}>Thêm</button>
          <button onClick={() => navigate('/admin/home')}>Trở về </button>
        </div>
      </div>
    </div>
  );
}
export default AddSeafood;
