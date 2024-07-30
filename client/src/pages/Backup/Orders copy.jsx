import { useContext } from "react";
import { contextStore } from "../context";
import { Container, Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Orders() {
    const store = useContext(contextStore);
    const { orders } = store.orderStore;
    console.log(orders)

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