import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Col, Container, ListGroup, ProgressBar, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import Message from "../components/Message";
import MyCartProduct from "../components/MyCartProduct";
import PayPalApp from "../components/PayPal";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
const { VITE_BACKEND_URL } = import.meta.env;

function OrderSummary() {
    const store = useContext(contextStore);
    const { userData } = store.userStore;
    const { cartItems } = store.cart;
    const { shippingAddress } = store.userStore.userData;
    const { shipName } = shippingAddress;
    const { token, getToken } = store.tokenStore;
    const [initialOptions, initialOptionsDispatch] = useReducer(useStateReducer, { "client-id": "", currency: "USD", intent: "capture", })
    const [error, errorDispatch] = useReducer(useStateReducer, "");
    const { Item } = ListGroup;

    const total = cartItems.reduce(
        (total, item) => {
            return total + (item.quantity * item.price)
        }, 20
    )

    let address = "";

    for (let item of Object.keys(userData.shippingAddress)) {
        if (userData.shippingAddress[item] && item !== "shipName") {
            if (!address) {
                address += `${userData.shippingAddress[item]}`
            }
            else if (item === "pincode") {
                address += ` - ${userData.shippingAddress[item]}`
            }
            else {
                address += `, ${userData.shippingAddress[item]}`
            }
        }
    }

    // getting paypal client id from the server
    async function loadClientId() {
        try {
            const response = await axios.get(
                `${VITE_BACKEND_URL}/getpaypalid`,
                {
                    headers: { 'Authorization': `JWT ${token}` }
                }
            )
            if (response.status === 201) {
                // showDispatch({ type: "SET_SHOW", payload: false })
                initialOptionsDispatch({ ...initialOptions, "client-id": response.data.payPalClientId })
            }
        }
        catch (error) {
            toast.info("Your session is expired", { position: "bottom-center" });
            if (Object.values(error.response.data)[0]) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }
    if (token && !initialOptions["client-id"]) {
        loadClientId()
    }
    useEffect(
        () => {
            getToken()
        }, []
    )

    if (error) {
        return <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
    }
    else if (initialOptions["client-id"]) {
        return (
            <PayPalScriptProvider options={initialOptions}>
                <Container className="p-4">
                    <ToastContainer />
                    <ProgressBar now={75} />
                    <h1 className="my-3">Preview Order</h1>
                    <Row className="gx-5">
                        <Col sm={12} lg={8}>
                            <Row className="mb-3">
                                <Col className="p-4 border rounded-1 lh-md">
                                    <h4>Shipping</h4>
                                    <Item><span className="fw-bold">Name :</span>&nbsp;{shipName}</Item>
                                    <Item>
                                        <span className="fw-bold">Address :</span>
                                        &nbsp;{address}
                                    </Item>
                                    <Item className="pt-2">
                                        <Link to="/ship">
                                            Edit
                                        </Link>
                                    </Item>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col className="p-4 border rounded-1 lh-md">
                                    <h4>Payment</h4>
                                    <Item><span className="fw-bold">Method :</span>&nbsp; Paypal</Item>
                                    <Item className="pt-2">
                                        <Link to="/pay">
                                            Edit
                                        </Link>
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <Row className="mb-3">
                                        <Col className="p-4 border rounded-1 lh-md" sm={12}>
                                            <h4>Products</h4>
                                            {
                                                cartItems.map(
                                                    (product, index) => {
                                                        return (
                                                            <MyCartProduct
                                                                key={product.productId}
                                                                {...product}
                                                                cartProductQuantity={product.quantity}
                                                                displayActions="d-none"

                                                            />
                                                        )
                                                    }
                                                )
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="px-4 pt-4 pt-lg-0 border-0 rounded-1">
                            <Row>
                                <Col className="p-4 border rounded-1">
                                    <h4>Order Summary</h4>
                                    <Row className="px-3 py-2 border-bottom">
                                        <Col className="px-0">Items</Col>
                                        <Col className="px-0">₹ {total - 20}.00</Col>
                                    </Row>
                                    <Row className="px-3 py-2 border-bottom">
                                        <Col className="px-0">Shipping</Col>
                                        <Col className="px-0">₹ 0.00</Col>
                                    </Row>
                                    <Row className="px-3 py-2 border-bottom">
                                        <Col className="px-0">Tax</Col>
                                        <Col className="px-0">₹ 20.00</Col>
                                    </Row>
                                    <Row className="px-3 py-2 ">
                                        <Col className="px-0 fw-bold">Order Total</Col>
                                        <Col className="px-0 fw-bold">₹ {total}.00</Col>
                                    </Row>
                                    <PayPalApp cartTotal={total} {...{ error, errorDispatch, token, getToken }} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </PayPalScriptProvider>
        );
    }
    else {
        return <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
    }
}

export default OrderSummary;