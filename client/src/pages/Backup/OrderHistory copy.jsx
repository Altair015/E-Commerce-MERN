import { useContext, useState } from "react";
import { contextStore } from "../context";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function OrderHistory() {
    const store = useContext(contextStore);
    // const { orders, userId } = store.orderStore.orders[0];
    // console.log(orders, userId)

    const { userType } = store.userStore.userData

    let userId = "";

    const params = useParams();

    if (Object.keys(params).length) {
        userId = params.userId
    }
    else {
        userId = store.orderStore.orders[0].userId
    }

    const userOrders = store.orderStore.orders.find(
        (orders) => {
            console.log(orders.userId, userId)
            return orders.userId === userId
        }
    )
    console.log(userOrders)

    const { orders } = userOrders

    // const [order, setOrder] = useState(null)

    // async function handleClick(orderId) {
    //     console.log(orderId)

    //     try {
    //         const orderResponse = await axios.get(
    //             `/api/getorder/${userId}/${orderId}`
    //         )
    //         console.log(orderResponse)
    //         if (orderResponse.status === 201) {
    //             setOrder(orderResponse.data)
    //             toast.info(
    //                 "ORDER FOUND"
    //             )
    //         }
    //     }
    //     catch (error) {
    //         console.log(error.response.data)
    //         const err = Object.values(error.response.data)[0]
    //         toast.error(
    //             err
    //         )
    //     }
    // }

    return (
        // <h1>OrderHistory...</h1>
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
                                        <td className="text-center"><Link to={`/${userType === "admin" ? "updateorder" : "order"}/${userId}/${orderId}`} className="border-bottom btn btn-light border-0" key={index}>Edit</Link></td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </Table>
        </Container >
    )
}

export default OrderHistory;