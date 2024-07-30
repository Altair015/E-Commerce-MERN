import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { contextStore } from "../context";

function PayPalApp({ show, cartTotal }) {
    const store = useContext(contextStore);

    const [{ isPending, isResolved, isInitial, isRejected, options }] = usePayPalScriptReducer();

    const navigate = useNavigate();

    const { userId, userType, shippingAddress } = store.userStore.userData;

    const { cartItems, cartDispatch } = store.cart;

    async function getOrders() {
        console.log(userId)
        try {
            const orderResponse = await axios.get(
                `/api/getorders/${userId}/${userType}`,
            )
            console.log(orderResponse)
            if (orderResponse.status === 201) {
                return orderResponse.data.orders.length
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const onCreateOrder = (data, actions) => {
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


    const onApproveOrder = async (data, actions) => {

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
            setTimeout(() => {
                navigate("/placed")
            }, 2000);
            // Handle error as needed
        }
    };


    function onError(data, actions) {
        setTimeout(() => {
            navigate("/placed")
        }, 2000);
    }

    return (
        <div className="checkout pt-2" hidden={show}>
            {isPending ? <p>LOADING...</p> : (
                < PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={onCreateOrder}
                    onApprove={onApproveOrder}
                    onError={onError}

                />
            )
            }
        </div >
    );
}

export default PayPalApp;