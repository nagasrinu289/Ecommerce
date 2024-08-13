import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import { useEffect } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { hasEmail, user } = useAuth();
    let id = ""
    const Register = false;
    const nav = useNavigate();
    const sendOtp = async () => {
        setLoading(true);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(email)) {
            try {
                const res = await fetch("https://shopping-app-45uk.vercel.app/resetPass", {
                    method: "GET",
                    headers: { "Content-Type": "application/json",'email':email },
                });
                console.log(res);
                if(res.ok){
                    const {uid} = await res.json();
                    id = uid;
                }else{
                    alert("User not found");
                    setLoading(false);
                    return
                }
            } catch (error) {
                console.log(error);
                setLoading(false)
                return
            }
            fetch("https://shopping-app-45uk.vercel.app/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }),
            })
                .then((res) => {
                    if (res.ok) {
                        hasEmail(true);
                        nav('/otpVerification', { state: { email, Register,id } });

                        console.log("OTP sent");
                    } else {
                        alert("Can't send OTP, Check your Internet connection")
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("Enter a valid email");
        }
    };
    useEffect(() => {
        if (user) {
            nav('/Dashboard');
            console.log(user);
        }
    }, [])
    if (loading) {
        return (
            <section className="bg-[#106F97] min-h-screen flex items-center justify-center ">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="px-2 text-white">Loading, Please wait..</span>
            </section>

        )
    } else {
        return (
            <section className="bg-[#106F97] min-h-screen flex items-center justify-center ">
                <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-8 items-center '>
                    <div className='px-16'>
                        <h2 className='font-bold text-2xl text-[#106F97]'>Forgot Password</h2>
                        <p className='text-sm mt-4 text-black'>Enter your email address</p>
                        <input className='p-2 mt-2 rounded-xl border w-full' type="email" name="email" id="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <button className='mt-5 bg-[#106F97] rounded-xl text-white py-2 w-full hover:scale-105 duration-300 Content-center' onClick={sendOtp}>Reset</button>
                    </div>
                </div>
            </section>
        )
    }
}

export default ForgotPassword
