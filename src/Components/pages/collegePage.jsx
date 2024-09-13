import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

const CollegePage = () => {
    const { id } = useParams()
    const [data, setData] = useState("");
    const [urls, setURl] = useState([])
    useEffect(() => {
        getCollegeData()
    }, [])
    const getCollegeData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5050/college/setCollegedata/" + id)
            setData(res.data)
            setURl(res.data.Filtered_url)
        } catch (error) {
            toast.error("error in getting college details", error)
        }
    }

    return (
        <>
            <div className="container">
                <table className="border mt-3 ">
                    <td className="broder p-1">
                        <p>College: </p> <span className="fw-semibold">{data.college || data.Name_of_the_University}</span>
                    </td>
                    <td className="border p-1">
                        <p>Type:</p> {data.college_type}
                    </td>
                    <td className="border p-1">
                        <p>University:</p><span className="">{data.university}</span>
                    </td >
                    <td className="border p-1">
                        <p>Web Link:</p> <a href={data.Website}>Click here </a>
                    </td >
                    <td className="border p-1">
                        <p>URL's</p>
                        <a href={urls}>click</a>

                     
                    </td>
                </table>
            </div >
        </>
    )
}

export default CollegePage