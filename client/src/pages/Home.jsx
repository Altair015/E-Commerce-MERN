import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import AdSeller from "../components/AdSeller.jsx";
import Brand from "../components/Brand.jsx";
import Crousel from "../components/Crousel.jsx";
import { productReducer } from "../reducers/productReducer.js";
import { useStateReducer } from "../reducers/reducerFunctions.js";
import { contextStore } from "../context/ContextStore.js";
import Loading from "../components/Loading.jsx";
import Message from "../components/Message.jsx";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Home() {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;

    const [index, indexDispatch] = useReducer(useStateReducer, 0);

    const handleSelect = (selectedIndex) => {
        indexDispatch(selectedIndex);
    };

    const [products, productsDispatch] = useReducer(productReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "");

    console.log(products, error)

    async function getProducts() {
        try {
            const response = await axios.get(`/api/getitems/${userType}/${userId}/null`);
            console.log(response)
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
            console.log("USEFFCT")
            if (!products.length) {
                getProducts();
            }
        }, []
    )

    return (
        <>
            {
                error
                    ?
                    <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                    :
                    (userType === "seller" || userType === "admin")
                        ?
                        <AdSeller />
                        :
                        <>
                            <Brand />
                            {
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
                                    < Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
                            }
                        </>
            }
        </>
    )
}

export default Home;