import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./SideBarDashboard.scss";

function SideBarDashboard() {
  const [seafoodName, setSeafoodName] = useState([]);
  const [newType, setNewType] = useState('')
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    axios
      .get("/restaurant/typeSeafood")
      .then((res) => {
        const typeList = res.data;
        setSeafoodName(typeList);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAdd= () =>{
    const newId = seafoodName[seafoodName.length - 1].seafoodType+1;
    const addType = {
      seafoodType: newId,
      seafoodName: newType
    };
    axios.post("/restaurant/typeSeafood",addType)
    .then(res => {
      toast(`${newType} đã được thêm`)
      setSeafoodName([...seafoodName,addType])
      setIsAdd(!isAdd)
    })
    .catch(err => {
      console.log(err);
      toast('Khong the them ')
    })
  }

  return (
    <div className="sidebarDashboard">
      <h2>Quản lí các loại hải sản</h2>
      <ul>
        {seafoodName.map((item, index) => {
          return <li key={index}>{item.seafoodName}</li>;
        })}
        <li style={{ display: isAdd === true ? "" : "none" }}>
          <input placeholder="Thêm loại hải sản..." onChange={e => setNewType(e.target.value)}/>
          <button onClick={handleAdd}>Thêm</button>
        </li>
        <li onClick={() => setIsAdd(!isAdd)}>
          <i class="fa-solid fa-plus"></i> Thêm loại hải sản
        </li>
      </ul>
    </div>
  );
}

export default SideBarDashboard;
