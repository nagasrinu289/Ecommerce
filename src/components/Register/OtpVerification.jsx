import React, { useState, useRef, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const OtpVerification = () => {
    const location = useLocation();
    const { email, password,Register,data,id } = location.state || {};
    const [maskedEmail, setMaskedEmail] = useState("");
    const otpRefs = useRef([]);
    const nav = useNavigate();


    useEffect(() => {
        if (email) {
            const emailParts = email.split("@");
            setMaskedEmail(emailParts[0].slice(0, 2) + "****" + "@" + emailParts[1]);
        }

        const handleKeyup = (index) => (e) => moveFocus(e, index);
        otpRefs.current.forEach((input, index) => {
            if (input) {
                input.addEventListener("keyup", handleKeyup(index));
                input.handleKeyup = handleKeyup(index);
            }
        });

        return () => {
            otpRefs.current.forEach((input) => {
                if (input && input.handleKeyup) {
                    input.removeEventListener("keyup", input.handleKeyup);
                }
            });
        };
    }, [email]);

    const moveFocus = (e, index) => {
        const value = e.target.value;
        if (e.key === "Backspace" && index > 0 && value === "") {
            otpRefs.current[index - 1].focus();
        } else if (value.length === 1 && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    const checkOTP = () => {
        let otp_check = "";
        otpRefs.current.forEach((ip) => {
            otp_check += ip.value;
        });
        if (otp_check.length === 4) {
            fetch('https://shopping-app-45uk.vercel.app/verify', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'email': email,
                    'otp': otp_check
                }),
            }).then(async(res) => {
                if (res.ok) {
                    if(!Register){
                        setTimeout(() => {
                            localStorage.removeItem("hasEmail");
                            localStorage.setItem("ResetPass","true")
                            nav('/ResetPassword',{state:{id:id}});
                        }, 1000);
                    }else{
                        try {
                            await fetch('https://shopping-app-45uk.vercel.app/register', {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
                            })
                            localStorage.removeItem("hasEmail"); 
                            console.log(email,password,data); 
                            alert("please Login")
                            nav('/')
                        } catch (error) {
                            console.log(error);
                        }
                       
                    }
                    document.getElementById("successMessage").style.display = 'block';
                    document.getElementById("errorMessage").style.display = 'none';
                } else {
                    document.getElementById("successMessage").style.display = 'none';
                    document.getElementById("errorMessage").style.display = 'block';
                }
            }).catch((err)=>{
                document.getElementById("successMessage").style.display = 'none';
                    document.getElementById("errorMessage").style.display = 'block';
            })
        }else{
            alert("Enter 4 digit OTP...");
        }
    };

    return (
        <section className="bg-[#106F97] min-h-screen flex items-center justify-center ">
        <div className='bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center'>
          <div className='px-16'>
        <div className="flex items-center flex-col mt-5 px-5" id="verify">
        <h2 className='font-bold text-2xl text-[#106F97]'>Enter OTP</h2>
            <p className=' mt-2 text-black w-64'>OTP has been sent to <span >{maskedEmail}</span></p>
            <div className='mt-5'>
            <div className="bg-[#106F97] pr-5 pl-5 py-5 gap-5 flex place-content-center rounded">
                {[0, 1, 2, 3].map((i) => (
                    <input
                        key={i}
                        type="number"
                        className={`otp i${i + 1} rounded text-center h-10 w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        maxLength="1"
                        ref={el => { otpRefs.current[i] = el }}
                    />
                ))}
            </div>
            </div>
            <button className='mt-5 bg-[#106F97] rounded-xl text-white py-2 hover:scale-105 duration-300 Content-center w-1/2 ' onClick={checkOTP}>Verify OTP</button>
            <div id="successMessage" className="message success mt-5 text-green-900 bg-green-200 rounded p-2 hidden" >
                OTP verified successfully
            </div>
            <div id="errorMessage" className="message error mt-5 text-red-900 bg-red-200 w-fit rounded p-2 hidden" >
                Invalid OTP
            </div>
            </div>
        </div>
        </div>
        </section>
    );
};

export default OtpVerification;
