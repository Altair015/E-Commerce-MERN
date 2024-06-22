import axios from "axios";
import { contextStore } from "../context";
import { useContext, useState } from "react";
import { Button, Container, NavDropdown, Form } from "react-bootstrap";

function Profile() {
    const store = useContext(contextStore)
    const { Group, Label, Control } = Form;
    const { firstName, lastName, email, shippingAddress } = store.storeUserData.userData;

    function handleSubmit(event) {
        event.preventDefault()

        const userData = {};

        for (let i = 0; i < event.target.length - 1; i++) {
            if (event.target[i].value) {
                const key = event.target[i].id
                let value = event.target[i].value

                // removing trailing and leading whitespace
                if (typeof (value) === "string") {
                    value = value.trim()
                }

                userData[key] = value
            }
        }
        console.log(userData)
        /*
                (async function () {
                    try {
                        const response = axios.update(
                            "/api/updateuser",
                            userData
                        )
        
                        if (response.status === 201) {
                            store.storeUserData.
                        }
                    } catch (error) {
                        console.log(error)
                    }
                })()
        */
    }

    return (
        <Form onSubmit={handleSubmit} className='w-min-sm-75 w-min-md-50 m-auto py-4 px-4 px-sm-0'>
            <h1>User Profile</h1>
            <hr className="pb-3" />
            {/* First and Last Name */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="firstName">
                    <Form.Label className="fw-medium">First Name</Form.Label>
                    <Form.Control type="text" defaultValue={firstName} placeholder="First Name" />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="lastName">
                    <Form.Label className="fw-medium">Last Name</Form.Label>
                    <Form.Control type="text" defaultValue={lastName} placeholder="Last Name" />
                </Form.Group>
            </Container>

            {/* Email & Phone */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="email">
                    <Form.Label className="fw-medium">Email</Form.Label>
                    <Form.Control type="tel" defaultValue={email} placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="primaryPhone">
                    <Form.Label className="fw-medium">Phone</Form.Label>
                    <Form.Control type="number" defaultValue={0} placeholder="country-code phone-number" />
                </Form.Group>
            </Container>

            <h1 className="pt-3">Shipping Details</h1>
            <hr className="pb-2" />
            {/* Name and Address Line 1*/}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="shipFirstName">
                    <Form.Label className="fw-medium">First Name</Form.Label>
                    <Form.Control type="text" defaultValue={"shipFirstName"} placeholder="First Name" />
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
            <Button variant="info" type="submit" color="danger" className="fw-medium rounded-1">Update</Button>
        </Form >
    )
}

export default Profile;