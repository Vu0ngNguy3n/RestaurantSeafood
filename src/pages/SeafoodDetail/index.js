import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { addDetail } from "../../actions/cartAction";
import "./SeafoodDetail.scss";
import axios from "axios";
function SeafoodDetail() {
  const [seafood, setSeafood] = useState();
  const { slug } = useParams();
  const [number, setNumber] = useState(1);
  const [isComment, setIsComment] = useState(false);

  const [id, setId] = useState();
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const textRef = useRef()
  const dispatch = useDispatch();

  const [listComment, setListComment] = useState([]);

  useEffect(() => {
    axios
      .get(`/restaurant/comment/${slug}`)
      .then((res) => {
        setListComment(res.data[0]?.comment);
        setId(res.data[0]._id);
         
      })
      .catch((err) => console.log(err));
     
  }, [isComment]);

  const handleComment = () => {
    const saveComment = {
      seafoodId: slug,
      comment: {
        userId: 1,
        rate: +star,
        content: comment,
      },
    };
    if (listComment === undefined) {
      axios
        .post("/restaurant/comment", saveComment)
        .then((res) => {
          toast("Bình luận thành công");
          setIsComment(!isComment);
          setComment("");
          textRef.current.focus();
        })
        .catch((err) => {
          toast("Không thể bình luận");
        });
    } else {
      axios
        .post(`/restaurant/comment/updateComment/${id}`, saveComment)
        .then((res) => {
          toast("update thanh cong");
          setIsComment(!isComment);
          setComment("");
          textRef.current.focus();
        })
        .catch((err) => {
          toast("khong the add");
        });
    }
  };

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
    <React.Fragment>
      <div className="topContent">
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
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
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
        <div className="bottomContent">
          <h1>Bình Luận</h1>
          <div className="commentContent">
            <textarea
              ref={textRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="buttonInput">
              <div id="rating">
                <input
                  type="radio"
                  id="star5"
                  name="rating"
                  value="5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="full"
                  for="star5"
                  title="Awesome - 5 stars"
                ></label>

                <input
                  type="radio"
                  id="star4half"
                  name="rating"
                  value="4"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="half"
                  for="star4half"
                  title="Pretty good - 4.5 stars"
                ></label>

                <input
                  type="radio"
                  id="star4"
                  name="rating"
                  value="4.5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="full"
                  for="star4"
                  title="Pretty good - 4 stars"
                ></label>

                <input
                  type="radio"
                  id="star3half"
                  name="rating"
                  value="3.5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="half"
                  for="star3half"
                  title="Meh - 3.5 stars"
                ></label>

                <input
                  type="radio"
                  id="star3"
                  name="rating"
                  value="3"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label class="full" for="star3" title="Meh - 3 stars"></label>

                <input
                  type="radio"
                  id="star2half"
                  name="rating"
                  value="2.5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="half"
                  for="star2half"
                  title="Kinda bad - 2.5 stars"
                ></label>

                <input
                  type="radio"
                  id="star2"
                  name="rating"
                  value="2"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="full"
                  for="star2"
                  title="Kinda bad - 2 stars"
                ></label>

                <input
                  type="radio"
                  id="star1half"
                  name="rating"
                  value="1.5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="half"
                  for="star1half"
                  title="Meh - 1.5 stars"
                ></label>

                <input
                  type="radio"
                  id="star1"
                  name="rating"
                  value="1"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="full"
                  for="star1"
                  title="Sucks big time - 1 star"
                ></label>

                <input
                  type="radio"
                  id="starhalf"
                  name="rating"
                  value="0.5"
                  onClick={(e) => setStar(e.target.value)}
                />
                <label
                  class="half"
                  for="starhalf"
                  title="Sucks big time - 0.5 stars"
                ></label>
              </div>
              <button onClick={handleComment}>Bình luận</button>
            </div>
          </div>
          <div className="listComment">
            {listComment === undefined ? (
              <span>Chưa có bình luận nào</span>
            ) : (
              <ul>
                {listComment?.map((item, index) => (
                  <li key={index}>
                    <i class="fa-solid fa-user" style={{marginRight: '4px'}}></i>
                     {item?.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default SeafoodDetail;
