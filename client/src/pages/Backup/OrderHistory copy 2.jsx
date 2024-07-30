import { useContext, useState } from "react";
import { contextStore } from "../context";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

function OrderHistory() {
    const store = useContext(contextStore);

    const { orders, orderDispatch } = store.orderStore;

    const { userId, userType } = store.userStore.userData;

    async function getOrders(userId, userType) {
        console.log(userId)
        try {
            const orderResponse = await axios.get(
                `/api/getorders/${userId}/${userType}`,
            )
            console.log(orderResponse)
            if (orderResponse.status === 201) {
                if (userType === "user") {
                    orderDispatch({ type: "loadUserOrders", payload: orderResponse.data })
                }
                if (userType === "admin") {
                    orderDispatch({
                        type: "loadOrders", payload: orderResponse.data.ordersFound
                    })
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(
        () => {
            getOrders(userId, userType)
            // return () => {
            //     orderDispatch({ type: "emptyOrders" })
            // }
        }, []
    )

    return (
        // <h1>OrderHistory...</h1>
        <>
            {
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
                                                    <td className="text-center"><Link to={`/${userType === "admin" ? "updateorder" : "order"}/${userId}/${orderId}`} className="border-bottom btn btn-light border-0" key={index}>Edit</Link></td>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>
                        </Table>
                    </Container >
                    :
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        sdfdsf
                    </div>
            }
        </>

    )
}

export default OrderHistory;