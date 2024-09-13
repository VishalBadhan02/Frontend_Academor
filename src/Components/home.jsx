
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "../Components/mediaq/home.css"
import axios from "axios"
import toast from "react-hot-toast"

const Home = () => {
    const [detail, setdetail] = useState([])
    const [location, setLocation] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [length, setlength] = useState("")
    const [email, setEmail] = useState([])
    const navigate = useNavigate();



    const setCollege = async (code) => {
        try {
            const res = await axios.get("http://127.0.0.1:5050/college/setCollege/" + code)
            setdetail(res.data)
            setlength(res.data.length)
            if (res.data.length > 0) {
                const lr = res.data.length
                toast.success(lr, " found in this regin")
            }
            else if (res.data.length == 0) {
                toast.error("no college found")
            }


        } catch (error) {
            toast.error("College errors", error)
        }
    }


    useEffect(() => {
        getcountry()
    }, [])

    const getcountry = async () => {
        try {
            const rescountry = await axios.get("http://127.0.0.1:5050/college/getcountry")
            setLocation(rescountry.data)
        } catch (error) {
            toast.error("error in getting loaction")
        }

    }


    const getState = async (code) => {
        try {
            const states = await axios.get("http://127.0.0.1:5050/college/getstate/" + code)
            setState(states.data)
        } catch (error) {
            toast.error("error in getting loaction")
        }

    }

    const getcity = async (state) => {
        try {
            const city = await axios.get("http://127.0.0.1:5050/college/getcity/" + state)
            setCity(city.data)
        } catch (error) {
            toast.error("error in getting loaction")
        }

    }

    const handleTPOEmailExtraction = async (value) => {

        try {
            const res = await axios.post("http://127.0.0.1:5050/college/getTPO", { value })

        } catch (error) {
            toast.error("error in mails", error)
        }
    }

    return (
        <>
            <div className="container g-0">
                <div className="container-fluid p-3 bg-dark ">
                    <div className="row" >
                        <img src={require("../assets/logo/New_logo.6e38efabb2c2bf7d4347.png")} style={{ width: 200 }} alt="" />
                        <div className="row-sm py-2 g-0 px-1  gap-1 justify-content-between d-flex">
                            <div className="col-4   d-flex ">
                                <select className="form-control" name="" id="" onChange={(e) => {
                                    getState(e.target.value)
                                }} >
                                    <option value="IN">Choose country </option>
                                    {location && location.map((country, index) =>
                                        <option key={index} value={country.iso2}>{country.name} </option>
                                    )}
                                </select>
                            </div>
                            {state[0] &&
                                <div className="col-4">
                                    <select className="form-control" name="" id="" onChange={(e) => {
                                        getcity(e.target.value)
                                        setCollege(e.target.value)
                                    }}>
                                        <option value="" >Select State</option>
                                        {state.map((states, index) =>
                                            <option key={index} value={states.name}>{states.name} </option>
                                        )}
                                    </select>
                                </div>
                            }
                            {city[0] &&
                                <div className="col-4">
                                    <select className="form-control" name="" id=""
                                        onChange={(e) => setCollege(e.target.value)}  >
                                        <option value="" >Select city</option>
                                        {city.map((value, index) =>
                                            <option key={index} value={value.name}>{value.name} </option>
                                        )}
                                    </select>
                                </div>
                            }
                        </div>
                        {/* <div className="row">
                            <div className="col-4">
                                <button className="btn btn-light form-control" value={"Karnataka"} onClick={(e) => setCollege(e.target.value)}>
                                    Karnatka
                                </button>
                            </div>
                        </div> */}
                        <div className="rounded p-1 ">

                            <div className="row mx-1 head my-1 box_shadow_orange    rounded-2  p-1  ">
                                <div className="col-2  p-0">
                                    Sr. No.
                                </div>
                                <div className="col-8  text-center">
                                    Colleges
                                </div>
                                <div className="col-2"><p>College/university: <span className="fw-bold">{length}</span>  </p></div>
                            </div>

                            <div className="" style={{ height: 600, overflow: "scroll" }}>
                                {detail && detail.map((value, index) =>
                                    <div key={index} className="row  mb-1 mx-1 college rounded-2 " >
                                        <div className="col-2 text-center d-flex justify-content-center align-items-center  p-2">
                                            <p className="m-0"> {index + 1}</p>
                                        </div>
                                        <div className="col-8  ">
                                            <div className="d-flex gap-1">
                                                <div className="d-flex justify-content-start align-items-center">
                                                </div>
                                                <div className="p-2">
                                                    <p className="m-0">{value.college || value.Name_of_the_University} <span style={{ fontSize: 10 }}></span></p>
                                                    <p className="m-0" >
                                                        <span style={{ fontSize: 10 }}>{value.state}</span> - <span style={{ fontSize: 10 }}>{value.district}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <Link to={"/college_details/" + value._id}>
                                                <button className="btn mt-2 btn-info" onClick={() => handleTPOEmailExtraction(value.email)}>
                                                    Search TPO
                                                </button>
                                            </Link>

                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

