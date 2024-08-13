import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const { data, setData } = useAuth();
    const [updatedDate, setUpdatedDate] = useState({ ...data });
    const nav = useNavigate();

    useEffect(() => {
        setUpdatedDate({ ...data });
    }, [data]);

    const formatDate = (dateString) => {
        if (!dateString) return ''; 
        let date = new Date(dateString);
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedDate((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async() => {
        const {email,firstName,lastName,phone,dob,gender,_id} = updatedDate;
        try {
            const res = await fetch("https://shopping-app-45uk.vercel.app/update",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, firstName, lastName, phone, dob, gender, _id
                })
            })
            console.log(res.ok)
            if(res.ok){
                alert("Sucessfully updated");
                nav("/profile");
            }else{
                alert("Failed to update");
            }
        } catch (error) {
            console.log(error);
            alert("check network connection");
        }
    };

    return (
        <div className='col-span-9 shadow rounded px-6 pt-5 pb-7'>
            <h1 className='text-2xl font-medium capitalize mb'>Profile</h1>
            <div className="space-y-4">
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="firstName" className='text-gray-600 mb-2 block'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            onChange={handleChange}
                            value={updatedDate.firstName || ''}
                            placeholder='First Name'
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className='text-gray-600 mb-2 block'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            onChange={handleChange}
                            value={updatedDate.lastName || ''}
                            placeholder='Last Name'
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="dob" className='text-gray-600 mb-2 block'>Date of Birth</label>
                        <input
                            type='date'
                            name='dob'
                            onChange={handleChange}
                            value={formatDate(updatedDate.dob)}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className='text-gray-600 mb-2 block'>Gender</label>
                        <select
                            name='gender'
                            value={updatedDate.gender || ''}
                            onChange={handleChange}
                            className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded'
                        >
                            <option value=''>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <label htmlFor="email" className='text-gray-600 mb-2 block'>Email</label>
                        <input
                            type='email'
                            name='email'
                            onChange={handleChange}
                            value={updatedDate.email || ''}
                            placeholder='Email Address'
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className='text-gray-600 mb-2 block'>Mobile</label>
                        <input
                            type='text'
                            name='phone'
                            onChange={handleChange}
                            value={updatedDate.phone || ''}
                            placeholder='Phone Number'
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded"
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <button
                        className="bg-[#106F97] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full"
                        type="button"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
