import React from 'react'
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
      <Link className='nav-link' to="/"><i className="bi bi-grid" /> Dashboard</Link>
      </li>{/* End Dashboard Nav */}
      {/* <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#Lookup-nav" data-bs-toggle="collapse" href='/'>
          <i className="bi bi-menu-button-wide" /><span>Lookup</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="Lookup-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
               <Link to="user"><i className="bi bi-circle" /> Employee</Link>      
          </li> 
          <li>
               <Link to="cordinator"><i className="bi bi-circle" /> Project Coordinator</Link>
          </li>  
          <li>
               <Link to="manager"><i className="bi bi-circle" /> Project Manager</Link>
          </li> 
        </ul>
      </li> */}
       <li className="nav-item">
      <Link className="nav-link collapsed" to="user"><i className="ri-team-line" /> Employee</Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link collapsed" to="project"><i className="ri-profile-line" /> Project</Link>
      </li>

   {/* Department Nav */}
      <li className="nav-item">
        <a className="nav-link collapsed" data-bs-target="#department-nav" data-bs-toggle="collapse" href='/' >
          <i className="ri-home-2-line" /><span>Departments</span><i className="bi bi-chevron-down ms-auto" />
        </a>
        <ul id="department-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li>
            <Link to="development">
              <i className="bi bi-circle" /><span>Development Team</span>
            </Link>
          </li> 
          <li>
          <Link to="designing">
              <i className="bi bi-circle" /><span>Design Team</span>
            </Link>
          </li> 
          <li>
          <Link to="Contentteam">
              <i className="bi bi-circle" /><span>Content Team</span>
            </Link>
          </li> 
          <li>
          <Link to="Digitalteam">
              <i className="bi bi-circle" /><span>Digital Team</span>
            </Link>
          </li> 
          <li>
          <Link to="Contractors">
              <i className="bi bi-circle" /><span>Contractors</span>
            </Link>
          </li> 
          <li>
          <Link to="QATeam">
              <i className="bi bi-circle" /><span>QA Team</span>
            </Link>
          </li>  
        </ul>
      </li>
      <li className="nav-heading">Pages</li>
      <li className="nav-item">
        <Link className="nav-link collapsed" to="">
          <i className="bi bi-person" />
          <span>Profile</span>
        </Link>
      </li>{/* End Profile Page Nav */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="">
          <i className="bi bi-question-circle" />
          <span>F.A.Q</span>
        </Link>
      </li>{/* End F.A.Q Page Nav */}
      <li className="nav-item">
        <Link className="nav-link collapsed" to="contact">
          <i className="bi bi-envelope" />
          <span>Contact</span>
        </Link>
      </li>{/* End Contact Page Nav */}
      
    
    </ul>
  </aside>
  
  )
}
