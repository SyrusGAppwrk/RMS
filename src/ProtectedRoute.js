import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function ProtectedRoute(props) {
  const { Component } = props
  const navigate = useNavigate()
  useEffect(() => {
    let login = localStorage.getItem('user')
    if (!login) {
      navigate('/login')
    }
  })


  return (
    <div><Component /></div>
  );
}


export default ProtectedRoute;
