import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, ListGroup, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyCartProduct from "../components/MyCartProduct";
import { stringCapitalize } from "../utils/InitialData";
import { contextStore } from "../context";
import { useReducer } from "react";
import { orderReducer } from "../reducers/orderReducer";
const { Group, Control, Label, Feedback, Select } = Form;

function UpdateOrder() {
    const { userId, orderId } = useParams();

    // const store = useContext(contextStore);

    // const { orders, orderDispatch } = store.orderStore;
    // console.log(orders)

    // const [orderOrError, setOrderOrError] = useState({ order: null, error: null });

    const [orders, orderDispatch] = useReducer(orderReducer, { order: null, error: null });

    const { order, error } = orders;

    console.log(order, error)

    const [show, setShow] = useState(true);

    const { Item } = ListGroup;

    const [change, setChange] = useState({});

    // console.log(change)

    function showAlert() {
        let message = error;
        let status = "danger"
        if (order) {
            message = "Order Details Found.";
            status = "success";
        }
        setTimeout(() => {
            setShow(false)
        }, 2000);

        return < Alert show={show} variant={status} dismissible >{message}</Alert>
    }

    async function getOrder() {
        try {
            const orderResponse = await axios.get(
                `/api/getorder/${userId}/${orderId}`
            )
            console.log(51, orderResponse)
            if (orderResponse.status === 201) {
                console.log(53, orderResponse.data);
                setOrderOrError({ ...orderOrError, order: orderResponse.data });
                setOrderOrError({ order: orderResponse.data })
                setChange({ ...orderResponse.data });
                const { orderId } = orderResponse.data;
                orderDispatch({ type: "updateOrder", payload: orderResponse.data });
            }
        }
        catch (error) {
            // console.log(error)
            // console.log(error.response.data)
            const err = Object.values(error.response.data)[0]
            setOrderOrError({ error: err })
        }
    }

    useEffect(
        () => {
            getOrder()
            return () => {
                orderDispatch({ type: "emptyOrders" })
            }
        }, []
    )

    if (order) {
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
            if (!change[keyName]) {
                if (arrayType === false && objectType === "object") {
                    change[keyName] = {}
                }
                else if (arrayType === true && objectType === "object") {
                    change[keyName] = []
                }
                setChange({ ...change })
            }

            // console.log(149, change)
            if (arrayType === false && objectType === "object") {
                // console.log(161, key, value)
                // if (change[keyName][key] && change[keyName][key] != value && comparisionObject[key] != value) {
                if (change[keyName] && change[keyName][key] != value) {
                    change[keyName][key] = value;
                    setChange({ ...change })
                }
            }
            else if (arrayType === false && objectType !== "object") {
                if (change[keyName] && change[keyName] != value) {
                    change[keyName] = value;
                    setChange({ ...change });
                }
            }

            if (change["shippingStatus"] === "Cancelled" || change["shippingStatus"] === "Returned") {
                change["payment"]["paymentStatus"] = "Refund Inititiated";
                setChange({ ...change });
            }
            console.log(160, change)
        }

        async function handleSubmit(event) {
            event.preventDefault()
            console.log(change)

            try {
                const response = await axios.put(
                    `/api/updateorder`,
                    {
                        // userId,
                        orderId,
                        ...change
                    }
                )
                console.log(response)
                if (response.status === 201) {
                    const { orderId } = response.data;
                    // setChange({ ...change })
                    setOrderOrError({ ...orderOrError, order: response.data })
                    orderDispatch({ type: "updateOrder", payload: { userId, orderId, order: response.data } })
                }
            }
            catch {
                console.log(error)
            }
        }

        function ShippingComp({ objectKey, value, keyName, objectName, filter }) {
            // console.log(objectKey, value, keyName, objectName, filter)
            let disabled = false;

            if (shippingStatus === "Cancelled") {
                disabled = true;
            }
            else {
                if (keyName === "amount") {
                    disabled = true
                }
            }

            const exclusions = ["shippingStatus", "paymentMethod", "paymentStatus"]

            if (exclusions.includes(objectKey)) {
                // console.log(147, change[objectKey], change[keyName][objectKey])
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
                            <Select className="mb-3 rounded-1 outline-0" defaultValue={objectKey === "shippingStatus" ? change[objectKey] : change[keyName][objectKey]} onChange={(e) => recordChange(e, keyName, objectName, filter)} disabled={disabled}>
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
                {showAlert()}
                {
                    order
                        ?
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Row className="">
                                        <Col xs={12} md={6}>
                                            <h1>Shipping Address</h1>
                                            {shippingComp}
                                            < Button className="mb-3 d-none d-md-block" variant="info" type="submit" > Update</Button >
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
                                                    < Button className="mb-3" variant="info" type="submit" >Update</Button >
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
                                                            // new Date().toLocaleDateString
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
    else if (error) {
        return (
            <Container className="p-4">
                {showAlert()}
            </Container>
        )
    }
}

export default UpdateOrder;