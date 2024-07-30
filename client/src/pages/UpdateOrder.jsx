import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { orderReducer } from "../reducers/orderReducer";
import { stringCapitalize } from "../utils/InitialData";
import Message from "../components/Message";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useStateReducer } from "../reducers/reducerFunctions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import { contextStore } from "../context";

const { Group, Control, Label, Feedback, Select } = Form;

function UpdateOrder() {
    const { userId, orderId } = useParams();

    const [order, orderDispatch] = useReducer(orderReducer, {});

    const [error, errorDispatch] = useReducer(useStateReducer, "")

    async function getOrder() {
        try {
            const orderResponse = await axios.get(
                `/api/getorder/${userId}/${orderId}`
            )
            console.log(51, Object.values(orderResponse.data)[0].length)
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
            console.log(error)
            if (error.response.status === 404) {
                errorDispatch("Order not found.")
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
    console.log(order)
    if (order.products) {
        console.log(order)
        let shippingComp = [];
        let productsComp = [];
        let paymentComp = [];
        let shippingStatusComp = [];
        let amountComp = [];

        const { shippingAddress, products, payment, amount, shippingStatus } = order;

        function recordChange(e, keyName, objectName, filter) {
            // console.log(e, keyName, objectName, filter)

            const key = e.target.id;
            const value = e.target.value;
            const comparisionObject = order[keyName];
            const objectType = typeof (comparisionObject);
            const arrayType = Array.isArray(comparisionObject);
            // console.log(objectType, arrayType)
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
            console.log(order["shippingStatus"], order["payment"]["paymentStatus"])
            if (order["shippingStatus"] === "Cancelled" || order["shippingStatus"] === "Returned") {
                order["payment"]["paymentStatus"] = "Refund Inititiated";
                console.log(order["shippingStatus"], order["payment"]["paymentStatus"])
                orderDispatch({ type: "UPDATE_ORDER", payload: order });
            }
        }

        async function handleSubmit(event) {
            event.preventDefault()
            try {
                const response = await axios.put(
                    `/api/updateorder`,
                    {
                        orderId,
                        ...order
                    }
                )
                console.log(response)
                if (response.status === 201) {
                    toast.success("Order Updated Successfully.", { position: "bottom-center" });
                    orderDispatch({ type: "UPDATE_ORDER", payload: response.data });
                }
            }
            catch (error) {
                if (error.response.statusText) {
                    toast.error(error.response.statusText, { position: "bottom-center" });
                }
                const err = Object.values(error.response.data)[0]
                console.log(err)
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
                        <Control type="text" className="rounded-1" defaultValue={value} onChange={(e) => recordChange(e, keyName, objectName, filter)} disabled={disabled} />
                    </Group>
                )
            }
        }

        function iteratObject(keyName, objectName, filter) {
            // console.log(objectName, comparisionObject)
            let tempComp = [];
            for (let objectKey in objectName) {
                // console.log(key)
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
                                            < Button className="mb-3 d-none d-md-block" variant="info" type="submit" disabled={(shippingStatus === "Cancelled" || shippingStatus === "Returned") ? true : false}> Update</Button >
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
                                                    < Button className="mb-3" variant="info" type="submit" disabled={(shippingStatus === "Cancelled" || shippingStatus === "Returned") ? true : false}>Update</Button >
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
    if (error) {
        return <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
    }
    else {
        return <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
    }
}

export default UpdateOrder;