import { useContext, useEffect, useReducer } from "react";
import AdSeller from "../components/AdSeller.jsx";
import Brand from "../components/Brand.jsx";
import Crousel from "../components/Crousel.jsx";
import { contextStore } from "../context.js";
import { productReducer } from "../reducers/productReducer.js";
import { useStateReducer } from "../reducers/reducerFunctions.js";
import axios from "axios";

function Home() {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;

    const [index, indexDispatch] = useReducer(useStateReducer, 0);

    const handleSelect = (selectedIndex) => {
        indexDispatch(selectedIndex);
    };

    const [products, productsDispatch] = useReducer(productReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "");

    console.log(products)

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
            if (error.response.status === 404) {
                errorDispatch("No products found.")
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
                                    <Crousel {...{ products, productsDispatch, index, handleSelect }} increment={1} carouselClass="d-sm-none" />
                                    <Crousel {...{ products, productsDispatch, index, handleSelect }} increment={2} carouselClass="d-none d-sm-block d-md-none" />
                                    <Crousel {...{ products, productsDispatch, index, handleSelect }} increment={3} carouselClass="d-none d-md-block d-lg-none" />
                                    <Crousel {...{ products, productsDispatch, index, handleSelect }} increment={4} carouselClass="d-none d-lg-block" />
                                </>
                                :
                                ""
                        }
                    </>
            }

        </>
    )
}

export default Home;