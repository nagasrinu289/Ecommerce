import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/auth';

const ProductCard = (props) => {
  const {wishList,setWishList,carts,setCarts,data } = useAuth();
  const [wishItem,setWishItem] = useState(false);
  const [cartItem,setCartItem] = useState(false);
  const _id = data._id;
  const addWishlist = async (p,event)=>{
    event.stopPropagation();
    for(let i=0;i<wishList.length;i++){
      if(wishList[i].id === p.id){
        let temp = [...wishList];
        temp.splice(i,1);
        try {
          const res = await fetch("https://shopping-app-45uk.vercel.app/update",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({wishlist:[...temp],_id:_id})
          })
          if(res.ok){
            setWishList(temp);
            setWishItem(false);
          }
        } catch (error) {
          console.log(error);
        }
      return
      }
    }
    try {
      const res = await fetch("https://shopping-app-45uk.vercel.app/update",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({wishlist:[...wishList,p],_id:_id})
      })
      if(res.ok){
        setWishItem(true);
      }
    } catch (error) {
      console.log(error);
    }
    let temp = [...wishList,props]
    setWishList(temp)
  }  
  const addCart = async (event)=>{
    event.stopPropagation();
    for(let i=0;i<carts.length;i++){
      if(carts[i].id === props.id){
        let temp = [...carts];
        temp.splice(i,1);
        try {
          const res = await fetch("https://shopping-app-45uk.vercel.app/update",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({carts:[...temp],_id:_id})
          })
          if(res.ok){
            setCarts(temp);
            setCartItem(false);
          }
        } catch (error) {
          console.log(error);
        }
      return
      }
    }
    try {
      const res = await fetch("https://shopping-app-45uk.vercel.app/update",{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({carts:[...carts,props],_id:_id})
      })
      if(res.ok){
        setCartItem(true);
      }
    } catch (error) {
      console.log(error);
    }
    let temp = [...carts,props];
    setCarts(temp);
  }

  const mark = ()=>{
    for(let i of wishList){
      if (i.id === props.id) {
        setWishItem(true);
      }
    }
    for(let i of carts){
      if (i.id === props.id) {
        setCartItem(true);
      }
    }
  }
  useEffect(()=>{
    mark();
  })

  return (
    <div className='flex flex-col justify-between shadow-xl rounded-md p-5 w-[250px]' >
      <img className='h-52' src={props.image} alt={props.title} />
      <p>{props.product}</p>
      <p>Price: ${props.price}</p>
      <p>Rating: {props.rating.rate}</p>
      
      <div className='flex gap-20'>
      <div className="text-red-500 cursor-pointer hover:text-red-500">
        {/* red heart         */}
   {wishItem &&    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mt-2 h-9 fill-red-500 hover:fill-red-600 absolute" onClick={(event) => addWishlist(props, event)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>  }
    {/* red heart */}
    {/* white heart */}
   {!wishItem && <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-heart mt-2 h-9 fill-red-500 hover:fill-red-600 absolute" viewBox="0 0 16 16" onClick={(event) => addWishlist(props, event)}>
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
</svg>}
{/* white heart */}
      </div>
     
      <button className={`text-white p-2 mt-2 rounded ${cartItem ? 'bg-green-500' : 'bg-[#106F97]'}`}
      onClick={(e)=>addCart(e)}
      >{cartItem? "CartItem" : "Add to Cart"}</button>
      </div>
    </div>
  );
};

export default ProductCard;