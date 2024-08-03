import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { contextStore } from "../context/ContextStore";

function PayPalApp({ show, cartTotal, error, errorDispatch }) {
    const store = useContext(contextStore);

    const { token, getToken } = store.tokenStore;

    const [{ isPending }] = usePayPalScriptReducer();

    const navigate = useNavigate();

    const { userId, userType, shippingAddress } = store.userStore.userData;

    const { cartItems, cartDispatch } = store.cart;

    async function getOrders() {
        console.log(userId)
        try {
            const orderResponse = await axios.get(
                `/api/getorders/${userId}/${userType}`,
                {
                    headers: { 'Authorization': `JWT ${token}` }
                }
            )
            console.log(orderResponse)
            if (orderResponse.status === 201) {
                return orderResponse.data.orders.length
            }
        }
        catch (error) {
            console.log(error)
            if (Object.values(error.response.data)[0]) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    const onCreateOrder = (data, actions) => {
        console.log("onCreateOrder")

        getOrders()
        console.log("onCreateOrder", error)
        if (!error) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: parseFloat(cartTotal / 83.51).toFixed(1),
                        },
                    },
                ],
                application_context: {
                    shipping_preference: 'NO_SHIPPING' // This disables shipping address
                }
            });
        }
    }


    const onApproveOrder = async (data, actions) => {
        console.log("onApprove")
        try {
            const details = await actions.order.capture();

            let response = null;
            if (details.status === "COMPLETED") {
                const ordersLength = await getOrders();
                console.log(typeof (ordersLength))
                if (!ordersLength || ordersLength === 0) {
                    console.log("IF")
                    response = await axios.post(
                        "/api/createorder",
                        {
                            userId,
                            products: cartItems,
                            shippingAddress,
                            payment: {
                                paymentMethod: "PayPal",
                                paymentStatus: "Paid"
                            },
                            amount: cartTotal
                        },
                        {
                            headers: { 'Authorization': `JWT ${token}` }
                        }
                    )
                }
                else if (ordersLength > 0) {
                    console.log("ELSE")
                    response = await axios.put(
                        "/api/insertorder",
                        {
                            userId,
                            products: cartItems,
                            shippingAddress,
                            payment: {
                                paymentMethod: "PayPal",
                                paymentStatus: "Paid"
                            },
                            amount: cartTotal
                        },
                        {
                            headers: { 'Authorization': `JWT ${token}` }
                        }
                    )
                }
                else {
                    console.log("EDGE CASE")
                }
                console.log(response)
            }
            if (response.status === 201) {
                const { userId, orders } = Object.values(response.data)[1]
                console.log(63, userId, orders);
                cartDispatch({ type: "EMPTY_CART" })

                // extracting the order id from response and sending it to the next
                setTimeout(() => {
                    navigate(`/placed/${orders.slice(-1)[0]["orderId"]}`)
                }, 2000);
            }
        }
        catch (error) {
            console.error(error);
            if (Object.values(error.response.data)[0]) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    };


    function onError(data, actions) {
        if (!error) {
            navigate("/placed")
        }
    }

    return (
        <div className="checkout pt-2" hidden={show}>
            {isPending ? <p>LOADING...</p> : (
                < PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={onCreateOrder}
                    onApprove={onApproveOrder}
                    onError={onError}
                    onCancel={() => navigate("/placed")}
                />
            )
            }
        </div >
    );
}

export default PayPalApp;