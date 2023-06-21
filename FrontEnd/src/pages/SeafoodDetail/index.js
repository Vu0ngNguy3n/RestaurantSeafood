import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { addDetail } from "../../actions/cartAction";
import "./SeafoodDetail.scss";
import axios from "axios";
import { Rating } from "react-simple-star-rating";
function SeafoodDetail() {
  const [seafood, setSeafood] = useState();
  const { slug } = useParams();
  const [number, setNumber] = useState(1);
  const [isComment, setIsComment] = useState(false);
  const [id, setId] = useState();
  const [comment, setComment] = useState("");
  const [totalRate, setTotalRate] = useState();
  const [listComment, setListComment] = useState([]);
  const [editComment, setEditComment] = useState({ commentId: null });
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const account = useSelector((state) => state.account);
  const textRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/restaurant/comment/${slug}`)
      .then((res) => {
        setListComment(res.data[0]?.comment);
        setId(res.data[0]._id);
        let total = 0;
        let index = 0;
        res.data[0]?.comment.forEach((item) => {
          total += item?.rate;
          index++;
        });
        let resultRate = total / index;
        setTotalRate(resultRate.toFixed(2));
      })
      .catch((err) => console.log(err));
  }, [isComment]);

  useEffect(() => {
    number<1?setNumber(1):setNumber(number) 
  },[number])

  const handleEditComment = (id, content) => {
    if (editComment === id) {
      setEditComment({ commentId: null });
    } else {
      console.log(id, content);
      setEditComment({ commentId: id });
      setNewComment(content);
    }
  };

  const handleComment = () => {
    const saveComment = {
      seafoodId: slug,
      comment: {
        userId: account._id,
        displayName: account.displayName,
        rate: +rating,
        content: comment,
      },
    };

    if (account.username !== undefined) {
      if (comment === "" || rating === 0) {
        toast(
          "Vui lòng bình luận và đánh giá sao cho sản phẩm trước khi hoàn tất đánh giá!!!"
        );
      } else {
        if (listComment === undefined) {
          axios
            .post("/restaurant/comment", saveComment)
            .then((res) => {
              toast("Bình luận thành công");
              setIsComment(!isComment);
              setComment("");
              setRating(0);
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
      }
    } else {
      navigate("/login");
      toast("Bạn phải đăng nhập trước khi bình luận");
    }
  };

  const handleDelete = (id) => {
    axios
      .post(`/restaurant/comment/deleteComment/${id}`)
      .then((res) => {
        const commentRemove = listComment.findIndex((item) => {
          return item._id === id;
        });
        listComment.splice(commentRemove, 1);
        setListComment([...listComment]);
      })
      .catch(toast("remoove success"));
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
            <p>
              {seafood?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
              đ/Kg
            </p>
            {totalRate > 0 ? (
              <p>
                <span>{totalRate}</span>
                <i
                  class="fa-solid fa-star fa-fade"
                  style={{ color: "orange" }}
                ></i>
              </p>
            ) : (
              <p>Chưa có đánh giá</p>
            )}
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
                <Rating
                  onClick={handleRating}
                  fillColorArray={[
                    "#f17a45",
                    "#f19745",
                    "#f1a545",
                    "#f1b345",
                    "#f1d045",
                  ]}
                  showTooltip
                  transition
                  tooltipArray={[
                    "Terrible",
                    "Bad",
                    "Average",
                    "Great",
                    "Prefect",
                  ]}
                  /* Available Props */
                />
                {/* <input
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
                  value="4.5"
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
                  value="4"
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
                ></label> */}
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
                    <div className="userComment">
                      <i
                        class="fa-solid fa-user fa-xl"
                        style={{ marginRight: "4px" }}
                      >
                        <span style={{ color: "#f9004d", fontSize: "16px" }}>
                          {item?.displayName}
                        </span>
                      </i>

                      {account?._id === item?.userId ? (
                        <i>
                          <i
                            class="fa-solid fa-pencil"
                            style={{
                              marginRight: "10px",
                              color: "#f9004d",
                              fontSize: "1.6rem",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleEditComment(item?._id, item.content)
                            }
                          ></i>
                          <i
                            class="fa-solid fa-trash fa-xl "
                            style={{ color: "orange", cursor: "pointer" }}
                            onClick={() => handleDelete(item?._id)}
                          ></i>
                        </i>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="commentContent">
                      <p>
                        {editComment.commentId !== item._id ? (
                          item?.content
                        ) : (
                          <>
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button>Lưu</button>
                          </>
                        )}
                        <span>
                          <i>{item?.rate}</i>
                          <i
                            class="fa-solid fa-star fa-bounce"
                            style={{ color: "orange" }}
                          ></i>
                        </span>
                      </p>
                    </div>
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
