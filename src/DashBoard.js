import React, { useState } from 'react'
import { Link } from "react-router-dom";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

export const DashBoard = () => {
const handledate=(start, end, label)=>{
  console.log(start,"lable");
}


  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
            <li className="breadcrumb-item active">Dashboard</li>
          </ol>
        </nav>
      </div>{/* End Page Title */}
      <section className="section dashboard">
        <div className="row">
          {/* Left side columns */}
          <div className="col-lg-12">
            <div className="row">
              {/* Sales Card */}
              <div className="col-xxl-4 col-md-6">
                <div className="card info-card sales-card">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Total Employee <span>| </span></h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-cart" />
                      </div>
                      <div className="ps-3">
                        <h6>---</h6>
                        <span className="text-success small pt-1 fw-bold">----</span> <span className="text-muted small pt-2 ps-1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* End Sales Card */}
              {/* Revenue Card */}
              {/* <div className="col-xxl-4 col-md-6">
                <div className="card info-card revenue-card">
                  <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Total Billing <span>| </span></h5>
                    <div className="d-flex align-items-center">
                      <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className="bi bi-currency-dollar" />
                      </div>
                      <div className="ps-3">
                        <h6>---</h6>
                        <span className="text-success small pt-1 fw-bold">--</span> <span className="text-muted small pt-2 ps-1"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>End Revenue Card */}
              <div className='col-xxl-2 col-md-2'>

              </div>
            </div>
          </div>
          {/* End Left side columns */}
          {/* Right side columns */}
          {/* Reports */}
          <div className="col-12">
            <div className="card">
              <div className="filter">
                <DateRangePicker onCallback={handledate}>
                  <input type="text" className="form-control"  />
                </DateRangePicker>
              </div>
              <div className="card-body">
                <h5 className="card-title">Reports <span>/Today</span></h5>
                {/* Line Chart */}
                <div id="reportsChart" />
                {/* End Line Chart */}
              </div>
            </div>
          </div>{/* End Reports */}

        </div>
      </section>



    </main>

  )
}
