import React, { useEffect, useState, useReducer } from 'react'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import {  GetUserList,GetRoleData, handleDepartment } from "../Redux/Action/UserAction"
import Constanttext from '../Apis/Constanttext';
import { Formik, Form } from 'formik';
import ExportApi from '../Apis/ExportApi';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';

//validation
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    department: Yup.string().required('Required'),
    role: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email Format').required('Required'),
    exp: Yup.string().required('Required'),
    Cno: Yup.string()
    .min(10)
    .max(10)
    .matches(/[7-9]{1}[0-9 ]{4}[0-9 ]{4}[0-9]{1}/, {
      message: "Invalid  number",
      excludeEmptyString: false,
    })
    .required("Required"),
    Skill: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
});

export const User = () => {
    // alert toast 
    const notify = () => toast.success('Sucessfully Inserted!')
    const Updatealert = () => toast.success('Sucessfully Updated!')


    // Redux Tools
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)


    // Modal Popup State 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    //User States
    const [isPost, setIsPost] = useState(true);
    const [editData, setEditData] = useState("");
    const [SelectedId, setSelectedId] = useState("");
    const [reducrevalue, forceUpdate] = useReducer(x => x + 1, 0);


    //   post data prepare
    const AddHandler = () => {
        setIsPost(true);
        handleShow()
    };

    useEffect(() => {
        dispatch(handleDepartment())
        dispatch(GetRoleData())
    }, [])

    useEffect(() => {
        if (reducrevalue >= 1) {
            dispatch(GetUserList(0))
        }
    }, [reducrevalue])


    //----------------- Insert Data 
    const handleusersdata = async (values, resetForm) => {
        await ExportApi.Userdata(
            values.department,
            values.role,
            values.name,
            values.email,
            values.exp,
            values.Skill,
            values.Cno,
            values.status,
            1,
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    forceUpdate()
                    notify()
                }
            }
        );
    };

    //-------edit handler
    const editHandler = (id) => {
        setEditData(user.userList.filter((fl) => fl.id === id));
        setSelectedId(id);
        setIsPost(false);
        handleShow()
    };

    //----------------- Update Data
    const handleusersdataupdate = async (values, resetForm) => {
        await ExportApi.Updateuserdata(
            SelectedId,
            values.department,
            values.role,
            values.name,
            values.email,
            values.exp,
            values.Skill,
            values.Cno,
            values.status,
            1,
        ).then(
            (resp) => {
                if (resp.ok) {
                    // let Data = resp.data;
                    resetForm();
                    setShow(false)
                    forceUpdate()
                    Updatealert()
                }
            }
        );
    };




    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Manage Employee</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item">Lookup</li>
                            <li className="breadcrumb-item active">Employee</li>
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
                                            <div className="col-md-3">
                                        
                                                <select className="form-select"
                                                    required
                                                    name="department"
                                                    id="department"
                                                    onChange={(e) => {
                                                        dispatch(GetUserList(e.target.value))
                                                    }}>
                                                    <option >Choose...</option>
                                                    {user.role.map((d) => (
                                                        <option key={d.id} value={d.id}>{d.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-7"></div>
                                            <div className="col-md-2 mt-1" >
                                                <button type="button" className="btn btn-primary" onClick={AddHandler}><i className="ri-add-circle-fill"/> Employee</button>
                                            </div>
                                        </div>
                                    </h5>
                                    {/* Table with stripped rows */}
                                    {user.userList && user.userList.length > 0 ? (
                                        <table className="table table-striped">
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Position</th>
                                                    <th scope="col">Department</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Experience</th>
                                                    <th scope="col">Skill</th>
                                                    <th scope="col">Contact</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.userList.map((item, i) => (
                                                    <tr key={item.id} style={{ textAlign: "center" }}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{item.name}</td>
                                                        <td>{item.role}</td>
                                                        <td>{item.department}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.experience}</td>
                                                        <td>{item.skills}</td>
                                                        <td>{item.contactNo}</td>
                                                        <td><i className="ri-edit-2-fill" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit "
                                                            onClick={() => editHandler(item.id)} style={{ cursor: "pointer" }} />&nbsp;
                                                            <Link to={{ pathname: '/userProfile' }}
                                                                onClick={() => localStorage.setItem('Userid', item.id)}>
                                                            <i className="ri-eye-fill" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View Profile " style={{color:"black"}} />
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                ))}

                                            </tbody>
                                        </table>
                                    ) : <span style={{ color: "red", fontWeight: "bold" }}>Select Employee Type</span>}

                                    {/* End Table with stripped rows */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            department: isPost ? "" : editData[0].departmentid,
                            role: isPost ? "" : editData[0].roleid,
                            name: isPost ? "" : editData[0].name,
                            email: isPost ? "" : editData[0].email,
                            exp: isPost ? "" : editData[0].experience,
                            Skill: isPost ? "" : editData[0].skills,
                            Cno: isPost ? "" : editData[0].contactNo,
                            status: isPost ? "" : editData[0].status
                        }}

                        onSubmit={(values, { resetForm }) => {
                            isPost ? handleusersdata(values, resetForm) : handleusersdataupdate(values, resetForm);
                        }}
                    validationSchema={validationSchema}

                    >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                            <Form autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor="department"> Department</label>
                                    <select
                                        name='department'
                                        id='department'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.department}
                                        onChange={handleChange}
                                    >
                                        <option value={" "}> Select Department</option>
                                        {user.departmentlist.map((item, i) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}

                                    </select>
                                    {errors.department && touched.department ? (
                                        <div style={{ color: "red" }}>{errors.department}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="department"> Role</label>
                                    <select
                                        name='role'
                                        id='role'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.role}
                                        onChange={handleChange}
                                    >
                                        <option value={" "}> Select Role</option>
                                        {user.role.map((item, i) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}

                                    </select>
                                    {errors.role && touched.role ? (
                                        <div style={{ color: "red" }}>{errors.role}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g Syrus G"
                                        name="name"
                                        id="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {errors.name && touched.name ? (
                                        <div style={{ color: "red" }}>{errors.name}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Email</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="abc@appwrk.com "
                                        name="email"
                                        id="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email ? (
                                        <div style={{ color: "red" }}>{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Experience</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="Exp"
                                        name="exp"
                                        id="exp"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.exp}
                                    />
                                    {errors.exp && touched.exp ? (
                                        <div style={{ color: "red" }}>{errors.exp}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Skill</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="Skill"
                                        name="Skill"
                                        id="Skill"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.Skill}
                                    />
                                    {errors.Skill && touched.Skill ? (
                                        <div style={{ color: "red" }}>{errors.Skill}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Contact No</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="+91"
                                        name="Cno"
                                        id="Cno"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.Cno}
                                    />
                                    {errors.Cno && touched.Cno ? (
                                        <div style={{ color: "red" }}>{errors.Cno}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status"> Status </label>
                                    <select
                                        name='status'
                                        id='status'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.status}
                                        onChange={handleChange}
                                    >
                                        <option selected> Select Status</option>
                                        <option value={1}>Active</option>
                                        <option value={0}>InActive</option>
                                    </select>
                                    {errors.status && touched.status ? (
                                        <div style={{ color: "red" }}>{errors.status}</div>
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
