import { Formik, Form } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseApi } from './Apis/BaseApi'
import ExportApi from './Apis/ExportApi'
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
//import { LoginFunction } from './Redux/Action/AuthAction'

export default function Login() {
   // alert toast 
   const notify = () => toast.error('Invalid Credintials')
   
  const navigate = useNavigate()

  //const logininto = (values) => {
  //console.log(values.username,values.password)
  // localStorage.setItem('login', true)
  // navigate('/')
  // }

  const LoginFunction = (values, resetForm) => {
    ExportApi.LoginRMS(values.username, values.password)
         .then(
        (resp) => {
          if (resp.ok && resp.data.returenedToken!=null) {
             localStorage.setItem("user", resp.data.returenedToken);
            let token = localStorage.getItem("user");
            let decoded = jwt_decode(token);
           BaseApi.setHeader("Authorization", `BEARER ${token}`);
           navigate('/')
          } else {
          notify()
          }
        })
      .catch((err) => console.log(err));

  };

  useEffect(() => {
    let login = localStorage.getItem('user')
    if (login) {
      navigate('/')
    }
  })

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">Resource Manager</span>
                    </a>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username &amp; password to login
                        </p>
                      </div>
                      <Formik
                        initialValues={{
                          username: "",
                          password: "",
                        }}
                        //validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                          // LoginFunction(
                          //   values.username,
                          //    values.password
                          //  );
                          LoginFunction(values, resetForm)
                        }}>
                        {({ errors, touched, values, handleChange, handleBlur }) => (

                          <Form className="row g-3 needs-validation" noValidate="">
                            <div className="col-12">
                              <label htmlFor="yourUsername" className="form-label">
                                Username
                              </label>
                              <div className="input-group has-validation">
                                <span
                                  className="input-group-text"
                                  id="inputGroupPrepend"
                                >
                                  @
                                </span>
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.username}
                                  className="form-control"
                                  placeholder="UserName"
                                />
                                {/* <div className="invalid-feedback">
                                 {errors.username && touched.username ? (
                                <span> {errors.username}</span>
                                ) : null}
                               </div> */}
                              </div>
                            </div>
                            <div className="col-12">
                              <label htmlFor="yourPassword" className="form-label">
                                Password
                              </label>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                className="form-control"
                                placeholder="Password"
                              />
                              {/* <div className="invalid-feedback">
                                 {errors.password && touched.password ? (
                                <span> {errors.password}</span>
                                ) : null}
                               </div> */}
                            </div>
                            <div className="col-12">
                              <button className="btn btn-primary w-100" type="submit" >
                                Login
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>

                    </div>
                  </div>
                  <div className="credits">
                    Designed by{" "}
                    <a href="https://appwrk.com/" target="blank">Appwrk </a>with <span style={{ color: "red" }}>&#10084;</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* End #main */}
      <ToastContainer
                position="top-center"
                autoClose={4000}
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
