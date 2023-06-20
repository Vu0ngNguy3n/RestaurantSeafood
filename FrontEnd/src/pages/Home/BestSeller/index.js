import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { addToCart } from '../../../actions/cartAction';
import styles from './BestSeller.module.scss'
import axios from 'axios'

function BestSeller(){
  const [bestSeller, setBestSeller] = useState([])
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    axios.get("/restaurant/seafood")
    .then(res => {
      const bestSellers = res.data
      return setBestSeller(bestSellers)
    })
    .catch(error => console.log(error))
  },[])

  const handleAdd =(item) => {
    const newItem = item
    const action = addToCart(newItem)
    dispatch(action)
    toast(`${item?.name} đã được thêm vào giỏ hàng!!!`)
  }

  const moveDetail = (id) =>{
    navigate(`/detail/${id}`)
  }


    return (
      <div className={styles.bestseller}>
        <p>BÁN CHẠY NHẤT</p>
        <hr />
        <div className={styles.listItems}>
          {bestSeller.map(item => {
            return (
              <div className={styles.item} key={item?._id}>
                <img src={item?.img} onClick={() => moveDetail(item?._id)} />
                <b>{item?.name}</b>
                <br />
                <span className={styles.price}>
                  {item?.price?.toLocaleString("en-US", {
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

export default BestSeller