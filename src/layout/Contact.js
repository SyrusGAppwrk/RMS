import React from 'react'

function Contact() {
    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Contact Us</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Home</a>
                        </li>
                        <li className="breadcrumb-item">Contact</li>
                    </ol>
                </nav>
            </div>
            {/* End Page Title */}
            <section className="section">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.3093088489336!2d76.72371921513026!3d30.681572281655026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f9515d262480d%3A0x6b42b41709cebc0e!2sAPPWRK%20IT%20Solutions%20Pvt.%20Ltd.%20-%20App%20Development%20Company!5e0!3m2!1sen!2sin!4v1659069994069!5m2!1sen!2sin"
                                    width={553}
                                    height={440}
                                    style={{ border: "1px",marginTop:"12px",marginRight:"20px" }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />


                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Contact Us</h5>
                                {/* Floating Labels Form */}
                                <form className="row g-3">
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="floatingName"
                                                placeholder="Your Name"
                                            />
                                            <label htmlFor="floatingName">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="floatingEmail"
                                                placeholder="Your Email"
                                            />
                                            <label htmlFor="floatingEmail">Your Email</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Address"
                                                id="floatingTextarea"
                                                style={{ height: 100 }}
                                                defaultValue={""}
                                            />
                                            <label htmlFor="floatingTextarea">Address</label>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary m-2">
                                            Submit
                                        </button>
                                        <button type="reset" className="btn btn-secondary">
                                            Reset
                                        </button>
                                    </div>
                                </form>
                                {/* End floating Labels Form */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Contact