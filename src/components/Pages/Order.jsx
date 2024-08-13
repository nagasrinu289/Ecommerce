import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";

const Order = () => {
  const loc = useLocation();
  const item = loc.state.item;
  const [price, setPrice] = useState(item.price);
  const [isPaying, setIsPaying] = useState(false);

  const updatePrice = (n) => {
    setPrice(parseInt(item.price) * n);
  };

  const handlePlaceOrder = () => {
    // Simulate PhonePe payment process
    const confirmPayment = window.confirm(`Pay ${price} using PhonePe?`);
    if (confirmPayment) {
      setIsPaying(true);
      // Simulate payment process
      setTimeout(() => {
        alert('Payment Successful!');
        setIsPaying(false);
        // Redirect or handle post-payment actions here
      }, 2000); // Simulating payment delay
    }
  };

  return (
    <div className="mt-5">
      <p className="text-black text-2xl text-center font-bold uppercase mb-2">Place Order</p>
      <ul>
        <div className="col-span-9 space-y-4">
          <div
            className="flex items-center justify-between gap-6 p-4 border border-gray-200 rounded"
            key={item.id}
          >
            <div className="w-28 flex-shrink-0">
              <img src={item.image} alt={item.title} className="w-full" />
            </div>
            <div className="w-2/3 flex-col ">
              <p className="text-gray-800 text-s mb-6 font-medium ">
                {item.description}
              </p>
              <span>Qty: </span>
              <select
                name="Qty"
                id="Qty"
                className="border-2 mb-2"
                onChange={(e) => updatePrice(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <p className="text-red-800 text-lg font-semibold">
                Price: ${price}
              </p>
              <p className="text-green-700 text-lg font-semibold">
                Rating: {item.rating.rate}
              </p>
              <p className="text-green-400 font-bold">Delivere within 7 days</p>
            </div>
            <div className="flex gap-2">
            </div>
          </div>
          
          <p><span className="font-semi-bold">Payment mode:</span><CiDeliveryTruck className="inline w-6 h-6 ml-2" /> Cash on delivery </p>
        </div>
      </ul>
      <div className="text-gray-600 float-right cursor-pointer hover:text-red-500">
        <button
          className="mt-3 px-6 py-2 text-center text-sm text-white bg-red-600 border border-green-600 rounded hover:bg-transparent hover:text-green-600 transition uppercase font-roboto font-medium flex items-center gap-2"
          onClick={handlePlaceOrder}
          disabled={isPaying}
        >
          <CiDeliveryTruck className="w-6 h-6" />
          {isPaying ? 'Processing...' : 'Place Order'}
          
        </button>
      </div>
    </div>
  );
};

export default Order;
