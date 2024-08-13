import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { useEffect } from "react";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [icon, setIcon] = useState(true);
    const [cicon,setCicon] = useState(true);
    const { user } = useAuth();
    const inputRef = useRef(null);
    const inputRef1 = useRef(null);
    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        wishlist:[],
        carts:[]
    });

    const nav = useNavigate();
    const Register = true;

    const sendOtp = (e) => {
        e.preventDefault();
        const updatedData = { ...data, email, password };
        setData(updatedData)
        setLoading(true);

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert("Enter valid Email");
            setLoading(false);
        } else if (password !== confirmPassword) {
            alert("Passwords don't match");
            setLoading(false);
        } else {
            data.email = email;
            data.password = password;
            console.log(data);
            fetch("https://shopping-app-45uk.vercel.app/sendOtp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email }),
            })
                .then((res) => {
                    if (res.ok) {
                        localStorage.setItem("hasEmail", "true");
                        nav('/otpVerification', { state: { email, password, Register, data } });
                        console.log("OTP sent");
                    } else {
                        alert("Check network connection");
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    useEffect(() => {
        if (user) {
            nav('/Dashboard');
            console.log(user);
        }
    }, []);
    const clicked = (ref) => {
        if (ref.current.type === "password") {
            ref.current.type = "text"
        } else {
            ref.current.type = "password"
        }
    }

    if (loading) {
        return (
            <section className="bg-[#106F97] min-h-screen flex items-center justify-center">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="px-2 text-white">Loading, Please wait..</span>
            </section>
        );
    } else {
        return (
            <div className="min-h-screen py-20 bg-[#106F97]">
                <div className="container mx-auto">
                    <div className="w-8/12 bg-white rounded-xl mx-auto">
                        <div className="py-16 px-12">
                            <h2 className="text-3xl mb-4 font-bold text-2xl text-[#106F97]">Register</h2>
                            <p className="mb-4">Create your account.</p>
                            <form onSubmit={sendOtp}>
                                <div className="grid grid-cols-2 gap-5">
                                    <input type="text" name="firstName" id="firstname" placeholder="Firstname" className="border border-gray-400 py-1 px-2" value={data.firstName} onChange={handleInputChange} required />
                                    <input type="text" name="lastName" id="lastname" placeholder="Lastname" className="border border-gray-400 py-1 px-2" value={data.lastName} onChange={handleInputChange} required />
                                </div>
                                <div className="mt-5">
                                    <input type="tel" name="phone" id="phone" placeholder="Mobile" className="border border-gray-400 py-1 px-2 w-full" value={data.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="mt-5">
                                    <input type="email" name="email" id="email" placeholder="Email" value={email} className="border border-gray-400 py-1 px-2 w-full" onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="mt-5 relative">
                                    <input ref={inputRef1} type="password" name="password" id="password" placeholder="Password" value={password} className="border border-gray-400 py-1 px-2 w-full" onChange={(e) => setPassword(e.target.value)} required />
                                {!icon &&    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="gray"
                                        className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                                        viewBox="0 0 16 16"
                                        onClick={()=>{setIcon(true);clicked(inputRef1)}}
                                    >
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>}

                               {icon &&  <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setIcon(false);clicked(inputRef1)}} width="16" height="16" fill="currentColor" class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>}
                                </div>
                                <div className="mt-5 relative">
                                    <input ref={inputRef} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} className="border border-gray-400 py-1 px-2 w-full" onChange={(e) => setConfirmPassword(e.target.value)} required />
                                   {!cicon &&  <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="gray"
                                        className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                                        viewBox="0 0 16 16"
                                        onClick={()=>{setCicon(true);clicked(inputRef)}}
                                    >
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>}
                                  {cicon &&   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={()=>{setCicon(false);clicked(inputRef)}}>
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg>}
                                </div>
                                <div className="mt-5">
                                    <label>Date of Birth </label>
                                    <input type="date" name="dob" className="border border-gray-400 py-1 px-2" value={data.dob} onChange={handleInputChange} required />
                                </div>
                                <div className="mt-5 flex items-center">
                                    <p className="mr-2">Gender : </p>
                                    <input type="radio" id="male" name="gender" value="male" className="mr-1" checked={data.gender === 'male'} onChange={handleInputChange} />
                                    <label htmlFor="male" className="mr-4">Male</label>
                                    <input type="radio" id="female" name="gender" value="female" className="mr-1" checked={data.gender === 'female'} onChange={handleInputChange} />
                                    <label htmlFor="female">Female</label>
                                </div>
                                <div className="mt-5">
                                    <p>Address</p>
                                    <textarea id="address" name="address" placeholder="Your address here.." className="h-full max-h-32 w-full border border-gray-400 py-1 px-2" value={data.address} onChange={handleInputChange} required></textarea>
                                </div>
                                <div className="mt-5">
                                    <input type="checkbox" className="border border-gray-400" required />
                                    <span> I accept the <a href="#" className="text-blue-500 font-semibold">Terms of Use</a> & <a href="#" className="text-blue-500 font-semibold">Privacy Policy</a></span>
                                </div>
                                <div className="mt-5">
                                    <button type="submit" className="w-1/2 bg-[#106F97] text-center text-white">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;
