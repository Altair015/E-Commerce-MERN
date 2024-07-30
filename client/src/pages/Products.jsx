import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useLocation } from "react-router-dom";
import ProductsComponent from "../components/Products";
import { contextStore } from "../context";
import { productReducer } from "../reducers/productReducer";
import { useStateReducer } from "../reducers/reducerFunctions";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faExclamation, faSchoolCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading"
import Message from "../components/Message";

function Products() {
    const store = useContext(contextStore);
    const { userId, userType } = store.userStore.userData;

    const getLocation = useLocation();
    console.log(getLocation.pathname)

    const [products, productsDispatch] = useReducer(productReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "")

    async function getProducts() {
        try {
            const response = await axios.get(`/api/getitems/${userType}/${userId}/null`);
            console.log(response)
            if (response.status === 201) {
                if (response.data.products.length) {
                    productsDispatch({ type: "LOAD_PRODUCTS", payload: response.data.products })
                }
                errorDispatch("No products found.")
            }
        }
        catch (error) {
            errorDispatch(error.response.statusText)
            console.log(error)
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

                products.length
                    ?
                    < ProductsComponent {...{ products, userType }} />
                    :
                    error
                        ?
                        <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                        :
                        <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }
        </>
    )

}

export default Products;