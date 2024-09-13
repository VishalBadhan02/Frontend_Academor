import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const Config = require("../../../config/index")


const FinalSubmition = ({ value }) => {
    const formSubmission = async (e) => {
        e.preventDefault();
        try {
            const detail = {
                userName: value.value.userName,
                email: value.value.email,
                phoneNumber: value.value.phoneNumber,
                SelectedCourse: value.selectedCourse,
                collegeUniName: value.collegeUniName,
                domain: value.domain,
                resumeSelect: value.resumeSelect,
                selectedCity: value.selectedCity,
                selectedCountry: value.selectedCountry,
                selectedState: value.selectedState,
            }
            const res = await axios.post(`http://${Config["PUBLIC-IP"]}:5050/college/fromSubmission`, detail);
            console.log(res)
            if (res.data.status === true) {
                console.log("hello")
                alert(`Registration done successfully...                                            Thanks for choosing academor,    our team will reachout to you soon `)
                setInterval(() => {
                    window.location.href = "https://www.academor.com/"
                }, 1000);

            }

        } catch (error) {
            toast.error("Error in form submission", error);
        }
    }

    return (
        <>
            <div className="row p-2 py-4 pt-0 px-4 text-white">
                <div className="col-2 text-center d-flex align-items-center justify-content-center rounded bg-info">
                    <i className="pi pi-user-plus"></i>
                </div>
                <div className="col-3 p-0" style={{ textAlign: "center" }}>
                    <hr className="text-info" style={{ width: "100%", borderTop: "4px solid" }} />
                </div>
                <div className="col-2 text-center d-flex align-items-center justify-content-center rounded bg-info">
                    <i className="pi pi-user-edit"></i>
                </div>
                <div className="col-3 p-0" style={{ textAlign: "center" }}>
                    <hr className="text-info" style={{ width: "100%", borderTop: "4px solid" }} />
                </div>
                <div className="col-2 text-center d-flex align-items-center justify-content-center rounded bg-info">
                    <i className="pi pi-verified"></i>
                </div>
            </div>

            <div className="container">
                <h2 className="">Final Submission</h2>
                <span className="fw-semibold text-danger">Please verify your details....</span>
                <form className="needs-validation" >
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="userName">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                value={value.value.userName}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={value.value.email}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNumber"
                                value={value.value.phoneNumber}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="selectedCourse">Selected Course</label>
                            <input
                                type="text"
                                className="form-control"
                                id="selectedCourse"
                                value={value.selectedCourse}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="collegeUniName">College/University Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="collegeUniName"
                                value={value.collegeUniName}
                                readOnly
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="domain">Domain</label>
                            <input
                                type="text"
                                className="form-control"
                                id="domain"
                                value={value.domain}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="selectedCity">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="selectedCity"
                                value={value.selectedCity}
                                readOnly
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="selectedState">State</label>
                            <input
                                type="text"
                                className="form-control"
                                id="selectedState"
                                value={value.selectedState}
                                readOnly
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="selectedCountry">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                id="selectedCountry"
                                value={value.selectedCountry}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resume">Resume:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="resume"
                            value={value.resumeSelect ? "Yes" : "No"}
                            readOnly
                        />
                    </div>
                    <button className="btn form-control btn-primary" onClick={formSubmission} type="submit">
                        Submit form
                    </button>
                </form>
            </div>
        </>
    );
};

export default FinalSubmition;
