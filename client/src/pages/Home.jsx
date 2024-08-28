import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import AdSeller from "../components/AdSeller.jsx";
import Brand from "../components/Brand.jsx";
import Crousel from "../components/Crousel.jsx";
import Loading from "../components/Loading.jsx";
import Message from "../components/Message.jsx";
import { contextStore } from "../context/ContextStore.js";
import { productReducer } from "../reducers/productReducer.js";
import { useStateReducer } from "../reducers/reducerFunctions.js";
const { VITE_BACKEND_URL } = import.meta.env;

// Home page.
function Home() {
    const store = useContext(contextStore);
    const { userId, userType } = store.userStore.userData;
    const [index, indexDispatch] = useReducer(useStateReducer, 0);
    const handleSelect = (selectedIndex) => {
        indexDispatch(selectedIndex);
    };

    const [products, productsDispatch] = useReducer(productReducer, null);
    const [error, errorDispatch] = useReducer(useStateReducer, "");


    async function getProducts() {
        try {
            const response = await axios.get(`${VITE_BACKEND_URL}/getitems/${userType}/${userId}/null`);
            if (response.status === 201) {
                if (response.data.products.length) {
                    productsDispatch({ type: "LOAD_PRODUCTS", payload: response.data.products })
                }
                else {
                    errorDispatch("No products found.")
                }
            }
        }
        catch (error) {
            if (Object.values(error.response.data)[0].length) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    useEffect(
        () => {
            if ((userType === "user" || !userType) && !products?.length) {
                getProducts();
            }
        }, []
    )

    return (
        <>
            {
                (userType === "user" || !userType)
                    ?
                    <Brand />
                    :
                    ""
            }
            {
                error
                    ?
                    <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                    :
                    (userType === "seller" || userType === "admin")
                        ?
                        // Admin and Seller Dashboard
                        <AdSeller />
                        :
                        // Standard User Page
                        <>
                            {
                                (products !== null)
                                    ?
                                    products.length >= 12
                                        ?
                                        <>
                                            <section
                                                className="display-4 fw-semibold text-shadow text-center bg-secondary-subtle py-3">
                                                Featured Products
                                            </section>
                                            <Crousel {...{ products, productsDispatch, errorDispatch, index, handleSelect }} increment={1} carouselClass="d-sm-none" />
                                            <Crousel {...{ products, productsDispatch, errorDispatch, index, handleSelect }} increment={2} carouselClass="d-none d-sm-block d-md-none" />
                                            <Crousel {...{ products, productsDispatch, errorDispatch, index, handleSelect }} increment={3} carouselClass="d-none d-md-block d-lg-none" />
                                            <Crousel {...{ products, productsDispatch, errorDispatch, index, handleSelect }} increment={4} carouselClass="d-none d-lg-block" />
                                        </>
                                        :
                                        ""
                                    :
                                    < Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
                            }
                        </>
            }
        </>
    )
}

export default Home;