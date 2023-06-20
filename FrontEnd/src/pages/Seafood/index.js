import { useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { addToCart } from "../../actions/cartAction";
import { CartContext } from "../../App";
import "./seafood.scss";
import axios from "axios";

function Seafood() {
  const [seafoodName, setSeafoodName] = useState("");
  const [listSeafood, setListSeafood] = useState([]);
  const { slug } = useParams("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    axios
      .get(`/restaurant/seafood/list/${slug}`)
      .then((res) => {
        const list= res.data
        setListSeafood(list)
      })
      .catch((err) => console.log(err));

      axios
        .get(`/restaurant/typeSeafood/detail/${slug}`)
        .then((res) => {
          const type = res.data;
          setSeafoodName(type[0]?.seafoodName);
        })
        .catch((err) => console.log(err));
  }, [slug]);

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
            <div className="item" key={item?._id}>
              <img src={item.img} onClick={() => moveDetail(item?._id)} />
              <b>{item?.name}</b>
              <br />
              <span className="price">
                {item?.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "VND",
                })}
                đ/kg
              </span>
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
