import { Link } from "react-router-dom";
import { contextStore } from "../context/ContextStore";
import { useContext } from "react";

function AdSeller() {
    const store = useContext(contextStore);

    const { userType } = store.userStore.userData;

    // Admin and Seller Dashboard UI
    return (
        // Banner for the Dashboard.
        <>
            <div className="bg-info-subtle fw-normal d-flex display-1 justify-content-center p-5 ">
                {
                    (userType === "admin")
                        ?
                        "Admin"
                        :
                        (userType === "seller")
                            ?
                            "Seller"
                            :
                            ""
                }
            </div>

            {/* Buttons for managing the orders/products/users */}
            <div className="d-flex justify-content-center p-3 p-sm-4">
                <div className="d-flex gap-3 justify-content-center justify-content-sm-start flex-wrap">
                    <Link to="/product" className="fs-5 fw-medium flex-fill bg-success-subtle border p-5 pt-3 ps-3 link-dark rounded-1 border-0 text-decoration-none">
                        + Add Product
                    </Link>
                    <Link to="/products" className="fs-5 fw-medium flex-fill bg-success-subtle border p-5 pt-3 ps-3 link-dark rounded-1 border-0 text-decoration-none">
                        Manage Products
                    </Link>
                    {
                        (userType === "admin")
                            ?
                            <>
                                <Link to="/orders" className="fs-5 fw-medium flex-fill bg-success-subtle border p-5 pt-3 ps-3 link-dark rounded-1 border-0 text-decoration-none">
                                    Manage Orders
                                </Link>
                                <Link to="/users" className="fs-5 fw-medium flex-fill bg-success-subtle border p-5 pt-3 ps-3 link-dark rounded-1 border-0 text-decoration-none">
                                    Manage Users
                                </Link>
                            </>
                            :
                            ""
                    }
                </div>
            </div>
        </>
    )
}

export default AdSeller;