import { Outlet } from "react-router-dom"
import Header from "./headerRegistration"

export const MainRegistration = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}