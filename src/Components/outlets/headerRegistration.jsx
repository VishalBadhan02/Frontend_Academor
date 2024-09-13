import "../mediaq/home.css"

const Header = () => {
    return (
        <>
            <div className="column  p-3 pb-0">
                <div className="d-flex">
                    <img src={require("../../assets/logo/New_logo.6e38efabb2c2bf7d4347.png")} style={{ width: 130 }} alt="" />
                    <br />
                    <div className="d-flex align-items-end collab"><p className="m-0 fw-bold" style={{ fontSize: 9 }}>.collaborations</p>
                    </div>

                </div>

                <div className="text-end kshitij_pc">
                    <img src="https://2023.ktj.in/static/media/KTJ-logo-main.ee310a170491658cd90a.png" alt="" style={{ width: 130 }} />
                </div>
                <div>
                    <marquee behavior="slide" className="p-2 py-0" direction="">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1Q2lh7aweiNuE3LObL2pp_kWhtffSJckKw&s" className="px-2" alt="" style={{ width: 80 }} />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png" className="px-3" alt="" style={{ width: 80 }} />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/640px-Cisco_logo_blue_2016.svg.png" alt="" style={{ width: 80 }} className="px-3" />
                    </marquee>
                </div>
                <div>
                    <marquee behavior="slide" className="p-2 py-0" direction="right">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/1024px-IBM_logo.svg.png" className="px-3" alt="" style={{ width: 80 }} />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/640px-Accenture.svg.png" className="px-2" alt="" style={{ width: 80 }} />
                        <img src="https://adsknews.autodesk.com/app/uploads/2021/09/autodesk-logo-primary-rgb-black-large-scaled.jpg" alt="" style={{ width: 80 }} className="px-2" />
                    </marquee>
                </div>
                <div>
                    <img src="https://2023.ktj.in/static/media/KTJ-logo-main.ee310a170491658cd90a.png" className="kshitij" alt="" width={500} />
                </div>
            </div>
        </>
    )
}

export default Header