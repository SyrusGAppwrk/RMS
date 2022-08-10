import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { GetDepartmentData } from "../Redux/Action/DepartmentAction"
import { GetProjectData } from "../Redux/Action/ProjectAction"
import { handleDepartment, GetRoleData, GetCordinatorlist, GetManagerlist, GetUserList, GetAssginProjectList } from "../Redux/Action/UserAction"
import { useSelector, useDispatch } from 'react-redux'
import Constanttext from '../Apis/Constanttext'
import { Formik, Form } from 'formik';
import Modal from 'react-bootstrap/Modal';
import ExportApi from '../Apis/ExportApi'
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';


export const AssignProject = () => {
    // alert toast 
    const notify = () => toast.success('Sucessfully Inserted!')
    const Updatealert = () => toast.success('Sucessfully Updated!')

    // Redux Tools
    const dispatch = useDispatch()
    const department = useSelector((state) => state.department)
    const user = useSelector((state) => state.user)
    const project = useSelector((state) => state.project)
    const [search, setSearch] = useState("")
    const [filterData, setFilterddata] = useState([])
    const [DepId, setDepId] = useState("")
    // Modal Popup State 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    //const [showDelete, setShowDelete] = useState(false);
    //
    //User States
    const [isPost, setIsPost] = useState(true);
    const [editData, setEditData] = useState("");
    const [SelectedId, setSelectedId] = useState("");

    useEffect(() => {
        dispatch(handleDepartment())
        dispatch(GetRoleData())
        dispatch(GetCordinatorlist())
        dispatch(GetManagerlist())
        dispatch(GetProjectData())
    }, [])

    // Run Useeffect When Search Applied
    useEffect(() => {
        var result = user.assignList.filter(fdata => {
            return fdata.empName.toLowerCase().match(search.toLowerCase());
        })
        setFilterddata(result)
    }, [search, user.assignList])

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
            selector: (row) => row.manger,
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Billable</span>,
            selector: (row) => <span >{row.billable === 1 ? <input type='checkbox' value={row.billable} defaultChecked /> : <input type='checkbox' value='0' />}</span>,
        },
        {
            name: <span style={{ fontWeight: "bold" }}>Status</span>,
            selector: (row) => <span>

                <Switch
                    onChange={(checked) => handleAssginProjectupdate(row.id, checked)}
                    checked={row.status == 1 ? true : false} />
            </span>,
        },
    ]
    //----------------- Update Data
    const handleAssginProjectupdate = (id, value) => {
        var val
        { value == true ? val = 1 : val = 0 }
        ExportApi.UpdateAssignProject(
            id,
            val
        ).then(
            (resp) => {
                if (resp.ok) {
                    Updatealert()
                    dispatch(GetAssginProjectList(DepId))

                }
            }
        );
    };

    //----------------- Post Data
    const handleAssginProjectinsert = (values, resetForm) => {
        ExportApi.PostAssignProject(
            values.user, values.Project, values.PC, values.PM, values.billable
        ).then(
            (resp) => {
                if (resp.ok) {
                    dispatch(GetAssginProjectList(DepId))
                    resetForm()
                    handleClose()
                    notify()
                }
            }
        );
    };

    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Assgin</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active">Assgin Project</li>

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
                                                dispatch(GetAssginProjectList(e.target.value));
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
                                    actions={<button className='btn btn-primary' onClick={handleShow}> <i className="ri-add-circle-fill" /> Assgin</button>}
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Resources</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            user: " ",
                            Project: " ",
                            PC: " ",
                            PM: " ",
                            billable: "",
                        }}

                        onSubmit={(values, { resetForm }) => {
                            handleAssginProjectinsert(values, resetForm)
                        }}
                    // validationSchema={validationSchema}

                    >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                            <Form autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor="department"> Role</label>
                                    <select
                                        name='department'
                                        id='department'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.department}
                                        onChange={(e) => {
                                            dispatch(GetUserList(e.target.value))
                                        }}>

                                        <option value={" "}> Select Department</option>
                                        {user.role.map((item, i) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}

                                    </select>
                                    {/* {errors.department && touched.department ? (
                                        <div style={{ color: "red" }}>{errors.department}</div>
                                    ) : null} */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="user"> Employee Name </label>
                                    <select
                                        name='user'
                                        id='user'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.user}
                                        onChange={handleChange}
                                    >
                                        <option value={""}>Select User</option>
                                        {user.userList.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                    {/* {errors.user && touched.user ? (
                                        <div style={{ color: "red" }}>{errors.user}</div>
                                    ) : null} */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Project"> Project</label>
                                    <select
                                        name='Project'
                                        id='Project'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.Project}
                                        onChange={handleChange}
                                    >
                                        <option value={""}>Select Project</option>
                                        {project.projectlist.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}

                                    </select>
                                    {/* {errors.Project && touched.Project ? (
                                        <div style={{ color: "red" }}>{errors.Project}</div>
                                    ) : null} */}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="PC"> Project Cordinator* </label>
                                    <select
                                        name='PC'
                                        id='PC'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.PC}
                                        onChange={handleChange}
                                    >
                                        <option value={""}>Select Coordinator</option>
                                        {user.pCList.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}

                                    </select>
                                    {/* {errors.PC && touched.PC ? (
                                        <div style={{ color: "red" }}>{errors.PC}</div>
                                    ) : null} */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="PM"> Project Manager* </label>
                                    <select
                                        name='PM'
                                        id='PM'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.PM}
                                        onChange={handleChange}
                                    >
                                        <option value={""}>Select Manager</option>
                                        {user.pMList.map((d) => (
                                            <option key={d.id} value={d.id}>{d.name}</option>
                                        ))}
                                    </select>
                                    {/* {errors.PM && touched.PM ? (
                                        <div style={{ color: "red" }}>{errors.PM}</div>
                                    ) : null} */}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="billable"> Billable </label>
                                    <select
                                        name='billable'
                                        id='billable'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.billable}
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
                                    {isPost ? Constanttext.addData : Constanttext.editData}</button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

        </main>
    )
}
