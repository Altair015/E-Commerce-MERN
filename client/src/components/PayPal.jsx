import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { contextStore } from "../context/ContextStore";
const { VITE_BACKEND_URL } = import.meta.env;

function PayPalApp({ show, cartTotal, error, errorDispatch }) {
    const store = useContext(contextStore);
    const { token } = store.tokenStore;
    const [{ isPending }] = usePayPalScriptReducer();
    const navigate = useNavigate();
    const { userId, shippingAddress } = store.userStore.userData;
    const { cartItems, cartDispatch } = store.cart;

    const onCreateOrder = (data, actions) => {
        if (!error) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: parseFloat(cartTotal / 83.51).toFixed(2),
                        },
                    },
                ],
                application_context: {
                    shipping_preference: 'NO_SHIPPING' // This disables shipping address
                }
            });
        }
    }

    // Creation of the order 
    const onApproveOrder = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            if (details.status === "COMPLETED") {
                const response = await axios.post(
                    `${VITE_BACKEND_URL}/createorder`,
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
                if (response.status === 201) {
                    const { orders } = Object.values(response.data)[1]
                    cartDispatch({ type: "EMPTY_CART" })

                    // extracting the order id from response and sending it to the next
                    navigate(`/placed/${orders.slice(-1)[0]["orderId"]}`)
                }
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