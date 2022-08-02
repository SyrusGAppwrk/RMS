import React from 'react'
import { Header } from './layout/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import { DashBoard } from './DashBoard';
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
import { User } from './Lookup/User';

export const TheLayout = () => {
    return (

        <Router>
            <Header />
            <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/dasboard" element={<DashBoard />} />
                <Route path="user" element={<User />} />
                <Route path="project" element={<Project />} />
                <Route path="cordinator" element={<Cordinator />} />
                <Route path="manager" element={<Manager />} />
                <Route path="development" element={<Development />} />
                <Route path="designing" element={<Designing />} />
                <Route path="Contentteam" element={<Contentteam />} />
                <Route path="Digitalteam" element={<Digitalteam />} />
                <Route path="Contractors" element={<Contractors />} />
                <Route path="QATeam" element={<QATeam />} />
                <Route path="userProfile" element={<UserProfile />} />
                </Route>
            </Routes>
        </Router>
    )
}
