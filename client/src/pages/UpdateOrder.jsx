import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import Loading from "../components/Loading";
import Message from "../components/Message";
import { contextStore } from "../context/ContextStore";
import { orderReducer } from "../reducers/orderReducer";
import { useStateReducer } from "../reducers/reducerFunctions";
import { stringCapitalize } from "../utils/functions";

const { Group, Control, Label, Select } = Form;
const { VITE_BACKEND_URL } = import.meta.env;

// Updating Order page.
function UpdateOrder() {
    const store = useContext(contextStore);
    const [order, orderDispatch] = useReducer(orderReducer, {});
    const [error, errorDispatch] = useReducer(useStateReducer, "");
    const { userId, orderId } = useParams();

    const { token } = store.tokenStore;

    async function getOrder() {
        try {
            const orderResponse = await axios.get(
                `${VITE_BACKEND_URL}/getorder/${userId}/${orderId}`,
                {
                    headers: {
                        'Authorization': `JWT ${token}`
                    }
                }
            )
            if (orderResponse.status === 201) {
                if (Object.values(orderResponse.data)[0].length) {
                    orderDispatch({ type: "UPDATE_ORDER", payload: orderResponse.data });
                }
                else {
                    errorDispatch("Order not found.")
                }
            }
        }
        catch (error) {
            if (Object.values(error.response.data)[0].length) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    useEffect(
        () => {
            getOrder()
        }, []
    )

    if (error) {
        return <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
    }

    else if (order.products) {
        let shippingComp = [];
        let productsComp = [];
        let paymentComp = [];
        let shippingStatusComp = [];
        let amountComp = [];

        const { shippingAddress, products, payment, amount, shippingStatus } = order;

        function recordChange(e, keyName, objectName, filter) {
            const key = e.target.id;
            const value = e.target.value;
            const comparisionObject = order[keyName];
            const objectType = typeof (comparisionObject);
            const arrayType = Array.isArray(comparisionObject);
            if (!order[keyName]) {
                if (arrayType === false && objectType === "object") {
                    order[keyName] = {}
                }
                else if (arrayType === true && objectType === "object") {
                    order[keyName] = []
                }
                orderDispatch({ type: "UPDATE_ORDER", payload: order });
            }
            if (arrayType === false && objectType === "object") {
                if (order[keyName] && order[keyName][key] != value) {
                    order[keyName][key] = value;
                    orderDispatch({ type: "UPDATE_ORDER", payload: order });
                }
            }
            else if (arrayType === false && objectType !== "object") {
                if (order[keyName] && order[keyName] != value) {
                    order[keyName] = value;
                    orderDispatch({ type: "UPDATE_ORDER", payload: order });
                }
            }
            if (order["shippingStatus"] === "Cancelled" || order["shippingStatus"] === "Returned") {
                order["payment"]["paymentStatus"] = "Refund Inititiated";
                orderDispatch({ type: "UPDATE_ORDER", payload: order });
            }
        }

        async function handleSubmit(event) {
            event.preventDefault()
            try {
                const response = await axios.put(
                    `${VITE_BACKEND_URL}/updateorder`,
                    {
                        orderId,
                        ...order
                    },
                    {
                        headers: {
                            'Authorization': `JWT ${token}`
                        }
                    }
                )
                if (response.status === 201) {
                    toast.success("Order Updated Successfully.", { position: "bottom-center" });
                    orderDispatch({ type: "UPDATE_ORDER", payload: response.data });
                }
            }
            catch (error) {
                if (Object.values(error.response.data)[0].length) {
                    errorDispatch(Object.values(error.response.data)[0])
                }
                else {
                    errorDispatch(error.response.statusText)
                }
            }
        }

        function ShippingComp({ objectKey, value, keyName, objectName, filter }) {
            let disabled = false;
            if (shippingStatus === "Cancelled" || shippingStatus === "Returned") {
                disabled = true;
            }
            else {
                if (keyName === "amount") {
                    disabled = true
                }
            }

            const exclusions = ["shippingStatus", "paymentMethod", "paymentStatus"]

            if (exclusions.includes(objectKey)) {
                const shippingOptions = {
                    shippingStatus: ["Shipped", "Cancelled", "Processing", "Delivered", "Returned", "Delayed", "Out for delivery"],
                    paymentMethod: ["PayPal"],
                    paymentStatus: ["Pending", "Paid", "Failed", "Refunded", "Refund Inititiated"]
                }
                const options = shippingOptions[objectKey].map(
                    (option) => {
                        return <option value={option}>{option}</option>
                    }
                )

                return (
                    <Group key={objectKey} className="mb-3" controlId={`${objectKey}`}>
                        <Label className="fw-medium">{stringCapitalize(objectKey)}</Label>
                        {!disabled
                            ?
                            <Select className="mb-3 rounded-1 outline-0" defaultValue={objectKey === "shippingStatus" ? order[objectKey] : order[keyName][objectKey]} onChange={(e) => recordChange(e, keyName, objectName, filter)} disabled={disabled}>
                                {options}
                            </Select>
                            :
                            <Group key={objectKey} className="mb-3" controlId={`${objectKey}`}>
                                <Control type="text" className="rounded-1" defaultValue={value} onChange={(e) => recordChange(e, keyName, objectName, filter)} disabled={disabled} />
                            </Group>
                        }
                    </Group>
                )
            }
            else {
                return (
                    <Group key={objectKey} className="mb-3" controlId={`${objectKey}`}>
                        <Label className="fw-medium">{`${objectKey.slice(0, 4) === "ship" ? stringCapitalize(objectKey).slice(4) : stringCapitalize(objectKey)}`}</Label>
                        <Control type={(objectKey === "pincode" || objectKey === "shipPhone") ? "number" : "text"} className="rounded-1" defaultValue={value} onChange={(e) => recordChange(e, keyName, objectName, filter)} disabled={disabled} />
                    </Group>
                )
            }
        }

        function iteratObject(keyName, objectName, filter) {
            let tempComp = [];
            for (let objectKey in objectName) {
                const value = objectName[objectKey];
                tempComp.push(
                    <ShippingComp objectKey={objectKey} value={value} keyName={keyName} objectName={objectName} filter={filter} />
                )
            }
            return tempComp
        }

        shippingComp = iteratObject("shippingAddress", shippingAddress)
        productsComp = products.map(
            (product) => {
                const { title, quantity, productId, price } = product
                const newProduct = { title, quantity, price }
                return (
                    <div key={productId}>
                        {iteratObject("products", newProduct, productId)}
                    </div>
                )
            }
        )
        paymentComp = iteratObject("payment", payment)
        shippingStatusComp = iteratObject("shippingStatus", { shippingStatus: shippingStatus })
        amountComp = iteratObject("amount", { amount })

        return (
            <Container className="p-4">
                <ToastContainer />
                {
                    order
                        ?
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col xs={12} md={6}>
                                            <h1>Shipping Address</h1>
                                            {shippingComp}
                                            < Button className="mb-3 d-none d-md-block rounded-1" variant="info" type="submit" disabled={(shippingStatus === "Cancelled" || shippingStatus === "Returned") ? true : false}> Update</Button >
                                        </Col>
                                        <Col xs={12} md={6} className="py-4 py-md-0">
                                            <Row>
                                                <Col className="pt-0 pb-4">
                                                    <h1>Payments</h1>
                                                    {paymentComp}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pt-0 pb-4">
                                                    <h1>Shipping Status</h1>
                                                    {shippingStatusComp}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="pt-0">
                                                    <h1>Subtotal</h1>
                                                    {amountComp}
                                                </Col>
                                            </Row>
                                            <Row className="d-block d-md-none">
                                                <Col>
                                                    < Button className="mb-3 rounded-1" variant="info" type="submit" disabled={(shippingStatus === "Cancelled" || shippingStatus === "Returned") ? true : false}>Update</Button >
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Row>
                                            <h1>Products</h1>
                                            <Col>
                                                <Table >
                                                    <thead>
                                                        <tr className="border-start-0 border-end-0 border-2">
                                                            <th>NAME</th>
                                                            <th>QUANTITY</th>
                                                            <th>PRICE</th>
                                                            <th className="d-none d-md-table-cell">AGE</th>
                                                            <th className="d-none d-lg-table-cell">DESCRIPTION</th>
                                                            <th className="d-none d-sm-table-cell">CATEGORY</th>
                                                            <th className="d-none d-md-table-cell">PRODUCT ID</th>
                                                        </tr>
                                                    </thead >
                                                    <tbody>
                                                        {
                                                            order.products.map(
                                                                ({ productId, quantity, image, title, age, description, price, category, sellerId }, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td >{title}</td>
                                                                            <td>{quantity}</td>
                                                                            <td>{price}</td>
                                                                            <td className="d-none d-md-table-cell">{age}</td>
                                                                            <td className="d-none d-lg-table-cell" style={{ maxWidth: "210px" }}><p className="text-truncate">{description}</p></td>
                                                                            <td className="d-none d-sm-table-cell">{category}</td>
                                                                            <td className="d-none d-md-table-cell">{productId}</td>
                                                                        </tr>
                                                                    )
                                                                }
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                        :
                        ""
                }
            </Container>
        )
    }

    else {
        return <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
    }
}

export default UpdateOrder;