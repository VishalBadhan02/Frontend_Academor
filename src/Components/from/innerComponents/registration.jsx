import { useState } from "react";
import toast from "react-hot-toast";
import BasicInfo from "./basicInfo";
import axios from "axios";
const Config = require("../../../config/index")

const Registration = () => {
    const [register, setRegister] = useState(true);
    const [basicInfo, setBasicInfo] = useState(false);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [errors, setErrors] = useState({ userName: "", email: "", phoneNumber: "" });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const checkPhone = async () => {
        try {
            if (phoneNumber == "") {
                toast.error("Please fill Required Information frist")
            }
            else {
                const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/checkPhone/` + phoneNumber);
                if (res.data.status === false) {
                    toast.error(res.data.message);
                    return;
                }
                return true;
            }

        } catch (error) {
            toast.error("Error in checking phone number: " + error.message);
            return false;
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const isPhoneValid = await checkPhone();
        if (!isPhoneValid) {
            return;
        }

        let formErrors = { userName: "", email: "", phoneNumber: "" };

        if (!userName) {
            formErrors.userName = "Fullname is required";
            toast.error("Username is required");
        }

        if (!email || !validateEmail(email)) {
            formErrors.email = "Please enter a valid email";
            toast.error("Please enter a valid email");
        }

        if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
            formErrors.phoneNumber = "Please enter a valid 10-digit phone number";
            toast.error("Please enter a valid 10-digit phone number");
        }

        if (formErrors.userName || formErrors.email || formErrors.phoneNumber) {
            setErrors(formErrors);
        } else {
            setErrors({ userName: "", email: "", phoneNumber: "" });
            try {
                toast.success("Registration successful");
                setRegister(false);
                setBasicInfo(true);
            } catch (error) {
                toast.error("Registration error: " + error.message);
            }
        }
    };

    return (
        <>
            {register && (
                <div>
                    <div className="row p-2 py-4 pt-0 px-4 text-white">
                        <div className="col-2 text-center d-flex align-items-center justify-content-center rounded bg-info">
                            <i className="pi pi-user-plus"></i>
                        </div>
                        <div className="col-3 p-0" style={{ textAlign: "center" }}>
                            <hr
                                className="text-black "
                                style={{ width: "100%", borderTop: "4px solid" }}
                            />
                        </div>
                        <div className="col-2 text-center d-flex align-items-center justify-content-center rounded border">
                            <i className="pi pi-user-edit text-black"></i>
                        </div>
                        <div className="col-3 p-0" style={{ textAlign: "center" }}>
                            <hr
                                className="text-black "
                                style={{ width: "100%", borderTop: "4px solid" }}
                            />
                        </div>
                        <div className="col-2 text-center d-flex align-items-center justify-content-center rounded border">
                            <i className="pi pi-verified text-black"></i>
                        </div>
                    </div>
                    <div className="col">
                        <form className="needs-validation my-1" noValidate>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className={`form-control ${errors.userName ? "is-invalid" : ""}`}
                                    id="firstName"
                                    placeholder="Full name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    required
                                />
                                {errors.userName && (
                                    <div className="text-danger" style={{ fontSize: 10 }}>{errors.userName}</div>
                                )}
                                <br />
                            </div>
                            <div className="col-12">
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="text-danger" style={{ fontSize: 10 }} >{errors.email}</div>
                                )}
                                <br />
                            </div>
                            <div className="col-12">
                                <input
                                    type="tel"
                                    className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                                    id="phonenumber"
                                    placeholder="Phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                {errors.phoneNumber && (
                                    <div className="text-danger" style={{ fontSize: 10 }}>{errors.phoneNumber}</div>
                                )}
                                <br />
                            </div>
                            <button
                                className="w-100 btn btn-primary btn-lg"
                                type="submit"
                                onClick={handleRegister}
                            >
                                Save & Next
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {basicInfo && <BasicInfo value={{ userName, email, phoneNumber }} />}
        </>
    );
};

export default Registration;
