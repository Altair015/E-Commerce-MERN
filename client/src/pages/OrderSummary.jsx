import { Link } from "react-router-dom";
import PayPalApp from "../components/PayPal";

import { useContext, useEffect, useReducer } from "react";
import { Button, Col, Container, ListGroup, ProgressBar, Row } from 'react-bootstrap';
import MyCartProduct from "../components/MyCartProduct";
import SETTINGS from "../config";
import { contextStore } from "../context";
import { showReducer, useStateReducer } from "../reducers/reducerFunctions";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Loading from "../components/Loading";

function OrderSummary() {
    const store = useContext(contextStore);
    const { userData } = store.userStore;
    const { cartItems } = store.cart;
    const { shippingAddress } = store.userStore.userData;
    const { shipName } = shippingAddress;
    const { token, getToken } = store.tokenStore;

    const [initialOptions, initialOptionsDispatch] = useReducer(useStateReducer, { "client-id": "", currency: "USD", intent: "capture", })

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

    async function loadClientId() {
        console.log(token)
        try {
            const response = await axios.get(
                "/api/getpaypalid",
                {
                    headers: { 'Authorization': `JWT ${token}` }
                }
            )
            console.log(response)
            if (response.status === 201) {
                // showDispatch({ type: "SET_SHOW", payload: false })
                initialOptionsDispatch({ ...initialOptions, "client-id": response.data.payPalClientId })
            }
        } catch (error) {
            toast.info("Your session is expired", { position: "bottom-center" });
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

    if (initialOptions["client-id"]) {
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
                                    {/* <Button variant="info" type="submit" className="fw-medium rounded-1 w-100 pt-2 my-3" hidden={!show}>
                                        Proceed to Payment
                                    </Button> */}
                                    {/* <PayPalApp show={show} cartTotal={total} /> */}
                                    <PayPalApp cartTotal={total} />
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