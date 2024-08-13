import React from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { data } = useAuth();
  const nav = useNavigate();
  
  const clicked = () => {
    nav('/editProfile');
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    let date = new Date(dateString);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  };

  return (
    <>
      <div>
        <section className="justify-center">
          <div className="bg-gray-100 flex rounded-2xl shadow-lg p-5 items-center w-full sm:flex">
            <div>
            <img src='assets/profile.jpg' alt='profile' />
            </div>
            <div className='sm:ml-10 md:ml-10'>
              <p className='text-4xl flex transition uppercase'>{data.firstName} {data.lastName}</p>
              <p className='mt-5 text-2xl flex'><span className='font-semibold mr-2'>Email:</span> {data.email}</p>
              <p className='mt-2 text-2xl flex'><span className='font-semibold mr-2'>Date of Birth:</span> {formatDate(data.dob)}</p>
              <p className='mt-2 text-2xl flex'><span className='font-semibold mr-2'>Gender:</span> {data.gender}</p>
              <p className='mt-2 text-2xl flex'><span className='font-semibold mr-2'>Phone:</span> {data.phone}</p>
              <p className='mt-2 text-2xl flex'><span className='font-semibold mr-2'>Address:</span> {data.address}</p>
              <button className='mt-5 bg-[#106F97] w-full rounded-xl text-white py-2 hover:scale-105 duration-300' onClick={clicked}>Edit Profile</button>
            </div>
          </div>
        </section>
        <div>
          <h1>Your Orders</h1>
        </div>
      </div>
    </>
  );
};

export default Profile;
