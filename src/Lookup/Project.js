import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { GetProjectData } from "../Redux/Action/ProjectAction"
import Constanttext from '../Apis/Constanttext';
import { Formik, Form } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup';
import ExportApi from '../Apis/ExportApi';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

//validation
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required!'),
    Client: Yup.string().required('Required'),
    platform: Yup.string().required('Required'),
    tech: Yup.string().required('Required'),
    url: Yup.string().required('Required'),
    code: Yup.string().required('Required'),
    sdate: Yup.date().required('Required'),
    edate: Yup.date().required('Required'),
    status: Yup.string().required('Required'),

});


export const Project = () => {
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

    // Redux Tools
    const dispatch = useDispatch()
    const project = useSelector((state) => state.project)

    useEffect(() => {
        dispatch(GetProjectData())
    }, [])

    //-------
    //   post data prepare
    const newAddHandler = () => {
        setIsPost(true);
        handleShow()
    };

    //----------------- Insert Data 
    const handleprojectdata = async (values, resetForm) => {
        await ExportApi.ProjectPost(
            values.name,
            values.Client,
            values.platform,
            values.tech,
            values.code,
            values.url,
            values.sdate,
            values.edate,
            values.status
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    dispatch(GetProjectData())
                    notify()
                }
            }
        );
    };

    //-------edit handler
    const editHandler = (id) => {
        setEditData(project.projectlist.filter((fl) => fl.id === id));
        setSelectedId(id);
        setIsPost(false);
        handleShow()
    };

    //----------------- Update Data
    const handleprojectdataupdate = async (values, resetForm) => {
        await ExportApi.ProjectUpdate(
            SelectedId,
            values.name,
            values.Client,
            values.platform,
            values.tech,
            values.code,
            values.url,
            values.sdate,
            values.edate,
            values.status
        ).then(
            (resp) => {
                if (resp.ok) {
                    //let Data = resp.data;
                    resetForm();
                    setShow(false)
                    dispatch(GetProjectData())
                    Updatealert()
                }
            }
        );
    };


    return (
        <>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Manage Projects</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Project</li>
                            <li className="breadcrumb-item active">Project</li>
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
                                            </div>
                                            <div className="col-md-7"></div>
                                            <div className="col-md-2" >
                                                <button type="button" className="btn btn-primary" onClick={newAddHandler}>Add Project</button>
                                            </div>
                                        </div>
                                    </h5>
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-success mb-3"
                                        table="table-to-xls"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="Export Data to Excel Sheet" />
                                    {/* Table with stripped rows */}
                                    {project.projectlist && project.projectlist.length > 0 ? (

                                        <table className="table table-striped" id="table-to-xls">
                                            <thead>
                                                <tr >
                                                    <th scope="col">#</th>
                                                    <th scope="col" style={{ textAlign: "center" }}>Project Name</th>
                                                    <th scope="col">Client Name</th>
                                                    <th scope="col">Platform</th>
                                                    <th scope="col">Technology</th>
                                                    <th scope="col">Code</th>
                                                    <th scope="col">URL</th>
                                                    <th scope="col">SDate</th>
                                                    <th scope="col">EDate</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.projectlist.map((data, i) => (
                                                    <tr key={data.id} >
                                                        <th scope='row' >{i + 1}</th>
                                                        <td style={{ textAlign: "center" }}>{data.name}</td>
                                                        <td>{data.clientName}</td>
                                                        <td>{data.platformm}</td>
                                                        <td>{data.tech}</td>
                                                        <td>{data.code}</td>
                                                        <td>{data.url}</td>
                                                        <td>{data.srtDate}</td>
                                                        <td>{data.endDate}</td>
                                                        <td>{data.status === 1 ?
                                                            Constanttext.active : Constanttext.InActive}</td>
                                                        <td><i className="ri-edit-2-fill" data-bs-toggle="tooltip"
                                                            data-bs-placement="bottom" title="Edit "
                                                            onClick={() => editHandler(data.id)} style={{ cursor: "pointer" }} />&nbsp;
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : <h5>No Data</h5>}
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
                            name: isPost ? "" : editData[0].name,
                            status: isPost ? "" : editData[0].status,
                            Client: isPost ? "" : editData[0].clientName,
                            platform: isPost ? "" : editData[0].platformm,
                            tech: isPost ? "" : editData[0].tech,
                            code: isPost ? "" : editData[0].code,
                            url: isPost ? "" : editData[0].url,
                            sdate: isPost ? "" : editData[0].srtDate,
                            edate: isPost ? "" : editData[0].endDate,
                            status: isPost ? "" : editData[0].status
                        }}

                        onSubmit={(values, { resetForm }) => {
                            isPost ? handleprojectdata(values, resetForm) : handleprojectdataupdate(values, resetForm);
                        }}
                        validationSchema={validationSchema}

                    >
                        {({ errors, touched, values, handleChange, handleBlur }) => (
                            <Form autoComplete='off'>
                                <div className="form-group">
                                    <label htmlFor="name">Project Name</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g "
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
                                    <label htmlFor="name">Client Name</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g "
                                        name="Client"
                                        id="Client"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.Client}
                                    />
                                    {errors.name && touched.Client ? (
                                        <div style={{ color: "red" }}>{errors.Client}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="platform"> Platform </label>
                                    <select
                                        name='platform'
                                        id='platform'
                                        className='form-control input-default mt-2'
                                        onBlur={handleBlur}
                                        value={values.platform}
                                        onChange={handleChange}
                                    >
                                        <option selected> Select Platform</option>
                                        <option value={"Upwork"}>Upwork</option>
                                        <option value={"LinkedIn"}>LinkedIn</option>
                                        <option value={"Direct"}>Direct</option>
                                    </select>
                                    {errors.platform && touched.platform ? (
                                        <div style={{ color: "red" }}>{errors.platform}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Technology</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g "
                                        name="tech"
                                        id="tech"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.tech}
                                    />
                                    {errors.tech && touched.tech ? (
                                        <div style={{ color: "red" }}>{errors.tech}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Code</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g "
                                        name="code"
                                        id="code"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.code}
                                    />
                                    {errors.code && touched.code ? (
                                        <div style={{ color: "red" }}>{errors.code}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">URL</label>
                                    <input type="text"
                                        className="form-control mt-2"
                                        placeholder="e.g "
                                        name="url"
                                        id="url"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.url}
                                    />
                                    {errors.url && touched.url ? (
                                        <div style={{ color: "red" }}>{errors.url}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">SDate</label>
                                    <input type="date"
                                        className="form-control mt-2"
                                        placeholder="e.g "
                                        name="sdate"
                                        id="sdate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.sdate}
                                    />
                                    {errors.sdate && touched.sdate ? (
                                        <div style={{ color: "red" }}>{errors.sdate}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">EDate</label>
                                    <input type="date"
                                        className="form-control mt-2"
                                        placeholder="e.g "
                                        name="edate"
                                        id="edate"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.edate}
                                    />
                                    {errors.edate && touched.edate ? (
                                        <div style={{ color: "red" }}>{errors.edate}</div>
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
