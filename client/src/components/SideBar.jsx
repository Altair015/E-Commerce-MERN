import { useContext } from "react";
import { Link } from "react-router-dom";
import { contextStore } from "../context/ContextStore";
import "./SideBar.css";

// SideBar component for the larger screens.
function SideBar({ sideShow, sideShowDispatch }) {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;

    let visibilityClass = "side-bar-container";
    const commmonClass = "text-decoration-none text-info fw-medium";
    let textDisplay = "textHide";

    if (sideShow) {
        visibilityClass = "side-bar-expanded";
        textDisplay = "textVisible"
    }

    return (
        <div className={`d-none d-sm-block ${visibilityClass} bg-dark h-100 overflow-auto`}>
            <div className={`${textDisplay} d-sm-flex flex-column px-2`}>
                <Link to="/" className={`${commmonClass} fs-5 px-1 pt-1 text-light`}>Home</Link>
            </div>
            <div className={`${textDisplay} d-sm-flex flex-column px-2`}>
                <h5 className={`${commmonClass} cursor-none fs-5 px-1 pt-1 text-light`}>Categories</h5>

                {
                    (userType === "admin")
                        ?
                        <>
                            <Link to="/product" className={`${commmonClass} px-2`}>Add Product</Link>
                            <Link to="/products" className={`${commmonClass} px-2 py-1`}>Manage Products</Link>
                            <Link to="/orders" className={`${commmonClass} px-2`}>Manage Orders</Link>
                            <Link to="/users" className={`${commmonClass} px-2`}>Manage Users</Link>
                        </>
                        :
                        (userType === "seller")
                            ?
                            <>
                                <Link to="/product" className={`${commmonClass} px-2`}>Add Product</Link>
                                <Link to="/products" className={`${commmonClass} px-2 py-1`}>Manage Products</Link>
                            </>
                            :
                            <>
                                <Link to="/products" className={`${commmonClass} px-2`}>All Products</Link>
                                <Link to="/food" className={`${commmonClass} px-3 py-1`}>Food</Link>
                                <Link to="/litter" className={`${commmonClass} px-3`}>Litter</Link>
                                <Link to="/toys" className={`${commmonClass} px-3 py-1`}>Toys</Link>
                                <Link to="/accessories" className={`${commmonClass} px-3`}>Accessories</Link>
                            </>
                }

            </div>

            {userId
                ?
                ""
                :
                <>
                    <div className={`${textDisplay} d-sm-flex flex-column px-2`}>
                        <h5 className={`${commmonClass} cursor-none fs-5 px-1 pt-1 text-light`}>Sign In</h5>
                        <Link to="/login/user" className={`${commmonClass} px-3`}>User</Link>
                        <Link to="/login/seller" className={`${commmonClass} px-3 py-1`}>Seller</Link>
                        <Link to="/login/admin" className={`${commmonClass} px-3`}>Admin</Link>
                    </div>
                    <div className={`${textDisplay} d-sm-flex flex-column px-2`}>
                        <h5 className={`${commmonClass} cursor-none fs-5 px-1 pt-1 text-light`}>Sign Up</h5>
                        <Link to="/signup/user" className={`${commmonClass} px-3`}>User</Link>
                        <Link to="/signup/seller" className={`${commmonClass} px-3 py-1`}>Seller</Link>
                        <Link to="/signup/admin" className={`${commmonClass} px-3`}>Admin</Link>
                    </div>
                </>
            }

            <div className={`${textDisplay} d-sm-flex flex-column px-2`}>
                <Link to="/contact" className={`${commmonClass} fs-5 px-1 pt-1 text-light`}>Contact Us</Link>
            </div>
            <div className={`${textDisplay} d-sm-flex flex-column px-2`}>
                <Link to="/about" className={`${commmonClass} fs-5 px-1 pt-1 text-light`}>About Us</Link>
            </div>
        </div >
    )
}

export default SideBar;