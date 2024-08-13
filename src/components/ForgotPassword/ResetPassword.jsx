import React, { useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const nav = useNavigate();
    const location = useLocation();
    const {id:_id} = location.state || "";
    const reset = async() => {
        if (password === confirmPassword) {
            if (password.length >= 8) {
                try {
                    const res = await fetch("https://shopping-app-45uk.vercel.app/update",{
                        method:"POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify({_id,password})
                    })
                    if(res.ok){
                        alert("Sucessfully changed");
                    }else{
                        alert("Can't resetPassword");
                        return
                    }
                } catch (error) {
                    console.log(error);
                    alert("Failed to reset password");
                }
                localStorage.removeItem("ResetPass");
                nav('/');
            } else {
                alert("Password should be atleast 8 characters")

            }
        } else {
            alert("NewPassword confirm Password doesn't match")
        }
    }
    return (
        <div>
            <section className="bg-[#106F97] min-h-screen flex items-center justify-center">
        <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center'> 
            <div>
          <div className=' px-16'>
            <h2 className='font-bold text-2xl text-[#106F97]'>Reset Password</h2>
            <p className='text-sm mt-4 text-black'>Password must contain atleast 8 characters</p>
            <input className='p-2 mt-2 rounded-xl border w-full' type="password" placeholder='New Password' value={password} onChange={e => setPassword(e.target.value)} />
            <input className='p-2 mt-2 rounded-xl border w-full' type="password" placeholder='Re-enter password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button className='mt-5 bg-[#106F97] rounded-xl text-white py-2 hover:scale-105 duration-300 Content-center w-full' onClick={reset} >Reset </button>
            </div>
            </div>
            <div className='md:block hidden w-1/2'>
            <img className="rounded-2xl" src='assets/reset.jpg' alt='image'/>
          </div>
          </div>
            </section>
        </div>
    )
}

export default ResetPassword
