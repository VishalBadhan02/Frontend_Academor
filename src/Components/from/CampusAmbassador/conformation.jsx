import toast from "react-hot-toast"
import Registration from "../innerComponents/registration"
import { useEffect, useState } from "react"
import axios from "axios"
import Config from "../../../config"
import { useParams } from "react-router-dom"
import "../../mediaq/home.css"
import Login from "./login"


const Conformation = () => {
    const [candidate, setCandidate] = useState("")
    const [login, setLogin] = useState(false)
    const [conformation, setConformation] = useState(true)
    const { id } = useParams()
    useEffect(() => {
        getCADetails()
    }, [])
    const getCADetails = async () => {
        try {
            const res = await axios.get(`http://${Config["PUBLIC-IP"]}:5050/user/getCA/` + id)
            setCandidate(res.data)
        } catch (error) {
            toast.error("error in gettting CA's info", error)
        }
    }

    const handleAgree = () => {
        try {
            setLogin(true)
            setConformation(false)
        } catch (error) {
            toast.error("error in handling Agree button", error)
        }
    }

    return (
        <>
            <div className="container-fluid g-0">
                <div className="container-fluid bg-dark">
                    <div className="container p-3">
                        <div className="row-1 pc_media pb- p-3 rounded rounded-4 bg-white shadow-lg">
                            <div className="col-md-6">
                                <img
                                    src="https://www.academor.com/static/media/New_logo.6e38efabb2c2bf7d4347.png"
                                    width={150}
                                    alt="Academor Logo"
                                    className="mb-3"
                                />
                                <br />
                                <img src="https://2023.ktj.in/static/media/KTJ-logo-main.ee310a170491658cd90a.png" className="kshitij" alt="" width={500} />
                            </div>

                            {conformation && <div className="col-md-6 p-1">
                                <h4 className="text-primary mb-3">
                                    Campus Ambassador Registration
                                </h4>
                                <div className="border p-3 rounded" style={{ height: 250, overflowY: "auto" }}>
                                    <p>Hi <span className="fw-bold">{candidate.name}</span>,</p>
                                    <p>
                                        Congratulations on being selected as a potential Campus Ambassador! We are
                                        thrilled to have you join our vibrant team at <span className="fw-bold">Academor</span>.
                                    </p>
                                    <p>
                                        This is an exciting opportunity to kickstart your professional journey
                                        while still in college, gaining valuable experience in leadership, social
                                        media marketing, and event management. As a Campus Ambassador, you’ll
                                        represent Academor, build your network, and gain exposure to real-world
                                        challenges that will elevate your career profile.
                                    </p>
                                    <p>
                                        We believe in rewarding our team members for their dedication and hard
                                        work. You can earn a <span className="fw-bold">stipend of up to INR 10,000</span>
                                        based on your performance, along with exclusive access to internships with
                                        top multinational companies. Plus, you will receive premium certificates,
                                        including:
                                    </p>
                                    <ul className="mb-3">
                                        <li><span className="fw-bold">Certificate of Appreciation</span> for your contribution</li>
                                        <li><span className="fw-bold">Certificate of Completion</span> upon successfully completing the program</li>
                                        <li><span className="fw-bold">Letter of Recommendation</span> from our CEO</li>
                                        <li>LinkedIn recommendations from senior executives to boost your professional credibility</li>
                                    </ul>
                                    <p>
                                        This is your chance to stand out, showcase your leadership, and build a
                                        remarkable resume. We can’t wait to see what you bring to the table!
                                    </p>
                                </div>
                                <p className="fw-bold mt-3 text-success">
                                    Ready to make an impact and join a team that truly values your efforts?
                                </p>
                                <div className="d-flex justify-content-center">
                                    <button className="btn btn-success rounded-4 mx-3"
                                        onClick={handleAgree}
                                    >Agree</button>
                                    <button
                                        type="button"
                                        className="btn btn-danger mx-4 rounded-4"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                    >
                                        Disagree
                                    </button>
                                </div>

                                {/* Modal Section */}
                                <div
                                    className="modal fade"
                                    id="exampleModal"
                                    tabIndex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header bg-warning text-white">
                                                <h5 className="modal-title" id="exampleModalLabel">Are You Sure?</h5>
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                ></button>
                                            </div>
                                            <div className="modal-body">
                                                <div>
                                                    <p>
                                                        Hi <span className="fw-bold">{candidate.name}</span>,
                                                    </p>
                                                    <p>
                                                        We understand that this might feel like a big decision, but think about
                                                        what you're walking away from. Becoming a Campus Ambassador at
                                                        <span className="fw-bold"> Academor</span> is a chance to gain real-world
                                                        experience, boost your career, and build meaningful connections. Opportunities like
                                                        this don’t come by every day!
                                                    </p>
                                                    <p>
                                                        By saying "No", you’re missing out on:
                                                    </p>
                                                    <ul className="mb-3">
                                                        <li>
                                                            A <span className="fw-bold">stipend of up to INR 10,000</span> for your
                                                            performance.
                                                        </li>
                                                        <li>
                                                            Premium <span className="fw-bold">certificates and recommendations</span> that can fast-track your career.
                                                        </li>
                                                        <li>
                                                            Exclusive <span className="fw-bold">internships</span> with top multinational companies.
                                                        </li>
                                                        <li>
                                                            Expanding your <span className="fw-bold">professional network</span> with industry leaders.
                                                        </li>
                                                    </ul>
                                                    <p>
                                                        We truly believe this opportunity has the potential to shape your
                                                        professional journey in ways that few other experiences can. Many of our
                                                        past Campus Ambassadors have used this as a springboard to launch their
                                                        careers and make a real impact.
                                                    </p>
                                                    <p>
                                                        It’s not too late to change your mind and join us in this exciting
                                                        adventure. Don’t let this be a missed opportunity you look back on and
                                                        wish you had taken.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button className="btn btn-success rounded-4 mx-3" data-bs-dismiss="modal">OK, I’m In!</button>
                                                <button className="btn btn-secondary rounded-4" data-bs-dismiss="modal" onClick={window.close}>No, I'm Sure</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>}
                            {login && <Login />}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Conformation