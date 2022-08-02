import './App.css';
import { useEffect } from 'react';
import { Header } from './layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login';
//import { TheLayout } from './TheLayout';
import { DashBoard } from './DashBoard';
import { User } from './Lookup/User';
import { Project } from './Lookup/Project';
import { Cordinator } from './Lookup/Cordinator';
import { Manager } from './Lookup/Manager';
import { Development } from './Department/Development';
import { Designing } from './Department/Designing';
import { Contentteam } from './Department/Contentteam';
import { Digitalteam } from './Department/Digitalteam';
import { Contractors } from './Department/Contractors';
import { QATeam } from './Department/QATeam';
import { UserProfile } from './Lookup/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import jwt_decode from "jwt-decode";
import { BaseApi } from './Apis/BaseApi';
import Contact from './layout/Contact';

function App() {

useEffect(() => {
  const token = localStorage.getItem("user");
  if (token) {
    //var decoded = jwt_decode(token);
    BaseApi.setHeader("Authorization", `BEARER ${token}`);
  }
})




  return (
    <Router>
    <Header />
    <Routes>
        <Route path="/" element={<ProtectedRoute Component={DashBoard}/>} />
        <Route path="user" element={<ProtectedRoute Component={User}/>} />
        <Route path="project" element={<ProtectedRoute Component={Project}/>} />
        {/* <Route path="cordinator" element={<ProtectedRoute Component={Cordinator}/>} />
        <Route path="manager" element={<ProtectedRoute Component={Manager}/>} /> */}
        <Route path="development" element={<ProtectedRoute Component={Development}/>} />
        <Route path="designing" element={<ProtectedRoute Component={Designing}/>} />
        <Route path="Contentteam" element={<ProtectedRoute Component={Contentteam}/>} />
        <Route path="Digitalteam" element={<ProtectedRoute Component={Digitalteam}/>} />
        <Route path="Contractors" element={<ProtectedRoute Component={Contractors}/>} />
        <Route path="QATeam" element={<ProtectedRoute Component={QATeam}/>} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />

    </Routes>
</Router>
   
  );
}

export default App;
