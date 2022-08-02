import React, { useState,useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const navigate = useNavigate()
const [out,setOut]=useState(true)


  useEffect(() => {
    let data =localStorage.getItem('user')
    if(data!=null){
      setOut(true)
    }
    else{
      setOut(false)
    }
  })
  

  const btnlogout = () => {
    localStorage.removeItem('user')
    setOut(false)
    navigate('/login')
  }

  let toggleHeader = () => {
    if (document.querySelector('.toggle-sidebar-btn')) {
      document.querySelector('body').classList.toggle('toggle-sidebar');
    }
  }

  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link to='/' className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Resource Manager</span>
          </Link>
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleHeader} />
        </div>{/* End Logo */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="/">
                <i className="bi bi-search" />
              </a>
            </li>{/* End Search Icon*/}
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="/" data-bs-toggle="dropdown">
                <i className="bi bi-bell m-3" />
                {/* <span className="badge bg-primary badge-number">4</span> */}
              </a>{/* End Notification Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="/"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>


              </ul>{/* End Notification Dropdown Items */}
            </li>{/* End Notification Nav */}
            {out === true ? (<li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="/" data-bs-toggle="dropdown">
                <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">Syrus G</span>
              </a>{/* End Profile Iamge Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Syrus G</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/">
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="/">
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item d-flex align-items-center" to="">
                    <i className="bi bi-question-circle" />
                    <span>Need Help?</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" onClick={btnlogout}>
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>{/* End Profile Dropdown Items */}
            </li>) :<div className='nav-item dropdown pe-3' style={{fontWeight:"bold"}}><Link to="/login">Login</Link></div>}




            {/* End Profile Nav */}
          </ul>
        </nav>{/* End Icons Navigation */}
      </header>
      {/* SideBar  */}

      <Sidebar />
    </>

  )
}
