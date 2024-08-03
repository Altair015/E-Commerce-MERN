import { useContext, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import MyProduct from "../components/MyProduct";
import UserReview from "../components/UserReview";
import SETTINGS from "../config";
import { contextStore } from "../context/ContextStore";
import { productReducer } from "../reducers/productReducer";
import axios from "axios";
import { useStateReducer } from "../reducers/reducerFunctions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Product() {
    const store = useContext(contextStore);
    const { userType } = store.userStore.userData
    const urlParams = useParams("productId")
    const { productId } = urlParams;
    const [product, productDispatch] = useReducer(productReducer, {});
    const [error, errorDispatch] = useReducer(useStateReducer, "")

    async function getProduct() {
        try {
            const response = await axios.get(`/api/getproduct/${productId}`);
            console.log(25, response)
            if (response.status === 201) {
                if (Object.values(response.data).length) {
                    productDispatch({ type: "LOAD_PRODUCT", payload: response.data })
                }
            }
        }
        catch (error) {
            if (error.response.status === 404) {
                errorDispatch("No product found.")
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    useEffect(
        () => {
            if (productId) {
                getProduct();
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
                    (userType === "admin" || userType === "seller")
                        ?
                        product.title
                            ?
                            // Updation of Product
                            <AddProduct {...{ ...product, productDispatch, errorDispatch }} />
                            :
                            // Creation of Product
                            <AddProduct {...{ errorDispatch }} />
                        :
                        product.title
                            ?
                            <>
                                <MyProduct {...{ ...product, errorDispatch, productDispatch }} />
                                <UserReview {...{ ...product, errorDispatch, productDispatch }} />
                            </>
                            :
                            < Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }
        </>

    )

}

export default Product;