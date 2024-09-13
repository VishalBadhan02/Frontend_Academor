import axios from "axios"
import toast from "react-hot-toast"
import Config from "../../config"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const UserInterface = () => {
    const [detail, setdetail] = useState([])

    useEffect(() => {
        setLeads();
    }, [])

    const setLeads = async () => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/user/getCALeads`)
            setdetail(res.data)
        } catch (error) {
            toast.error("error in setting leads", error)
        }
    }

    const handlemail = async (id) => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/user/SendMail/` + id)
            if (res.data.status === true) {
                toast.success("email send succesfully")
            }
        } catch (error) {
            toast.error("error in sending mail", error)
        }
    }

    return (
        <>
            <div className="rounded p-1 ">

                <div className="row mx-1 head my-1 box_shadow_orange    rounded-2  p-1  ">
                    <div className="col-2  p-0">
                        Sr. No.
                    </div>
                    <div className="col-8  text-center">
                        Leads
                    </div>
                    <div className="col-2"><p> <span className="fw-bold"></span>  </p></div>
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
                                        <p className="m-0">{value.name || value.Name_of_the_University} <span style={{ fontSize: 10 }}>{value.phone1}</span></p>
                                        <p className="m-0" >
                                            <span style={{ fontSize: 10 }}>{value.email}</span> - <span style={{ fontSize: 10 }}>{value.course}({value.year})</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 text-center">
                                <button className="btn mt-2 btn-info" onClick={(e) => handlemail(value._id)} >
                                    Send Mail
                                </button>
                                <input type="checkbox" />
                            </div>
                        </div>)
                    }
                </div>
            </div>

        </>
    )

}