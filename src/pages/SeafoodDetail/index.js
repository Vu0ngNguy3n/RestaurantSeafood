import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { addDetail, addToCart } from "../../actions/cartAction";
import "./SeafoodDetail.scss";
import axios from "axios";
function SeafoodDetail() {
  const [seafood, setSeafood] = useState();
  const { slug } = useParams();
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newItem = {
      _id: seafood?._id,
      name: seafood?.name,
      price: seafood?.price,
      img: seafood?.img,
      total: +number,
      totalPrice: seafood?.price * +number,
    };
    const action = addDetail(newItem);
    dispatch(action);
    toast(`Thêm ${number} Kg ${seafood?.name} vào giỏ hàng thành công!!!`);
  };

  // const newId= parseInt(id)
  useEffect(() => {
    axios
      .get(`/restaurant/seafood/${slug}`)
      .then((res) => {
        const newSeafood = res.data;
        setSeafood(newSeafood);
      })
      .catch((error) => console.log(error));
  }, [slug]);

  return (
    <div className="contentDetail">
      <div className="leftDetail">
        <img src={seafood?.img} />
      </div>
      <div className="rightDetail">
        <h4>SẢN PHẨM</h4>
        <hr />
        <h2>{seafood?.name} - Hải sản Hồng Liên</h2>
        <p>{seafood?.price} đ/Kg</p>
        <div className="toCart">
          <div className="handleNumber">
            <button
              className="handleNum"
              onClick={() =>
                setNumber((prev) => (+prev === 1 ? prev : +prev - 1))
              }
            >
              -
            </button>
            <input value={number} onChange={(e) => setNumber(e.target.value)} />
            <button
              className="handleNum"
              onClick={() => setNumber((prev) => +prev + 1)}
            >
              +
            </button>
          </div>
          <button className="btnAdd" onClick={() => handleAddToCart()}>
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
  );
}
export default SeafoodDetail;
