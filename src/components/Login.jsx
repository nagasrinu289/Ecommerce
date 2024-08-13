import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';
import { useRef } from 'react';

const Login = () => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState(true);
  const navigate = useNavigate();
  const { login, user, token, data, setData, logout, setToken } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/Dashboard');
      console.log(user);
    }
  }, [user]);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://shopping-app-45uk.vercel.app/login', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email, password }), 
      });
      if (res.ok) {
        let token = await res.json();
        setToken(token.token);
        localStorage.setItem('xtoken', token.token);
        login(true);
        navigate('/dashboard', { replace: true, state: { email } });
      } else {
        alert('Invalid Password or email');
      }
    } catch (error) {
      console.log(error);
      alert('check network connection.');
    }
  };

  const clicked = () => {
    setIcon(!icon);
    if (inputRef.current.type === "password") {
      inputRef.current.type = "text"
    } else {
      inputRef.current.type = "password"
    }
  }
  return (
    <div>
      <section className="bg-[#106F97] min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-16">
            <h2 className="font-bold text-2xl text-[#106F97]">Login</h2>
            <p className="text-sm mt-4 text-black">Already have an account? Please login</p>
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <input
                className="p-2 mt-2 rounded-xl border"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  ref={inputRef}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                {!icon && <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                  onClick={clicked}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>}
                {icon && <svg xmlns="http://www.w3.org/2000/svg" onClick={clicked} width="16" height="16" fill="currentColor" className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>}
              </div>
              <button
                className="bg-[#106F97] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
              >
                Login
              </button>
            </form>
            <div className="mt-5">
              <Link to="/forgotPassword" className="text-sm text-blue-700 border-b border-gray-400 py-4">
                Forgot your password?
              </Link>
            </div>
            <div className="mt-3 text-sm flex justify-between items-center">
              <p>Don't have an account?</p>
              <Link to="/register" className="py-2 px-5 bg-[#106F97] text-white border rounded-xl hover:scale-110 duration-300">
                Register
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={`${process.env.PUBLIC_URL}/assets/image.png`} alt="image" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
