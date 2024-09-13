import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Registration from "./innerComponents/registration"
import "primeicons/primeicons.css";
import "../mediaq/home.css"
import Header from "../outlets/headerRegistration";

const AcademorsForm = () => {

    return (
        <>
            <div className="container-fluid g-0"  >
                <div className="container-fluid  bg-dark  "  >
                    <div className="container p-3 " >
                        <div className="row-1 pc_media pb-5 rounded rounded-4 bg-white" >
                            <Header />
                            <div className="column inner_form  ">
                                <Registration />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AcademorsForm