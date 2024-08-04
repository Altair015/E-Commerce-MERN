import React from "react";
import { Outlet } from "react-router-dom";

// Component to render the body of the application
function Main({ search, searchDispatch }) {
    return (
        < div className="overflow-auto flex-fill" >
            <Outlet context={[search, searchDispatch]} />
        </div >
    );
}

export default Main;