import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { GetProjectData } from "../Redux/Action/ProjectAction"
import { handleDepartment, GetRoleData, GetCordinatorlist, GetManagerlist, GetUserList, GetDailyTimeLog } from "../Redux/Action/UserAction"
import { useSelector, useDispatch } from 'react-redux'
import ExportApi from '../Apis/ExportApi'
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';



export const DailyTimeLog = () => {
     // alert toast 
     const notify = () => toast.success('Sucessfully Inserted!')
     const Updatealert = () => toast.success('Sucessfully Updated!')
    // Redux Tools
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [search, setSearch] = useState("")
    const [DepId, setDepId] = useState("")
    const [filterData, setFilterddata] = useState([user.logList])

    // dailylog State 
    const [avalibiltty, setavalibiltty] = useState('');
    const [billingHour, setbillingHour] = useState('');
    const [comments, setcomments] = useState('');

    useEffect(() => {
        dispatch(handleDepartment())
        dispatch(GetRoleData())
        dispatch(GetCordinatorlist())
        dispatch(GetManagerlist())
        dispatch(GetProjectData())
    }, [])

    // Run Useeffect When Search Applied
    useEffect(() => {
        var result = user.logList.filter(fdata => {
            return fdata.empName.toLowerCase().match(search.toLowerCase());
        })
        setFilterddata(result)
    }, [search, user.logList])

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
    current = year + '-' + month + '-' + day;

    const column = [

        {
            name: <span style={{ fontWeight: "bold" }}>Employee Name</span>,
            selector: (row) => row.empName,
            sortable: true
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Project Name</span>,
            selector: (row) => row.projectName,
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Coordinator Name</span>,
            selector: (row) => row.coordinator,
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Manager Name</span>,
            selector: (row) => row.manager,
        },

        {
            name: <span style={{ fontWeight: "bold" }}>Avalibilty</span>,
            selector: (row) => <span>{row.avalibiltty == " " ?
                <select className='form-select'
                onChange={(e) => setavalibiltty(e.target.value)}
                >
                    <option>Choo..</option>
                    <option value='1'>Available</option>
                    <option value='0'>Not Available</option>
                </select>
                    : row.avalibiltty == 1 ? <Switch
                   
                    checked={row.avalibiltty == 1 ? true : false} /> : <Switch
                   
                    checked={row.avalibiltty === 1 ? true : false} />}</span>
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Working Hours</span>,
            selector: (row) => <span>{row.bilable==1?<input type='number' className='form-control' defaultValue={row.billingHour} onChange={(e) => setbillingHour(e.target.value)} required style={{background:"green",color:"white"}} />:<input type='number' className='form-control' defaultValue={row.billingHour} onChange={(e) => setbillingHour(e.target.value)} required  />}</span>
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Comments</span>,
            selector: (row) => <input type='text' className='form-control' defaultValue={row.comments} onChange={(e) => setcomments(e.target.value)} required />
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Action</span>,
            selector: (row) => <span>
                {row.status === 1 ? <span className="badge rounded-pill bg-warning text-dark">Inserted</span>:
                    <button className='btn btn-danger' onClick={() => handleDailyLogInsert(row.assignId)}><i className="ri-send-plane-fill" /></button>
                }
            </span>,
        },
    ]

    const handleDailyLogInsert = (id) => {
      //  var val
        //{avalibiltty==true?val=1:val=0}
      //  console.log(val)
        ExportApi.PostDailyLog(id, avalibiltty, billingHour, comments).then(
            (resp) => {
                if (resp.ok) {
                    notify()
                      dispatch(GetDailyTimeLog(DepId))
                }
                else {
                    alert("try again")
                }
            });
    }

    //----------------- Update Data
    const handledailylogupdate = ( lid, id, avalibiltty, billingHour, comments) => { 
        console.log( lid,
            id,
            avalibiltty, billingHour, comments)
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
                <h1>Daily Logs</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Daily Logs</li>

                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <DataTable
                                    columns={column}
                                    data={filterData}
                                    pagination
                                    title={<div className="col-md-4 mt-3">

                                        <select className="form-select"
                                            required
                                            name="department"
                                            id="department"
                                            onChange={(e) => {
                                                dispatch(GetDailyTimeLog(e.target.value));
                                                setDepId(e.target.value)
                                            }}>
                                            <option >Choose...</option>
                                            {user.departmentlist.map((d) => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>}
                                    //fixedHeader
                                    // highlightOnHover
                                    actions={<input type='date' className='w-25 form-control' value={current} min={current} max={current} />}
                                    subHeader
                                    subHeaderComponent={
                                        <input type='text'
                                            placeholder='Search'
                                            className='w-25 form-control'
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)} />
                                    }

                                />

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
         <ToastContainer
         position="bottom-center"
         autoClose={2000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover />
         </>
    )
}
