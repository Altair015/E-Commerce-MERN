import { useContext } from "react";
import { contextStore } from "../context";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sellers() {
    const store = useContext(contextStore);
    const { products } = store.productStore;

    const temp = [];

    return (
        <>
            {
                products.length
                    ?
                    <Container className="py-4">
                        <Table >
                            <thead>
                                <tr className="border-0 border-bottom border-2">
                                    <th>Seller ID</th>
                                    <th className="text-end">ACTIONS</th>
                                </tr>
                            </thead >
                            <tbody>

                                {
                                    // new Date().toLocaleDateString
                                    products.map(
                                        ({ sellerId }, index) => {
                                            console.log(temp)
                                            if (!temp.includes(sellerId._id)) {
                                                temp.push(sellerId._id)
                                                return (
                                                    <tr key={index}>
                                                        <td className="d-none d-sm-table-cell">{sellerId._id}</td>
                                                        <td className="w-100 d-sm-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{sellerId._id}</p></td>
                                                        <td className="text-end"><Link to={`/products/${sellerId._id}`} className="border-bottom btn btn-light border-0" key={index}>Details</Link></td>
                                                    </tr>
                                                )
                                            }
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

export default Sellers;