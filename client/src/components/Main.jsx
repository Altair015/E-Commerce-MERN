import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Footer from "./Footer";

function Main({ search, searchDispatch, sideShow, sideShowDispatch }) {
    const shows = { sideShow, sideShowDispatch }
    return (
        < div className="overflow-auto flex-fill" >
            {/* <div className="d-flex flex-column vh-100 bg-danger overflow-auto"> */}
            <Outlet context={[search, searchDispatch]} />
        </div >
    );
}

export default Main;