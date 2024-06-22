import { useContext } from "react";
import { Button, Container, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contextStore } from "../context";

const { Group, Label, Control } = Form;

function Shipping() {
    const store = useContext(contextStore)

    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault()

        const shipData = {};

        for (let i = 0; i < event.target.length - 1; i++) {
            if (event.target[i].value) {
                const key = event.target[i].id
                let value = event.target[i].value

                // removing trailing and leading whitespace
                if (typeof (value) === "string") {
                    value = value.trim()
                }

                shipData[key] = value
            }
        }
        console.log(shipData)
    }

    return (
        <>
            <ProgressBar now={50} />
            <Form onSubmit={handleSubmit} className='w-min-sm-75 w-min-md-50 m-auto py-4 px-4 px-sm-0'>
                <h1>Shipping Address</h1>
                <hr className="pb-2" />

                {/* Name and Address Line 1*/}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                    <Form.Group className="mb-3 w-100" controlId="customerName">
                        <Form.Label className="fw-medium">First Name</Form.Label>
                        <Form.Control type="text" defaultValue={"customerName"} placeholder="customerName" />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="addressLine1">
                        <Form.Label className="fw-medium">Address Line 1</Form.Label>
                        <Form.Control type="text" defaultValue={"addressLine1"} placeholder="House No. Building Name..." />
                    </Form.Group>
                </Container>

                {/* Address Line 2 and City */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                    <Form.Group className="mb-3 w-100" controlId="addressLine2">
                        <Form.Label className="fw-medium">Address Line 2</Form.Label>
                        <Form.Control type="text" defaultValue={"addressLine2"} placeholder="Area/Sector..." />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="city">
                        <Form.Label className="fw-medium">City / District</Form.Label>
                        <Form.Control type="text" defaultValue={"city"} placeholder="Bangalore/New York..." />
                    </Form.Group>
                </Container>

                {/* State/Country/Phone */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                    <Form.Group className="mb-3 w-100" controlId="state">
                        <Form.Label className="fw-medium">State / Province</Form.Label>
                        <Form.Control type="text" defaultValue={"state"} placeholder="Karnataka/Northeastern U.S..." />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="country">
                        <Form.Label className="fw-medium">Country</Form.Label>
                        <Form.Control type="text" defaultValue={"country"} placeholder="India/U.S.A..." />
                    </Form.Group>
                </Container>

                {/* Pincode /Phone */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                    <Form.Group className="mb-3 w-100" controlId="pincode">
                        <Form.Label className="fw-medium">Pincode / ZipCode</Form.Label>
                        <Form.Control type="number" defaultValue={0} placeholder="600654" />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="shipPhone">
                        <Form.Label className="fw-medium">Phone</Form.Label>
                        <Form.Control type="number" placeholder="91 97315647658" />
                    </Form.Group>
                </Container>

                <Button variant="info" type="submit" className="fw-medium rounded-1">Submit</Button>
            </Form >
        </>
    )
}

export default Shipping;