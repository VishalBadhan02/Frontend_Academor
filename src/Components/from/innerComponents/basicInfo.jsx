import { useEffect, useState } from "react";
import FinalSubmition from "./finalSubmition";
import toast from "react-hot-toast";
import axios from "axios";
const Config = require("../../../config/index")


const BasicInfo = ({ value }) => {
    const [detail, setDetail] = useState([]);
    const [finalRegister, setFinalRegister] = useState(false);
    const [basicInfo, setBasicinfo] = useState(true);
    const [location, setLocation] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [course, setCourse] = useState([]);
    const [subCourse, setSubCourse] = useState([]);
    const [resumeSelect, setResumeSelect] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [collegeUniName, setCollegeUniName] = useState("");
    const [year, setYear] = useState("");
    const [domain, setDomain] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [resumeConformation, setResumeConformation] = useState("");
    const [resumeFile, setResumeFile] = useState(null);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        getCountry();
        getDomain();
    }, []);

    const getCountry = async () => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/getcountry`);
            setLocation(res.data);
        } catch (error) {
            toast.error("Error in getting location");
        }
    };

    const getState = async (code) => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/getstate/${code}`);
            setState(res.data);
        } catch (error) {
            toast.error("Error in getting states");
        }
    };

    const getCity = async (state) => {
        setSelectedState(state);
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/getcity/${state}`);
            setCity(res.data);
        } catch (error) {
            toast.error("Error in getting cities");
        }
    };

    const getCollege = async (code) => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/setCollege/${code}`);
            setDetail(res.data);
        } catch (error) {
            toast.error("Error in getting college");
        }
    };

    const getDomain = async () => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/getDomain`);
            setCourse(res.data);
        } catch (error) {
            toast.error("Error in getting domain");
        }
    };

    const getSubCourses = async (domain) => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/college/getSubCourses/${domain}`);
            setSubCourse(res.data);
        } catch (error) {
            toast.error("Error in getting sub-courses");
        }
    };

    const handleRadio = (e) => {
        setResumeSelect(e.target.value === "yes");
    };

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const validateForm = () => {
        let validationErrors = {};

        if (!selectedCountry) validationErrors.selectedCountry = "Country is required.";
        if (!selectedState) validationErrors.selectedState = "State is required.";
        if (!selectedCity) validationErrors.selectedCity = "City is required.";
        if (!collegeUniName) validationErrors.collegeUniName = "College/University is required.";
        if (!year) validationErrors.year = "Year is required.";
        if (!domain) validationErrors.domain = "Interested domain is required.";
        if (!selectedCourse) validationErrors.selectedCourse = "Sub-course is required.";
        if (resumeSelect && !resumeFile) validationErrors.resumeFile = "Resume is required.";

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleBasicInfo = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setFinalRegister(true);
            setBasicinfo(false);
            toast.success("Basic information saved!");
        } else {
            toast.error("Please fill out all required fields.");
        }
    };

    return (
        <>

            {basicInfo && (
                <div>
                    <div className="row p-2 py-4 pt-0 px-4 text-white">
                        <div className="col-2 text-center d-flex align-items-center justify-content-center rounded bg-info">
                            <i className="pi pi-user-plus"></i>
                        </div>
                        <div className="col-3 p-0" style={{ textAlign: "center" }}>
                            <hr className="text-info " style={{ width: "100%", borderTop: "4px solid", }} />
                        </div>
                        <div className="col-2 text-center d-flex align-items-center justify-content-center rounded bg-info">
                            <i className="pi pi-user-edit"></i>
                        </div>
                        <div className="col-3 p-0" style={{ textAlign: "center" }}>
                            <hr className="text-black " style={{ width: "100%", borderTop: "4px solid", }} />
                        </div>
                        <div className="col-2 text-center d-flex align-items-center justify-content-center rounded border">
                            <i className="pi text-black pi-verified"></i>
                        </div>

                    </div>
                    <form className="needs-validation my-1" noValidate>
                        {/* Country Selection */}
                        <div className="col-md-5">
                            <select
                                className={`form-control ${errors.selectedCountry ? "is-invalid" : ""}`}
                                onChange={(e) => {
                                    getState(e.target.value);
                                    setSelectedCountry(e.target.value);
                                }}
                            >
                                <option value="">Choose country</option>
                                {location.map((country, index) => (
                                    <option key={index} value={country.iso2}>{country.name}</option>
                                ))}
                            </select>
                            {errors.selectedCountry && (
                                <div className="invalid-feedback">{errors.selectedCountry}</div>
                            )}
                            <br />
                        </div>

                        {/* State Selection */}
                        {state.length > 0 && (
                            <div className="col-md-4">
                                <select
                                    className={`form-select ${errors.selectedState ? "is-invalid" : ""}`}
                                    onChange={(e) => {
                                        getCity(e.target.value);
                                        getCollege(e.target.value);
                                    }}
                                >
                                    <option value="">Select State</option>
                                    {state.map((s, index) => (
                                        <option key={index} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                                {errors.selectedState && (
                                    <div className="invalid-feedback">{errors.selectedState}</div>
                                )}
                                <br />
                            </div>
                        )}

                        {/* City Selection */}
                        {city.length > 0 && (
                            <div className="col-md-4">
                                <select
                                    className={`form-select ${errors.selectedCity ? "is-invalid" : ""}`}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    <option value="">Select city</option>
                                    {city.map((c, index) => (
                                        <option key={index} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                                {errors.selectedCity && (
                                    <div className="invalid-feedback">{errors.selectedCity}</div>
                                )}
                                <br />
                            </div>
                        )}

                        {/* College/University Selection */}
                        <div className="col-md-4">
                            <select
                                className={`form-select ${errors.collegeUniName ? "is-invalid" : ""}`}
                                onChange={(e) => setCollegeUniName(e.target.value)}
                            >
                                <option value="">Select College/University</option>
                                {detail.map((college, index) => (
                                    <option key={index} value={college.college}>{college.college}</option>
                                ))}
                            </select>
                            {errors.collegeUniName && (
                                <div className="invalid-feedback">{errors.collegeUniName}</div>
                            )}
                            <br />
                        </div>

                        {/* Year Selection */}
                        <div className="col-md-4">
                            <select
                                className={`form-select ${errors.year ? "is-invalid" : ""}`}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">Select Year</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="Graduated">Graduated</option>
                            </select>
                            {errors.year && (
                                <div className="invalid-feedback">{errors.year}</div>
                            )}
                            <br />
                        </div>

                        {/* Interested Domain */}
                        <div className="col-md-4">
                            <select
                                className={`form-select ${errors.domain ? "is-invalid" : ""}`}
                                onChange={(e) => {
                                    setDomain(e.target.value);
                                    getSubCourses(e.target.value);
                                }}
                            >
                                <option value="">Interested Domain</option>
                                {course.map((c, index) => (
                                    <option key={index} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                            {errors.domain && (
                                <div className="invalid-feedback">{errors.domain}</div>
                            )}
                            <br />
                        </div>

                        {/* Sub-course */}
                        {subCourse.length > 0 && (
                            <div className="col-md-4">
                                <select
                                    className={`form-select ${errors.selectedCourse ? "is-invalid" : ""}`}
                                    onChange={(e) => setSelectedCourse(e.target.value)}
                                >
                                    <option value="">Select Sub-course</option>
                                    {subCourse.map((sub, index) => (
                                        <option key={index} value={sub.name}>{sub.name}</option>
                                    ))}
                                </select>
                                {errors.selectedCourse && (
                                    <div className="invalid-feedback">{errors.selectedCourse}</div>
                                )}
                                <br />
                            </div>
                        )}

                        {/* Resume Section */}
                        <div className="col-md-4 mb-3">
                            <p className="fw-semibold mb-1" >Do you have a resume?</p>
                            <div className="d-flex">
                                <div className="pe-3 fw-medium">
                                    <label>
                                        <input
                                            type="radio"
                                            value="yes"
                                            onChange={handleRadio}
                                            name="resume"
                                        />{" "}
                                        Yes
                                    </label>
                                </div>
                                <div className="fw-medium">
                                    <label>
                                        <input
                                            type="radio"
                                            value="no"
                                            onChange={handleRadio}
                                            name="resume"
                                        />{" "}
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Resume File Upload */}
                        {resumeSelect && (
                            <div className="col-md-4">
                                <label>Resume/CV*</label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.resumeFile ? "is-invalid" : ""}`}
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.resumeFile && (
                                    <div className="invalid-feedback">{errors.resumeFile}</div>
                                )}
                            </div>
                        )}

                        <button
                            className="w-100 btn btn-primary btn-lg"
                            type="submit"
                            onClick={handleBasicInfo}
                        >
                            Save & Next
                        </button>
                    </form>
                </div>
            )}

            {finalRegister && (
                <FinalSubmition
                    value={{
                        value,
                        selectedCourse,
                        domain,
                        year,
                        collegeUniName,
                        selectedState,
                        selectedCity,
                        selectedCountry,
                        resumeSelect,
                    }}
                />
            )}
        </>
    );
};

export default BasicInfo;
