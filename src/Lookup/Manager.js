import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { GetManagerlist } from "../Redux/Action/UserAction"
import Constanttext from '../Apis/Constanttext';
import { Formik, Form } from 'formik';
import ExportApi from '../Apis/ExportApi';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';

//validation
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    status: Yup.string().required('Status is required!'),

});

export const Manager = () => {
    // Redux Tools
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    // alert toast 
    const notify = () => toast.success('Sucessfully Inserted!')
    const Updatealert = () => toast.success('Sucessfully Updated!')
    // Modal Popup State 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)


    //User States
    const [userlist, setuserlist] = useState()
    const [isPost, setIsPost] = useState(true);
    const [editData, setEditData] = useState("");
    const [SelectedId, setSelectedId] = useState("");


    useEffect(() => {
        dispatch(GetManagerlist())
    }, [])

    //----------------- Insert Data PC
    const handlePcdata = async (values, resetForm) => {
        await ExportApi.Userdata(
            null,
            values.name, null, null, null, null,
            values.status,
            3,
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    dispatch(GetManagerlist())
                    notify()
                }
            }
        );
    };
    //   post data prepare
    const AddHandler = () => {
        setIsPost(true);
        handleShow()
    };

    //-------edit handler
    const editHandler = (id) => {
        setEditData(user.pMList.filter((fl) => fl.id === id));
        setSelectedId(id);
        setIsPost(false);
        handleShow()
    };

    //----------------- Update Data
    const handlePcdataupdate = async (values, resetForm) => {
        await ExportApi.Updateuserdata(
            SelectedId,
            null,
            values.name, null, null, null, null,
            values.status, 3,
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    dispatch(GetManagerlist())
                    Updatealert()
                }
            }
        );
    };


    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Project Managers</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Lookup</li>
                            <li className="breadcrumb-item active">Managers</li>
                        </ol>
                    </nav>
                </div>{/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <div className='row'>
                                            <div className="col-md-3">
                                            </div>
                                            <div className="col-md-7"></div>
                                            <div className="col-md-2" >
                                                <button type="button" className="btn btn-primary" onClick={AddHandler}>Add Manager</button>
                                            </div>
                                        </div>
                                    </h5>
                                   
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: isPost ? "" : editData[0].name,
                            status: isPost ? "" : editData[0].status
                        }}

                        onSubmit={(values, { resetForm }) => {
                            isPost ? handlePcdata(values, resetForm) : handlePcdataupdate(values, resetForm);
                        }}
                    validationSchema={validationSchema}

                    >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                            <Form autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor="name">Manager Name</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="Enter Name "
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
