import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { addToCart } from '../../../actions/cartAction';
import styles from './BestSeller.module.scss'

function BestSeller(){
  const [bestSeller, setBestSeller] = useState([])
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    fetch("http://localhost:8000/seafood",{
      method: "GET"
    })
    .then(response => response.json())
    .then(data => setBestSeller(data))
  },[])

  const handleAdd =(item) => {
    const newItem = item
    const action = addToCart(newItem)
    dispatch(action)
    toast(`${item.name} đã được thêm vào giỏ hàng!!!`)
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
              <div className={styles.item} key={item.id}>
                <img src={item.img} onClick={() => moveDetail(item.id)}/>
                <b>{item.name}</b>
                <br />
                <span className={styles.price}>{item.price}đ/kg</span>
                <button>
                  <span onClick={()=> handleAdd(item)}>THÊM VÀO GIỎ</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default BestSeller