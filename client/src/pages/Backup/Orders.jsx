import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { orderReducer } from "../../reducers/orderReducer";
import { contextStore } from "../context";

function Orders() {
    const store = useContext(contextStore);
    const { userId, userType } = store.userStore.userData;

    const [orders, orderDispatch] = useReducer(orderReducer, []);

    async function getOrders(userId, userType) {
        console.log(userId)
        try {
            const orderResponse = await axios.get(
                `/api/getorders/${userId}/${userType}`,
            )
            console.log(orderResponse)
            if (orderResponse.status === 201) {
                if (userType === "user") {
                    orderDispatch({ type: "LOAD_USER_ORDERS", payload: orderResponse.data })
                }
                if (userType === "admin") {
                    orderDispatch({ type: "LOAD_ORDERS", payload: orderResponse.data.ordersFound })
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
        }, []
    )

    return (
        <>
            {
                orders.length
                    ?
                    <Container className="py-4">
                        <Table >
                            <thead>
                                <tr className="border-0 border-bottom border-2">
                                    <th>User ID</th>
                                    <th className="text-end">ACTIONS</th>
                                </tr>
                            </thead >
                            <tbody>

                                {
                                    orders.map(
                                        ({ userId }, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="d-none d-sm-table-cell">{userId}</td>
                                                    <td className="w-100 d-sm-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{userId}</p></td>
                                                    <td className="text-end"><Link to={`/orders/${userId}`} className="border-bottom btn btn-light border-0" key={index}>Details</Link></td>
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

export default Orders;