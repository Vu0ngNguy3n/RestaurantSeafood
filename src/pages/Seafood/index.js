import { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { addToCart } from "../../actions/cartAction";
import { CartContext } from "../../App";
import "./seafood.scss";

function Seafood() {
  const [seafoodName, setSeafoodName] = useState("");
  const [listSeafood, setListSeafood] = useState([]);
  const { id } = useParams("id");
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const moveDetail = (id) =>{
    navigate(`/detail/${id}`)
  }

  useEffect(() => {
    const newId = parseInt(id);
    fetch("http://localhost:8000/types", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const seafoodName = data.find((d) => d.seafoodType === newId);
        setSeafoodName(seafoodName.seafoodName);
      });

    fetch("http://localhost:8000/seafood", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const newListSeafood = data.filter((d) => d.seafoodType === newId);
        setListSeafood([...newListSeafood]);
      });
  }, [id]);

  const handleAdd = (item) => {
    const newItem = item;
    const action = addToCart(newItem);
    dispatch(action);
    toast(`${item.name} đã được thêm vào giỏ hàng!!!`);
  };

  return (
    <div className="seafoodContent">
      <h2>Shop {seafoodName}</h2>
      <hr />
      <div className="list-seafood">
        {listSeafood.map((item) => {
          return (
            <div className="item" key={item.id}>
              <img src={item.img} onClick={() => moveDetail(item.id)}/>
              <b>{item.name}</b>
              <br />
              <span className="price">{item.price}đ/kg</span>
              <button>
                <span onClick={() => handleAdd(item)}>THÊM VÀO GIỎ</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Seafood;
