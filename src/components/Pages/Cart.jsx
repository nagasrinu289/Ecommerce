import React, { useEffect, useState } from 'react'
import { useAuth } from '../../utils/auth'
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const { carts, setCarts, data } = useAuth();
  const { _id } = data;
  const [sum, setSum] = useState([0]);
  const nav = useNavigate();
  const total = () => {
    let s = 0
    for (let i of carts) {
      s += parseInt(i.price);
    }
    setSum(s);
  }
  const removeCart = async (id) => {
    let items = [...carts];
    items = items.filter((item) => item.id !== id);
    try {
      const res = await fetch("https://shopping-app-45uk.vercel.app/update", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carts: items, _id: _id })
      })
      if (res.ok) {
        console.log("deleted");
      }
    } catch (error) {
      console.log(error);
      return
    }
    setCarts(items);
  }
  useEffect(() => {
    total();
  }, [carts])
  const clicked = (item)=>{
    nav('/order',{state:{item:item}})
  }


  return (
    <div className="mt-5">
      <p className="text-xl ml-3 font-semibold ">Items : {carts.length}</p>
      <ul>
        <div className="col-span-9 space-y-4">
          {carts.map((item) => (
            <div
              className="flex items-center justify-between gap-6 p-4 border border-gray-200 rounded"
              key={item.id}
            ><div className="w-28 flex-shrink-0">
                <img src={item.image} alt={item.title} className="w-full" />
              </div>
              <div className="w-1/3">
                <p className="text-gray-800 text-xl font-medium uppercase">{item.title}</p>
                <p className="text-red-800 text-lg font-semibold">Price: ${item.price}</p>
                <p className="text-green-700 text-lg font-semibold">Rating: {item.rating.rate}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(id)=>clicked(item)} className="px-6 py-2 text-center text-sm text-white  bg-green-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 transition uppercase font-roboto font-medium"
                >
                  Buy
                </button>

                <div className="text-gray-600 cursor-pointer hover:text-[#106F97]">

                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="currentColor" className="bi bi-trash3 ml-5" viewBox="0 0 16 16" onClick={() => removeCart(item.id)}>
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>

              </div>
            </div>
          ))}
        </div>
      </ul>
      <div className='bg-gray-100  rounded p-10 items-center'>
        {carts.map((item) => (
          <div className='flex justify-between'>
            <p className='non-italic'>{item.title}</p>
            <p>${item.price}</p>
          </div>
        ))}
        <p className='mt-5 font-semibold text-lg absolute right-5 text-red-700'>Total Price: ${sum}</p>
      </div>
    </div>
  );
};

export default Cart
