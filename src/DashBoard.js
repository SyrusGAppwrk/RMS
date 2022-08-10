import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { GetDepartmentData } from "./Redux/Action/DepartmentAction"
import { useSelector, useDispatch } from 'react-redux'
import { GetUserList, GetRoleData, handleDepartment } from "./Redux/Action/UserAction"
import { GetProjectData } from "./Redux/Action/ProjectAction"
import ExportApi from './Apis/ExportApi';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Formik, Form } from 'formik';
import Modal from 'react-bootstrap/Modal';



export const DashBoard = () => {
  const dispatch = useDispatch()
  const department = useSelector((state) => state.department)
  const users = useSelector((state) => state.user)

  // Modal Popup State 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const [editData, setEditData] = useState('');

  //date state
  const [DailyLogDatefilterData, setDailyLogDatefilterData] = useState([])
  const [Depid, setDepid] = useState('')
  const [totalbill, settotalbill] = useState('')
  const [SelectedId, setSelectedId] = useState('')
  const [isPost, setIsPost] = useState(true);


  //today date
  var current = new Date();
  var day = current.getDate();
  var month = current.getMonth() + 1; //January is 0!
  var year = current.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }
  if (month < 10) {
    month = '0' + month;
  }
  current = month + '/' + day + '/' + year;

  const handledate = (start, end) => {
    let SrtDate = new Date(start._d);
    var day = SrtDate.getDay();
    var month = SrtDate.getMonth() + 1; //January is 0!
    var year = SrtDate.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    SrtDate = year + '-' + month + '-' + day;

    let EndDate = new Date(end._d);
    var edate = EndDate.getDate();
    var month = EndDate.getMonth() + 1; //January is 0!
    var year = EndDate.getFullYear();
    if (edate < 10) {
      edate = '0' + edate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    EndDate = year + '-' + month + '-' + edate;
    GetLogBydate(Depid, SrtDate, EndDate)
  }

  useEffect(() => {
    dispatch(handleDepartment())
    dispatch(GetRoleData())
    dispatch(GetProjectData())
  }, [])

  const GetLogBydate = (id, s, e) => {
    ExportApi.DailyLogBydate(id, s, e).then(
      (resp) => {
        if (resp.ok) {
          let Data = resp.data;
          setDailyLogDatefilterData(Data)
          const bill = DailyLogDatefilterData.reduce((b, v) => b = b + v.billingHour, 0)
          settotalbill(bill)
        }
      });
  }

  //-------edit handler
  const editHandler = (id) => {
    setEditData(DailyLogDatefilterData.filter((fl) => fl.logId === id));
    setSelectedId(id);
    handleShow()
  };

  function getdays(endDate) {

    // const diffInMs = Math.abs(current - endDate)
    // const diffDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); 

    //  console.log(diffDays )
    const date1 = new Date(endDate);
    const date2 = new Date(current);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }

  //----------------- Update Data
  const handledailylogupdate = (values, resetForm) => {
    console.log(values.avalibiltty,values.billingHour,values.comments)
    // ExportApi.Updatedailylog(
    //     lid,
    //     id,
    //     avalibiltty, billingHour, comments
    // ).then(
    //     (resp) => {
    //         if (resp.ok) {
    //             dispatch(GetDailyTimeLog(DepId))
    //              alert("updated")

    //         }
    //     }
    // );
  };


  return (
    <>
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

                    <div className="card-body">
                      <h5 className="card-title">Total Employee <span>| </span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-group-fill" />
                        </div>
                        <div className="ps-3">
                          <h6>{department.departmentUser.length}</h6>
                          <span className="text-success small pt-1 fw-bold">Employees</span> <span className="text-muted small pt-2 ps-1"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">

                    <div className="card-body">
                      <h5 className="card-title">Total Billing <span>| </span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-money-dollar-circle-fill" />
                        </div>
                        <div className="ps-3">
                          <h6>{totalbill}</h6>
                          <span className="text-success small pt-1 fw-bold">Hours</span> <span className="text-muted small pt-2 ps-1"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">

                    <div className="card-body">
                      <h5 className="card-title">Total Project <span>| </span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="ri-folder-chart-fill" />
                        </div>
                        <div className="ps-3">
                          <h6>{department.departmentUser.length}</h6>
                          <span className="text-success small pt-1 fw-bold">Project</span> <span className="text-muted small pt-2 ps-1"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Sales Card */}
                {/* Revenue Card */}
                <div className='col-xxl-2 col-md-2'>
                </div>
              </div>
            </div>
            {/* End Left side columns */}
            {/* Right side columns */}
            {/* Reports */}
            <div className="col-12">
              <div className="card" style={{ overflowX: "auto" }}>
                <div className="filter m-2">
                  {Depid >= 1 ? <DateRangePicker onCallback={handledate}>
                    <input type="text" className="form-control" />
                  </DateRangePicker> : ""}
                </div>
                <div className="card-body">
                  {DailyLogDatefilterData.length >= 1 ? <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mt-3"
                    table="table-to-xls"
                    filename="LogExcel"
                    sheet="tablexls"
                    buttonText="Download Data" /> : ""}
                  {/* Line Chart */}
                  <div id="reportsChart" />
                  {/* End Line Chart */}
                </div>

                {/* Selecter Tool  */}

                <div className="col-md-3 m-2">

                  <select className="form-select"
                    required
                    name="department"
                    id="department"
                    onChange={(e) => {
                      setDepid(e.target.value)
                    }}>
                    <option >Choose Department</option>
                    {users.departmentlist.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}

                  </select>
                </div>
                {/* End Selecter Tool  */}

                {/* Data Table */}

                <table className="table table-striped p-4" id="table-to-xls">

                  <thead>
                    <tr style={{ textAlign: "center" }} >
                      <th scope="col">S.No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Project Name</th>
                      <th scope="col">Availability</th>
                      <th scope="col">Working Hours</th>
                      <th scope="col">Billable</th>
                      <th scope="col">Coordinator</th>
                      <th scope="col">Manager</th>
                      <th scope="col">LogDate</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Action</th>
                    </tr>

                  </thead>
                  <tbody>
                    <>
                      {DailyLogDatefilterData.map((data, i) => (

                        <tr key={data.logId} style={{
                          backgroundColor: data.avalibiltty == 1 ?
                            "lightgreen" : " ", textAlign: "center"
                        }}  >
                          <th scope='row' >{i + 1}</th>
                          <td>{data.empName}</td>
                          <td>{data.projectName}</td>
                          <td>{data.avalibiltty == 1 ? "Yes" : "No"}</td>
                          <td>{data.billingHour}</td>
                          <td>{data.bilable == 1 ? "Yes" : "No"}</td>
                          <td>{data.coordinator}</td>
                          <td>{data.manager}</td>
                          <td>{data.createddate}</td>
                          <td>{data.comments}</td>
                          <td>
                            {getdays(data.createddate) > 2 ? " " : <span><button className='btn btn-primary' onClick={() => editHandler(data.logId)}><i className="ri-send-plane-fill" /></button></span>}

                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>
                {/* End Data Table  */}
              </div>
            </div>{/* End Reports */}
          </div>
        </section>
      </main>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resources</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              //name: isPost ? "" : editData[0].name,
                //hour:editData[0] ?editData.billingHour: editData[0].billingHour,
             // cmnt:editData[0] ?editData.comments: editData[0].comments,
              //avail:editData[0] ?editData.avalibiltty: editData[0].avalibiltty,

            }}

            onSubmit={(values, { resetForm }) => {
              handledailylogupdate(values, resetForm)
            }}
          // validationSchema={validationSchema}

          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form autoComplete='off'>
                <div className="form-group">
                  <label htmlFor="hour">Working Hours</label>
                  <input type="number"
                    className="form-control mt-2"
                    placeholder="e.g "
                    name="hour"
                    id="hour"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hour}
                  />
                  {/* {errors.url && touched.url ? (
                                        <div style={{ color: "red" }}>{errors.url}</div>
                                    ) : null} */}
                </div>
                <div className="form-group">
                  <label htmlFor="cmnt">Comments</label>
                  <input type="text"
                    className="form-control mt-2"
                    placeholder="e.g "
                    name="cmnt"
                    id="cmnt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cmnt}
                  />
                  {/* {errors.url && touched.url ? (
                                        <div style={{ color: "red" }}>{errors.url}</div>
                                    ) : null} */}
                </div>
                <div className="form-group">
                  <label htmlFor="avail"> Available </label>
                  <select
                    name='avail'
                    id='avail'
                    className='form-control input-default mt-2'
                    onBlur={handleBlur}
                    value={values.avail}
                    onChange={handleChange}
                  >
                    <option value={""}>Select Type</option>
                    <option value={1}>True</option>
                    <option value={0}>False</option>

                  </select>
                  {/* {errors.PM && touched.PM ? (
                                        <div style={{ color: "red" }}>{errors.PM}</div>
                                    ) : null} */}
                </div>

                <button type="submit" className="btn btn-primary mt-2" style={{ float: "right" }}>
                  Update</button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>


  )
}
