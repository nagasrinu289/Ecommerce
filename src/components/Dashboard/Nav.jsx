import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const Nav = () => {
    const { logout, token, login, setData, data,setWishList,setCarts,search,setSearch } = useAuth();
    const nav = useNavigate();

    const validate = async () => {
        if (!token) {
            logout();  
            console.log("Token not found, logging out");
            return false;
        }
        try {
            const res = await fetch('https://shopping-app-45uk.vercel.app/profile', {
                method: 'GET',
                headers: {
                    'Accept':"*/*",
                    'xtoken': token
                }
            });
            if (res.ok) {
                const profileData = await res.json();
                setData(profileData);
                setWishList(profileData.wishlist);
                setCarts(profileData.carts);
                login(true);
            } else {
                console.log('Failed to validate token, logging out');
                console.log(data);
                logout();
            }
        } catch (error) {
            console.error('Error during validation:', error);
            logout();
        }
    };

    useEffect(() => {
        validate();
    }, [token]);

    const wishList = () => nav('/wishList');
    const Profile = () => nav('/profile');
    const Cart = () => nav('/cart');
    const home = () => nav('/Dashboard');
    const category = () => nav('/category');
    
    return (
        <div className='w-full bg-red-500'>
            <nav className='p-5 bg-[#106F97] shadow md:flex md:items-center md:justify-between w-full'>
                <div>
                    <span className='text-white text-4xl font-[poppins] font-bold'>
                        <img className='mr-2 h-10 inline rounded-full' src='assets/logo.png' alt='logo' />
                        OneShop
                    </span>
                </div>
                <div className='md:flex md:items-center z-[-1] md:z-auto w-full left-0 md:w-auto ms:py-0 py-4 md:pl-0 pl-7'>
                    <input className="p-2 mt-2 rounded-xl border" value={search} onChange={e=>setSearch(e.target.value)} type="text" placeholder='search' />
                    <button className='mx-4 text-white my-6 md:my-0' onClick={category}>Category</button>
                    <button className='mx-4 text-white my-6 md:my-0' onClick={home}>Home</button>
                    <button className='mx-4 text-white my-6 md:my-0' onClick={wishList}>wishList</button>
                    <button className='mx-4 text-white my-6 md:my-0' onClick={Cart}>Cart</button>
                    <button className='mx-4 text-white my-6 md:my-0' onClick={Profile}>Profile</button>
                    <button className='mx-4 text-white my-6 md:my-0' onClick={logout}>Logout</button>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
