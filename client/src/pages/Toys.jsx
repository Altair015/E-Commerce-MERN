import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import Message from "../components/Message";
import ProductsComponent from "../components/ProductsComponent";
import { contextStore } from "../context/ContextStore";
import { productReducer } from "../reducers/productReducer";
import { useStateReducer } from "../reducers/reducerFunctions";


function Products() {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;
    const { cartItems } = store.cart

    const getLocation = useLocation();
    console.log(getLocation.pathname)

    const [products, productsDispatch] = useReducer(productReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "");

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
            console.log(error)
            errorDispatch(error.response.statusText)
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

    console.log(products)

    return (
        <>
            {
                error
                    ?
                    <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                    :
                    products.length
                        ?
                        <ProductsComponent {...{ products, userType, errorDispatch, category: "Toy" }} />
                        :
                        <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }
        </>
    )

}

export default Products;