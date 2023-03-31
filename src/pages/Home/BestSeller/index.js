import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../actions/cartAction';
import styles from './BestSeller.module.scss'

function BestSeller(){
  const [bestSeller, setBestSeller] = useState([])
  
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


    return (
      <div className={styles.bestseller}>
        <p>BÁN CHẠY NHẤT</p>
        <hr />
        <div className={styles.listItems}>
          {bestSeller.map(item => {
            return (
              <div className={styles.item} key={item.id}>
                <img src={item.img} />
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