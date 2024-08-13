import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register/Register';
import OtpVerification from './components/Register/OtpVerification';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ForgotPassword/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import { useAuth } from './utils/auth'; 
import PrivateRouteLayout from './utils/PrivateLayout';
import NotFound from './components/NotFound';
import OtpLayout from './utils/OtpLayout';
import ResetLayout from './utils/ResetLayout';
import Profile from './components/Pages/Profile';
import Nav from './components/Dashboard/Nav';
import Cart from './components/Pages/Cart';
import WishList from './components/Pages/WishList';
import EditProfile from './components/Pages/EditProfile';
import Category from './components/Pages/Category';
import Order from './components/Pages/Order';

const App = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <Router>
      {user ? <Nav /> : null}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        {/* Private routes */}
        <Route element={<PrivateRouteLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishList' element={<WishList />} />
          <Route path='/editProfile' element={<EditProfile />} />
          <Route path='/order' element={<Order />} />
          <Route path='/category' element={<Category />} />
        </Route>
        <Route element={<OtpLayout />}>
          <Route path="/otpVerification" element={<OtpVerification />} />
        </Route>
        <Route element={<ResetLayout />}>
          <Route path="/resetPassword" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
