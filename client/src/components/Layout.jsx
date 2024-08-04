import { useReducer, useRef } from "react";
import { showReducer, useStateReducer } from "../reducers/reducerFunctions";
import { searchReducer } from "../reducers/searchReducer";
import Footer from "./Footer";
import "./LayOut.css";
import Main from "./Main";
import MyNavBar from "./NavBar";
import SideBar from "./SideBar";

function Layout() {
    const [search, searchDispatch] = useReducer(searchReducer, []);

    const [sideShow, sideShowDispatch] = useReducer(showReducer, false);

    const layoutProps = { search, searchDispatch, sideShow, sideShowDispatch };

    // Layout for the application
    return (
        <div className="d-flex vh-100">
            <SideBar {...layoutProps} />
            <div id="layout" className={`width-transition vh-100 d-flex flex-column`} onClick={() => sideShowDispatch({ type: "SET_SHOW", payload: false })}>
                <MyNavBar {...layoutProps} />
                <Main {...layoutProps} />
                <Footer />
            </div>
        </div>
    )
}

export default Layout;