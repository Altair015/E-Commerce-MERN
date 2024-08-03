import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import MyCard from "../components/MyCard";
import { contextStore } from "../context/ContextStore";
import { productReducer } from "../reducers/productReducer";
import ProductsComponent from "../components/ProductsComponent";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useStateReducer } from "../reducers/reducerFunctions";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";


function Products() {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;
    const { cartItems } = store.cart

    const getLocation = useLocation();

    const [products, productsDispatch] = useReducer(productReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "")

    async function getProducts() {
        try {
            const response = await axios.get(`/api/getitems/${userType}/${userId}/null`);
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
                    products.length
                        ?
                        <ProductsComponent {...{ products, userType, errorDispatch, category: "Litter" }} />
                        :
                        <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }
        </>
    )

}

export default Products;