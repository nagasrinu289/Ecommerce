import React, { useState } from 'react';
import { Ac } from '../../data/Ac';
import { Books } from '../../data/Books';
import { Computer } from '../../data/Computers';
import { Fridge } from '../../data/Fridge';
import { Mobile } from '../../data/Mobiles';
import { MenWear } from '../../data/MenWear';
import { Speakers } from '../../data/speakers';
import { TV } from '../../data/TV';
import { WomenWear } from '../../data/WomenWear';
import { Watch } from '../../data/Watch';
import ProductCard from '../Products/ProductCard';

const Category = () => {
  const categories = [
    'Ac', 'Books', 'Computer', 'Fridge', 'Mobiles', 'MenWear', 'Speaker', 'TV', 'Watch', 'WomenWear'
  ];
  const values = {
    Ac:Ac,
    Books:Books,
    Fridge:Fridge,
    Mobiles:Mobile,
    MenWear:MenWear,
    Computer:Computer,
    Speaker:Speakers,
    TV:TV,
    Watch:Watch,
    WomenWear:WomenWear

  }
  const [list,setList] = useState([]);

  const clicked = (p)=>{
    console.log(p)
    setList(values[p]);
  }
  console.log(list);
  return (
    <div className="flex flex-wrap justify-center gap-4 p-5">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-white p-4 shadow-lg border rounded-lg text-center w-40 h-40 hover:bg-red-300 hover:scale-105 transition-transform duration-300"
          onClick={()=>clicked(category)}
        >
          {category}
        </button>
      ))}
      <div className='productList flex flex-wrap gap-2.5 m-5'>
      {list.map(p => (
        <ProductCard
          {...p}
          key={p.id}
        />
      ))}
    </div>
    </div>
  );
};

export default Category;
