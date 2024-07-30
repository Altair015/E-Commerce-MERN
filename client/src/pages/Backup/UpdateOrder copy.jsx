import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MyCartProduct from "../components/MyCartProduct";
import { stringCapitalize } from "../utils/InitialData";
const { Group, Control, Label, Feedback } = Form;

function UpdateOrder() {
    const { userId, orderId } = useParams();

    const [orderOrError, setOrderOrError] = useState({ order: null, error: null });

    const { order, error } = orderOrError;

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
            // console.log(orderResponse)
            if (orderResponse.status === 201) {
                setOrderOrError({ order: orderResponse.data })
            }
        }
        catch (error) {
            // console.log(error.response.data)
            const err = Object.values(error.response.data)[0]
            setOrderOrError({ error: err })
        }
    }

    useEffect(
        () => {
            getOrder()
        }, []
    )



    if (order) {
        let shippingComp = [];
        let productsComp = [];
        let paymentComp = [];

        const { shippingAddress, products, payment } = order;

        function recordChange(e, keyName, objectName, filter) {
            // console.log(e, keyName, objectName, filter)

            const key = e.target.id
            const value = e.target.value
            const comparisionObject = order[keyName]
            const objectType = typeof (comparisionObject);
            const arrayType = Array.isArray(comparisionObject)
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
                if (change[keyName][key] && change[keyName][key] != value && comparisionObject[key] != value) {
                    change[keyName][key] = value;
                    setChange({ ...change })
                }
                else if (change[keyName][key] && change[keyName][key] != value && comparisionObject[key] === value) {
                    delete change[keyName][key];
                    setChange({ ...change })
                }
                else if (!change[keyName][key] && comparisionObject[key] != value) {
                    change[keyName][key] = value;
                    setChange({ ...change })
                }
            }

            if (arrayType === true && objectType === "object") {
                // console.log(175, key, value, filter, comparisionObject, objectName)
                const objectFound = comparisionObject.find((item) => item.productId === filter);
                const indexInState = change[keyName].findIndex((item) => item.productId === filter);
                const objectValue = objectFound[key]
                // console.log(objectValue, value)

                if (indexInState !== -1 && objectFound[key] == value) {
                    // console.log(192, change[keyName][indexInState][key])
                    change[keyName].splice(indexInState, 1);
                    // console.log(194, change)
                    setChange({ ...change })
                    if (change[keyName].length === 0) {
                        delete change[keyName]
                        setChange({ ...change })
                    }
                }
                else if (indexInState !== -1 && objectFound[key] != value && change[keyName][indexInState][key] != value) {
                    change[keyName][indexInState][key] = value;
                    setChange({ ...change })
                }
                else if (indexInState === -1 && objectFound[key] != value) {
                    const updatedObject = { ...objectFound, [key]: value };
                    change[keyName].push(updatedObject);
                    setChange({ ...change })
                }
            }

            if (change[keyName] && Object.keys(change[keyName]).length === 0) {
                delete change[keyName]
                setChange({ ...change })

            }
            // console.log(160, change)
        }

        async function handleSubmit(event) {
            event.preventDefault()
            console.log(change)

            try {
                const response = await axios.put(
                    `/api/updateorder`,
                    {
                        userId,
                        orderId,
                        ...change
                    }

                )
            }
            catch {
                console.log(error)
            }
        }

        function iteratObject(keyName, objectName, filter, index) {
            // console.log(objectName, comparisionObject)
            let tempComp = [];
            for (let key in objectName) {
                // console.log(key)
                const value = objectName[key];
                tempComp.push(
                    <Group key={key} className="mb-3 w-100" controlId={`${key}`}>
                        <Label className="fw-medium">{`${key.slice(0, 4) === "ship" ? stringCapitalize(key).slice(4) : stringCapitalize(key)}`}</Label>
                        <Control type="text" className="rounded-1" defaultValue={value} onChange={(e) => recordChange(e, keyName, objectName, filter)} />
                    </Group>
                )
            }
            return tempComp
        }

        shippingComp = iteratObject("shippingAddress", shippingAddress)
        productsComp = products.map(
            (product, index) => {
                const { title, quantity, productId, price } = product
                const newProduct = { title, quantity, price, index }
                return (
                    <div key={index}>
                        {iteratObject("products", newProduct, productId, index)}
                        < Button className="mb-3" variant="info" type="submit" > Update</Button >
                    </div>
                )
            }
        )
        paymentComp = iteratObject("payment", payment)

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
                                            <Button variant="info" type="submit">UpdateShipp</Button>
                                        </Col>
                                        <Col xs={12} md={6} className="pt-4 pt-md-0">
                                            <h1>Payments</h1>
                                            {paymentComp}
                                            <Button variant="info" type="submit">Update</Button>
                                        </Col>
                                        <Col xs={12} md={6} className="pt-4">
                                            <h1>Orders</h1>
                                            {productsComp}
                                            {/* <Button variant="info" type="submit">Update</Button> */}
                                        </Col>
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