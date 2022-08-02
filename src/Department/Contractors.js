import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { GetDepartmentData } from "../Redux/Action/DepartmentAction"
import Constanttext from '../Apis/Constanttext';
import { GetCordinatorlist, GetManagerlist, GetUserList } from "../Redux/Action/UserAction"
import { GetProjectData } from "../Redux/Action/ProjectAction"
import { Formik, Form } from 'formik';
import ExportApi from '../Apis/ExportApi';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';

//validation
const validationSchema = Yup.object().shape({
    user: Yup.string().required('Required!'),
    Project: Yup.string().required('Required'),
    avail: Yup.string().required('Required'),
    bill: Yup.string().required('Required'),
    PC: Yup.string().required('Required'),
    PM: Yup.string().required('Required'),
    cmnt: Yup.string().required('Required'),
})


export const Contractors = () => {
    // Redux Tools
    const dispatch = useDispatch()
    const department = useSelector((state) => state.department)
    const user = useSelector((state) => state.user)
    const project = useSelector((state) => state.project)
    const totalbill = department.departmentUser.reduce((a, v) => a = a + v.totalBilling, 0)
    // alert toast 
    const notify = () => toast.success('Sucessfully Inserted!')
    const Updatealert = () => toast.success('Sucessfully Updated!')

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
    // Data Filter 
    const [search, setSearch] = useState("");
    const [filteredData, setFilterddata] = useState([]);

    // Run Useeffect When Search Applied
    useEffect(() => {
        console.log(search)
        var result = department.departmentUser.filter(fdata => {
            return fdata.cordinatorName.toLowerCase().match(search.toLowerCase());
        })
        setFilterddata(result)
    }, [search, department.departmentUser])

    useEffect(() => {
        dispatch(GetDepartmentData(5))
        dispatch(GetCordinatorlist())
        dispatch(GetManagerlist())
        dispatch(GetUserList(5))
        dispatch(GetProjectData())
    }, [])
    // Run Useeffect When Search Applied
    // useEffect(() => {
    //     console.log(search)
    //     var result = department.departmentUser.filter(fdata => {
    //         return fdata.cordinatorName.toLowerCase().match(search.toLowerCase());
    //     })
    //     setFilterddata(result)
    // }, [search])
    //   post data prepare
    const newAddHandler = () => {
        setIsPost(true);
        handleShow()
    };

    //----------------- Insert Data 
    const handleuserdetaill = async (values, resetForm) => {
        await ExportApi.PostUserProject(
            values.user,
            values.Project,
            values.avail,
            values.bill,
            values.PC,
            values.PM,
            values.cmnt
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    dispatch(GetDepartmentData(5))
                    notify()
                }
            }
        );
    };

    //-------edit handler
    const editHandler = (id) => {
        setEditData(filteredData.filter((fl) => fl.id === id));
        setSelectedId(id);
        setIsPost(false);
        handleShow()
    };

    //----------------- Update Data
    const handleupdate = async (values, resetForm) => {
        await ExportApi.PutUserProject(
            SelectedId,
            values.user,
            values.Project,
            values.avail,
            values.bill,
            values.PC,
            values.PM,
            values.cmnt
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    dispatch(GetDepartmentData(5))
                    Updatealert()
                }
            }
        );
    };
    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Contractors</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Department</li>
                            <li className="breadcrumb-item active">Contractors</li>
                        </ol>
                    </nav>
                </div>{/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card" style={{ overflowX: "auto" }}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <div className='row'>
                                            <div className="col-md-3" >
                                                Total Billing : {totalbill}
                                            </div>
                                            <div className="col-md-1"></div>
                                            <div className="col-md-3 mt-2">
                                                <input
                                                    type='text'
                                                    placeholder='Search'
                                                    value={search}
                                                    className="w-20 form-control"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-3"></div>
                                            <div className="col-md-2 mt-2" >
                                                <button type="button" className="btn btn-primary" onClick={newAddHandler}>Add Details</button>
                                            </div>
                                        </div>
                                    </h5>
                                    {/* Table with stripped rows */}
                                    {filteredData && filteredData.length > 0 ? (
                                        <table className="table table-striped">
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th scope="col">S.No</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Project Name</th>
                                                    <th scope="col">Availability</th>
                                                    <th scope="col">Billing</th>
                                                    <th scope="col">Coordinator</th>
                                                    <th scope="col">Manager</th>
                                                    <th scope="col">Comments</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <>
                                                    {filteredData.map((data, i) => (

                                                        <tr key={data.id}
                                                            style={{
                                                                backgroundColor: data.avalibiltty === 'Yes'
                                                                    ? Constanttext.lightgreen : " ", textAlign: "center"
                                                            }}>
                                                            <th scope='row' >{i + 1}</th>
                                                            <td>{data.userName}</td>
                                                            <td>{data.projectName}</td>
                                                            <td>{data.avalibiltty}</td>
                                                            <td>{data.totalBilling}</td>
                                                            <td>{data.cordinatorName}</td>
                                                            <td>{data.managerName}</td>
                                                            <td>{data.comments}</td>
                                                            <td><i className="ri-edit-2-fill" data-bs-toggle="tooltip"
                                                                data-bs-placement="bottom" title="Edit "
                                                                onClick={() => editHandler(data.id)} style={{ cursor: "pointer" }} />&nbsp;
                                                            </td>
                                                        </tr>

                                                    ))}

                                                </>
                                            </tbody>
                                        </table>
                                    ) : <span style={{ color: "red", fontWeight: "bold" }}>No Data</span>}
                                    {/* End Table with stripped rows */}
                                </div>
                            </div>

                        </div>
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
                            user: isPost ? "" : editData[0].userid,
                            Project: isPost ? "" : editData[0].projectid,
                            avail: isPost ? "" : editData[0].avalibiltty,
                            bill: isPost ? "" : editData[0].totalBilling,
                            PC: isPost ? "" : editData[0].pcid,
                            PM: isPost ? "" : editData[0].pmid,
                            cmnt: isPost ? "" : editData[0].comments,
                        }}

                        onSubmit={(values, { resetForm }) => {
                            isPost ? handleuserdetaill(values, resetForm) : handleupdate(values, resetForm);
                        }}
                        validationSchema={validationSchema}

                    >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                            <Form autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor="Project"> Name </label>
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
                                    {errors.user && touched.user ? (
                                        <div style={{ color: "red" }}>{errors.user}</div>
                                    ) : null}
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
                                    {errors.Project && touched.Project ? (
                                        <div style={{ color: "red" }}>{errors.Project}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="PC">Availablity</label>
                                    <select
                                        name='avail'
                                        id='avail'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.avail}
                                        onChange={handleChange}
                                    >
                                        <option value={""}>Select Availablity</option>
                                        <option value={"Yes"}>Available</option>
                                        <option value={"No"}>Not Available</option>
                                    </select>
                                    {errors.avail && touched.avail ? (
                                        <div style={{ color: "red" }}>{errors.avail}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bill">Billing</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g 8.5 "
                                        name="bill"
                                        id="bill"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.bill}
                                    />
                                    {errors.bill && touched.bill ? (
                                        <div style={{ color: "red" }}>{errors.bill}</div>
                                    ) : null}
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
                                    {errors.PC && touched.PC ? (
                                        <div style={{ color: "red" }}>{errors.PC}</div>
                                    ) : null}
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
                                    {errors.PM && touched.PM ? (
                                        <div style={{ color: "red" }}>{errors.PM}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cmnt">Comments</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g comment"
                                        name="cmnt"
                                        id="cmnt"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.cmnt}
                                    />
                                    {errors.cmnt && touched.cmnt ? (
                                        <div style={{ color: "red" }}>{errors.cmnt}</div>
                                    ) : null}
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
                autoClose={3000}
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
