import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { contextStore } from "../context/ContextStore";
import { orderReducer } from "../reducers/orderReducer";
import { useStateReducer } from "../reducers/reducerFunctions";
const { VITE_BACKEND_URL } = import.meta.env;

// List of orders
function OrderHistory() {
    const store = useContext(contextStore);
    const { token } = store.tokenStore;
    const { userId, userType } = store.userStore.userData;
    const [orders, orderDispatch] = useReducer(orderReducer, []);
    const [error, errorDispatch] = useReducer(useStateReducer, "")

    async function getOrders(userId, userType) {
        try {
            const orderResponse = await axios.get(
                `${VITE_BACKEND_URL}/getorders/${userId}/${userType}`,
                {
                    headers: { 'Authorization': `JWT ${token}` }
                }
            )
            if (orderResponse.status === 201) {
                if (userType === "user") {
                    if (orderResponse.data.userId) {
                        orderDispatch({ type: "LOAD_USER_ORDERS", payload: orderResponse.data })
                    }
                }
                else if (userType === "admin") {
                    if (orderResponse.data.ordersFound.length) {
                        orderDispatch({ type: "LOAD_ORDERS", payload: orderResponse.data.ordersFound })
                    }
                    else {
                        errorDispatch("No orders found.")
                    }
                }
            }
        }
        catch (error) {
            if (Object.values(error.response.data)[0]) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    useEffect(
        () => {
            getOrders(userId, userType)
        }, []
    )

    return (
        <>
            {
                error
                    ?
                    // <p className="text-center display-6 fw-medium pt-4">No Records Found.</p>
                    <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                    :
                    orders.length
                        ?
                        <Container className="py-4 ">
                            <ToastContainer position="bottom-center" />
                            <Table className="w-100">
                                <thead>
                                    <tr className="border-0 border-bottom border-2">
                                        <th>ORDER ID</th>
                                        <th className="d-none d-md-table-cell">DATE</th>
                                        <th className="d-none d-md-table-cell">TOTAL</th>
                                        <th className="d-none d-sm-table-cell">PAID</th>
                                        <th className="d-none d-lg-table-cell">DELIVERED</th>
                                        <th className="text-center">ACTIONS</th>
                                    </tr>
                                </thead >
                                <tbody>
                                    {
                                        orders.map(
                                            ({ orderId, amount, shippingStatus, createdAt, payment }, index) => {
                                                const date = new Date(createdAt)
                                                return (
                                                    <tr key={index} >
                                                        <td className="d-none d-sm-table-cell">{orderId}</td>
                                                        <td className="w-100 d-sm-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{orderId}</p></td>
                                                        <td className="d-none text-nowrap d-md-table-cell">{date.toDateString()}</td>
                                                        <td className="d-none d-md-table-cell">{amount}</td>
                                                        <td className="d-none d-lg-table-cell">{payment.paymentStatus}</td>
                                                        <td className="w-100 d-none d-sm-table-cell d-lg-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{payment.paymentStatus}</p></td>
                                                        <td className="d-none d-lg-table-cell">{shippingStatus}</td>
                                                        <td className="text-center"><Link to={`/${userType === "admin" ? "updateorder" : "order"}/${userId}/${orderId}`} className="border-bottom btn btn-light border-0" key={index}>{userType === "admin" ? "Edit" : "View"}</Link></td>
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Container >
                        :
                        <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }
        </>

    )
}

export default OrderHistory;