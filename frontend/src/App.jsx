import React, { useState, useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";

import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx'

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleAuthSubmit = data => {
    const user = {
      email: data.email,
      name: data.name || 'User',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`
    };
    setCurrentUser(user);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  const ProtectedLayout = () => (
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );

  return (
    <Routes>
      <Route path='/login' element={<div className=' fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <Login onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/signup')} />
        </div>
      } />

      <Route path='/signup' element={<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <SignUp onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/login')} />
        </div>} />

      <Route path='/' element={<ProtectedLayout />}>
        <Route index element={<Home />} /> {/* <-- This ensures something renders at "/" */}
        {/* Add more nested routes here if needed */}
      </Route>
    </Routes>
  );
};

export default App;