import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "./EditSeafood.scss";

function EditSeafood() {
  const [seafood, setSeafood] = useState({});
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState();

  const { slug } = useParams();
  const navigate = useNavigate();

  const handleSave = () => {
    const newSeafood = {
        _id:seafood._id,
      seafoodType: type,
      name: name,
      price: price,
      img: seafood.img,
    };
    axios.put("/restaurant/seafood/update",newSeafood)
    .then(res => {
        toast(`${seafood.name} đã được chỉnh sửa thành công`);
        setSeafood(res.data)
        navigate('/admin/home')
    })
    .catch(err => {
        toast('Có lỗi khi chỉnh sửa!!')
        console.log(err)
    })
  };

  const handleDelete = () => {
    axios.delete(`/restaurant/seafood/delete/${seafood._id}`)
    .then(res => {
        toast(`Xoá ${seafood.name} thành công`)
        navigate('/admin/home')
    }).catch(
        toast('Có lỗi khi xoá')
    )
  }

  useEffect(() => {
    axios
      .get(`/restaurant/typeSeafood`)
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`/restaurant/seafood/${slug}`)
      .then((res) => {
        setSeafood(res.data);
        setName(res.data.name)
        setType(res.data.seafoodType)
        setPrice(res.data.price)
      })
      .catch((err) => console.log(err));
  }, [slug]);

  return (
    <div className="editContent">
      <div className="card">
        <div className="inputRow">
          <label>Tên hải sản</label>
          <input
            placeholder="Nhập tên hải sản..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="inputRow">
          <label>Loại hải sản </label>
          <select
            name="typeSeafood"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((item, index) => (
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="inputRow">
          <label>Ảnh Hải sản</label>
          <input type="file" placeholder="Nhập giá hải sản..." />
        </div>
        <div className="inputButton">
          <button onClick={handleSave}>Lưu</button>
          <button onClick={() => navigate("/admin/home")}>Trở về </button>
          <button onClick={handleDelete}>Xoá</button>
        </div>
      </div>
    </div>
  );
}

export default EditSeafood;
