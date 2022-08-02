import React from 'react'
import '../CustomCSS/Resume.css'
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
//import resphoto from '../../../src/Resourcemanagement.png'


export const UserProfile = () => {

    const Userid = localStorage.getItem('Userid')
    const inputRef = useRef(null);
    const printDocument = () => {
        html2canvas(inputRef.current).then((canvas) => {
            var pdf = new jsPDF('p', 'mm', 'a4');
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();
            pdf.addImage(canvas, 'JPEG', 0, 0, width, height);
            pdf.save('Mypdf.pdf');
        });
    };
    return (
        <>
        <main id="main" className="main">
        <button className='btn btn-primary' onClick={printDocument} style={{ margin: "10px", padding: "5px",float:"right" }}>Generate Pdf</button>
            <div className="containerr" id="divToPrint"ref={inputRef} >
                <div className="headerr">
                    {/* < img src={resphoto} className='img-fluid'alt="" width='500px'/> */}
                    <div className="full-name">
                        <span className="first-name">Helo</span>
                        {/* <span className="last-name">G</span> */}
                    </div>
                    <div className="contact-info">
                        <span className="email">Email: </span>
                        <span className="email-val"></span>
                        <span className="separator" />
                        <span className="phone">Phone: </span>
                        <span className="phone-val"></span>
                        <span className="separator" />
                        <span className="phone">Role: </span>
                        <span className="phone-val"></span>
                    </div>
                    <div className="about">
                        <span className="positionm">Full-Stack Developer </span>
                        <span className="desc">
                            I am a front-end developer with  of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow.
                        </span>
                    </div>
                </div>
                <div className="details">
                    <div className="sectionn">
                        <div className="section__titlee">Experience</div>
                        <div className="section__list">
                            <div className="section__list-itemm">
                                <div className="left">
                                    <div className="name"></div>
                                    {/* <div className="addr">San Fr, CA</div> */}
                                    {/* <div className="duration">Jan 2011 - Feb 2015</div> */}
                                </div>
                                <div className="right">
                                    <div className="name"> developer</div>
                                </div>
                            </div>
                            {/* <div className="section__list-item">
                       <div className="left">
                         <div className="name">Akount</div>
                         <div className="addr">San Monica, CA</div>
                         <div className="duration">Jan 2011 - Feb 2015</div>
                       </div>
                       <div className="right">
                         <div className="name">Fr developer</div>
                         <div className="desc">did This and that</div>
                       </div>
                     </div> */}
                        </div>
                    </div>
                    <div className="section">
                        <div className="section__title">Education</div>
                        {/* <div className="section__list">
                     <div className="section__list-item">
                       <div className="left">
                         <div className="name">Sample Institute of technology</div>
                         <div className="addr">San Fr, CA</div>
                         <div className="duration">Jan 2011 - Feb 2015</div>
                       </div>
                       <div className="right">
                         <div className="name">Fr developer</div>
                         <div className="desc">did This and that</div>
                       </div>
                     </div>
                     <div className="section__list-item">
                       <div className="left">
                         <div className="name">Akount</div>
                         <div className="addr">San Monica, CA</div>
                         <div className="duration">Jan 2011 - Feb 2015</div>
                       </div>
                       <div className="right">
                         <div className="name">Fr developer</div>
                         <div className="desc">did This and that</div>
                       </div>
                     </div>
                   </div> */}
                    </div>
                    <div className="section">
                        <div className="section__title">Projects</div>
                        {/* <div className="section__list">
                     <div className="section__list-item">
                       <div className="name">DSP</div>
                       <div className="text">I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow.</div>
                     </div>
                     <div className="section__list-item">
                       <div className="name">DSP</div>
                       <div className="text">I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow. <a href="/login">link</a>
                       </div>
                     </div>
                   </div> */}
                    </div>
                    <div className="section">
                        <div className="section__title">Skills</div>
                        <div className="skills">
                            <div className="skills__item">
                                <div className="left"><div className="name">
                                    Javascript
                                </div></div>
                                <div className="right">
                                    <input id="ck1" type="checkbox" defaultChecked />
                                    <label htmlFor="ck1" />
                                    <input id="ck2" type="checkbox" defaultChecked />
                                    <label htmlFor="ck2" />
                                    <input id="ck3" type="checkbox" />
                                    <label htmlFor="ck3" />
                                    <input id="ck4" type="checkbox" />
                                    <label htmlFor="ck4" />
                                    <input id="ck5" type="checkbox" />
                                    <label htmlFor="ck5" />
                                </div>
                            </div>
                        </div>
                        <div className="skills__item">
                            <div className="left"><div className="name">
                                CSS</div></div>
                            <div className="right">
                                <input id="ck1" type="checkbox" defaultChecked />
                                <label htmlFor="ck1" />
                                <input id="ck2" type="checkbox" defaultChecked />
                                <label htmlFor="ck2" />
                                <input id="ck3" type="checkbox" />
                                <label htmlFor="ck3" />
                                <input id="ck4" type="checkbox" />
                                <label htmlFor="ck4" />
                                <input id="ck5" type="checkbox" />
                                <label htmlFor="ck5" />
                            </div>
                        </div>
                    </div>
                    {/* <div className="section">
                   <div className="section__title">
                     Interests
                   </div>
                   <div className="section__list">
                     <div className="section__list-item">
                       Football, programming.
                     </div>
                   </div>
                 </div> */}
                </div>
            </div>
        </main>
           


        </>
    )
}
