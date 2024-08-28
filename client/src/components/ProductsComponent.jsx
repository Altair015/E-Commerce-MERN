import { Container, Table } from "react-bootstrap";
import MyCard from "./MyCard";
import { Link } from "react-router-dom";
import Message from "./Message";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// Component to display the products.
function ProductsComponent({ products, category, userType, errorDispatch }) {
    const productsWithCategory = products.reduce((accumu, product) => {
        if (product.category === category) {
            const comp = <MyCard {...{ ...product, errorDispatch }} key={product.productId} />;
            return [...accumu, comp]; // Return the updated accumulator
        }
        return accumu;
    }, [])
    return (
        <>
            {
                (userType === "admin" || userType === "seller")
                    ?
                    <Container className="py-4 ">
                        <Table className="w-100">
                            <thead>
                                <tr className="border-0 border-bottom border-2">
                                    <th>PRODUCT ID</th>
                                    <th className="d-none d-lg-table-cell">NAME</th>
                                    <th className="d-none d-md-table-cell">PRICE</th>
                                    <th className="d-none d-md-table-cell">QUANTITY</th>
                                    <th className="d-none d-md-table-cell">AGE</th>
                                    <th className="d-none d-lg-table-cell">DESCRIPTION</th>
                                    <th className="d-none d-md-table-cell">CATEGORY</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead >
                            <tbody>
                                {
                                    category
                                        ?
                                        products.reduce((accumu, { productId, quantity, title, age, description, price, sellerId, ...product }, index) => {
                                            if (product.category === category) {
                                                const comp = (
                                                    <tr key={index} >
                                                        <td className="d-none d-sm-table-cell">{productId}</td>
                                                        <td className="w-100 d-sm-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{productId}</p></td>
                                                        <td className="w-100 d-none d-lg-table-cell" style={{ maxWidth: "100px" }}><p className="text-truncate">{title}</p></td>
                                                        <td className="d-none d-md-table-cell">{price}</td>
                                                        <td className="d-none d-md-table-cell">{quantity}</td>
                                                        <td className="d-none d-md-table-cell">{age}</td>
                                                        <td className="w-100 d-none d-lg-table-cell" style={{ maxWidth: "210px" }}><p className="text-truncate">{description}</p></td>
                                                        <td className="d-none d-md-table-cell">{category}</td>
                                                        <td className="text-center"><Link to={`/product/${productId}`} className="border-bottom btn btn-light border-0" key={index}>Edit</Link></td>
                                                    </tr>
                                                );
                                                return [...accumu, comp]; // Return the updated accumulator
                                            }
                                            return accumu;
                                        }, [])
                                        :
                                        products.map(
                                            ({ productId, quantity, title, age, description, price, category, sellerId }, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td className="d-none d-sm-table-cell">{productId}</td>
                                                        <td className="w-100 d-sm-none" style={{ maxWidth: "210px" }}><p className="text-truncate">{productId}</p></td>
                                                        <td className="w-100 d-none d-lg-table-cell" style={{ maxWidth: "100px" }}><p className="text-truncate">{title}</p></td>
                                                        <td className="d-none d-md-table-cell">{price}</td>
                                                        <td className="d-none d-md-table-cell">{quantity}</td>
                                                        <td className="d-none d-md-table-cell">{age}</td>
                                                        <td className="w-100 d-none d-lg-table-cell" style={{ maxWidth: "210px" }}><p className="text-truncate">{description}</p></td>
                                                        <td className="d-none d-md-table-cell">{category}</td>
                                                        <td className="text-center"><Link to={`/product/${productId}`} className="border-bottom btn btn-light border-0" key={index}>Edit</Link></td>
                                                    </tr>
                                                )

                                            }
                                        )
                                }
                            </tbody>
                        </Table>
                    </Container >
                    :
                    <>
                        {
                            category
                                ?
                                productsWithCategory.length
                                    ?
                                    < div className="d-flex justify-content-center px-4 py-4" >
                                        < div className="d-flex gap-3 flex-wrap" >
                                            {productsWithCategory}
                                        </div>
                                    </div>
                                    :
                                    <Message text='No Products Found.' icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                                :
                                < div className="d-flex justify-content-center px-4 py-4" >
                                    < div className="d-flex gap-3 flex-wrap" >
                                        {
                                            products.map(
                                                (product, index) => {
                                                    return (
                                                        <MyCard
                                                            key={product.productId}
                                                            {...{ ...product, errorDispatch }}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                </div>
                        }
                    </>
            }
        </>

    )
}

export default ProductsComponent;