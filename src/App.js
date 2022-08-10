import './App.css';
import { useEffect } from 'react';
import { Header } from './layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login';
import { DashBoard } from './DashBoard';
import { User } from './Lookup/User';
import { Project } from './Lookup/Project';
import { Development } from './Department/Development';
import { Designing } from './Department/Designing';
import { Contentteam } from './Department/Contentteam';
import { Digitalteam } from './Department/Digitalteam';
import { Contractors } from './Department/Contractors';
import { QATeam } from './Department/QATeam';
import { UserProfile } from './Lookup/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import { BaseApi } from './Apis/BaseApi';
import Contact from './layout/Contact';
import { Test } from './Test';
import { AssignProject } from './AssignProject/AssignProject';
import { DailyTimeLog } from './Department/DailyTimeLog';

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
        <Route path="development" element={<ProtectedRoute Component={Development}/>} />
        <Route path="designing" element={<ProtectedRoute Component={Designing}/>} />
        <Route path="Contentteam" element={<ProtectedRoute Component={Contentteam}/>} />
        <Route path="Digitalteam" element={<ProtectedRoute Component={Digitalteam}/>} />
        <Route path="Contractors" element={<ProtectedRoute Component={Contractors}/>} />
        <Route path="QATeam" element={<ProtectedRoute Component={QATeam}/>} />
        <Route path="assignProject" element={<ProtectedRoute Component={AssignProject}/>} />
        <Route path="dailyLog" element={<ProtectedRoute Component={DailyTimeLog}/>} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="test" element={<Test />} />

    </Routes>
</Router>
   
  );
}

export default App;
