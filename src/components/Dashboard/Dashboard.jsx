import React from 'react'
import ProductList from '../Products/ProductList';
import { useAuth } from '../../utils/auth';
import { useEffect } from 'react';
import { useNavigate, Link, Router } from 'react-router-dom';
import Hero from './Hero';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault()
      if (!user) {
        navigate('/login', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, user]);
  

  return (
    <div>
      <Hero />
      <ProductList />
    </div>
  )
}

export default Dashboard
