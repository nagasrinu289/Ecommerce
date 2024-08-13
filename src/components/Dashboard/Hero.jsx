import React from 'react'
import { Image0, Image1, Image2, Image3, Image4, Image5 } from '../../utils/images'
import Slider from "react-slick";
import { Autoplay } from 'swiper/modules';

const ImageList = [
    {
        id:0,
        img: Image0,
        title: "OneShop Online Shopping Store",
        description:
            "Discover a wide range of products at unbeatable prices. Shop for clothing, electronics, home goods, and more, all in one place. Enjoy easy navigation, secure checkout, and fast delivery. Your satisfaction is our priority!"
    },
    {
    id:1,
    img: Image1,
    title: "Upto 50% off on all Men's Wear",
    description:
        "Elevate your formal wardrobe with Peter England Perform`s super-slim navy blue shirt for men. Made with a blend of cotton, nylon, and spandex, full-sleeved shirt guarantees maximum comfort and flexibility. Perfect for any formal occasion, its stylish design and comfortable fit will leave a lasting impression on those around you."
},{
    id:2,
    img: Image2,
    title: "Upto 70% off on all shoes",
    description:
        "Elevate your style with  STYLISH CASUALS SHOES FOR GIRLS(PINK) for women. Made with a rubber, Mesh, and Lace-Up, Textured shirt guarantees maximum comfort and flexibility. Perfect for any formal occasion, its stylish design and comfortable fit will leave a lasting impression on those around you."
},{
    id:3,
    img: Image3,
    title: "Upto 30% off on all Men's Watches",
    description:
        "Give your fashion the flight of fancy by adorning your wrist with this multi function watch. It has a round dial with beautiful time markers, thereby lending it a classy look that will complement any casual wear. It also has a metallic bracelet that exudes class."
},{
    id:4,
    img: Image4,
    title: "Upto 50% off on all Women's Wear",
    description:
        "This Block Printed Nyra Cut Suit Set is a beautiful melange of prints and patterns. The kurta has a round neck, three-quarter cuffed sleeves. Paired with partially elasticated solid pants with side pockets."
},{
    id:5,
    img: Image5,
    title: "Upto 50% off on all Kid's Wear",
    description:
        "keep your kid warm during cold season in comfortable suit set variety ofjackets and coats suitable to put during casual wear occasions."
},
]

const Hero = () => {
    
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

  return (
    <div className='relative overflow-hidden min-h-[550px] sm:min-h-[550px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
      <div className='h-[700px] w-[700px] bg-slate-400/40 absolute -top-1/2 left-0 rounded-3xl rotate-45 -z-9'></div>
        <div className='container pb-8 sm:pb-0'>
            <Slider { ...settings}> 
                
                {ImageList.map((data) => (
                    
                
            <div key={data.id}>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <div className='flex flex-col justify-center  gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                        <p className='mt-5 text-sm'>{data.description}</p>
                    </div>
                <div className='order-1 sm:order-2'>
                    <div className='relative z-10'>
                    <img src={data.img }  className='w-[300px] h-[300px] sm:h-[450px] sm:w-[350px] sm:scale-125 lg:scale-120 mx-auto'/>
                    </div>
                </div>
                </div>
            </div>
            ))}
            </Slider>
        </div>
    </div>
  )
}

export default Hero
