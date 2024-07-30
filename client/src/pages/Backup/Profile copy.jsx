import axios from "axios";
import { contextStore } from "../context";
import { useContext, useEffect, useState } from "react";
import { Button, Container, NavDropdown, Form } from "react-bootstrap";
import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";

function Profile() {
    const store = useContext(contextStore)
    const { Group, Label, Control } = Form;
    let { userData, userDispatch } = store.userStore
    const { firstName, lastName, email, phone, userId, isActive, userType, shippingAddress } = userData;
    const { shipName, addressLine1, addressLine2, city, state, country, pincode, shipPhone } = shippingAddress;


    const [adminId, setAdminId] = useState("");

    const paramUserId = useParams();
    console.log(21, paramUserId)

    console.log(userData)
    console.log(shippingAddress)

    const [newUserData, setNewUserData] = useState({});
    const [newShipData, setNewShipData] = useState({});
    console.log(newUserData, 25)

    useEffect(
        () => {
            console.log("USEEFFECT")
            if (userType === "admin") {
                setAdminId(userId)
            }
        }, []
    )

    function recordChange(event, ship = false) {
        const key = event.target.id;
        const value = event.target.value;
        console.log(key, value)
        const temp = {};
        temp[key] = value
        if (ship && temp[key] != shippingAddress[key]) {
            console.log("ship", temp[key], shippingAddress[key])
            setNewShipData({ ...newShipData, ...temp })
        }
        else {
            if (temp[key] != userData[key]) {
                console.log("user", temp[key], userData[key])
                setNewUserData({ ...newUserData, ...temp })
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault()

        const dataToBeUpdated = { userId, ...newUserData, shippingAddress: { ...newShipData } }
        console.log(Object.keys(dataToBeUpdated.shippingAddress).length)

        setNewUserData({})
        setNewShipData({})

        if (Object.keys(dataToBeUpdated.shippingAddress).length === 0) {
            delete dataToBeUpdated.shippingAddress
        }

        console.log(dataToBeUpdated)
        async function updateUserData() {
            try {
                const response = await axios.put(
                    "/api/updateprofile",
                    dataToBeUpdated
                )
                console.log(response)
                if (response.status === 201) {
                    toast.success(Object.values(response.data)[0], {
                        position: "bottom-center"
                    });
                    console.log(Object.values(response.data)[1])
                    userDispatch(Object.values(response.data)[1])
                }
                else if (response.status === 208) {
                    toast.info(Object.values(response.data)[0], {
                        position: "bottom-center"
                    });
                }
            }
            catch (error) {
                console.log(error)
                toast.error(Object.values(response.data)[0], {
                    position: "bottom-center"
                });
            }
        }

        updateUserData()
    }

    return (
        <Form onSubmit={handleSubmit} className='w-min-sm-75 w-min-md-50 m-auto py-4 px-4 px-sm-0'>
            <ToastContainer />
            <h1>User Profile</h1>
            <hr className="pb-3" />
            {/* First and Last Name */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="firstName">
                    <Form.Label className="fw-medium">First Name</Form.Label>
                    <Form.Control type="text" defaultValue={firstName} placeholder="First Name" onChange={recordChange} />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="lastName">
                    <Form.Label className="fw-medium">Last Name</Form.Label>
                    <Form.Control type="text" defaultValue={lastName} placeholder="Last Name" onChange={recordChange} />
                </Form.Group>
            </Container>

            {/* Email & Phone */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="email">
                    <Form.Label className="fw-medium">Email</Form.Label>
                    <Form.Control type="tel" defaultValue={email} placeholder="Enter email" onChange={recordChange} />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="phone">
                    <Form.Label className="fw-medium">Phone</Form.Label>
                    <Form.Control type="number" defaultValue={phone} placeholder="country-code phone-number" onChange={recordChange} />
                </Form.Group>
            </Container>

            {/* UserStatus */}
            {userType === "admin"
                ?
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                    <Form.Group className="mb-3 w-100" controlId="isActive">
                        <Form.Check className="d-inline pe-2" type="radio" defaultChecked={isActive} value={true} name="userStatus" onChange={recordChange} />
                        <Form.Label className="fw-medium">Active</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="isActive">
                        <Form.Check className="d-inline pe-2" type="radio" defaultChecked={!isActive} value={false} name="userStatus" onChange={recordChange} />
                        <Form.Label className="fw-medium">Inactive</Form.Label>
                    </Form.Group>
                </Container>
                :
                ""
            }

            <h1 className="pt-3">Shipping Details</h1>
            <hr className="pb-2" />
            {/* Name and Address Line 1*/}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="shipName">
                    <Form.Label className="fw-medium">Ship Name</Form.Label>
                    <Form.Control type="text" defaultValue={shipName} placeholder="First Name" onChange={(e) => recordChange(e, true)} />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="addressLine1">
                    <Form.Label className="fw-medium">Address Line 1</Form.Label>
                    <Form.Control type="text" defaultValue={addressLine1} placeholder="House No. Building Name..." onChange={(e) => recordChange(e, true)} />
                </Form.Group>
            </Container>

            {/* Address Line 2 and City */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                <Form.Group className="mb-3 w-100" controlId="addressLine2">
                    <Form.Label className="fw-medium">Address Line 2</Form.Label>
                    <Form.Control type="text" defaultValue={addressLine2} placeholder="Area/Sector..." onChange={(e) => recordChange(e, true)} />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="city">
                    <Form.Label className="fw-medium">City / District</Form.Label>
                    <Form.Control type="text" defaultValue={city} placeholder="Bangalore/New York..." onChange={(e) => recordChange(e, true)} />
                </Form.Group>
            </Container>

            {/* State/Country/Phone */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                <Form.Group className="mb-3 w-100" controlId="state">
                    <Form.Label className="fw-medium">State / Province</Form.Label>
                    <Form.Control type="text" defaultValue={state} placeholder="Karnataka/Northeastern U.S..." onChange={(e) => recordChange(e, true)} />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="country">
                    <Form.Label className="fw-medium">Country</Form.Label>
                    <Form.Control type="text" defaultValue={country} placeholder="India/U.S.A..." onChange={(e) => recordChange(e, true)} />
                </Form.Group>
            </Container>

            {/* Pincode /Phone */}
            <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                <Form.Group className="mb-3 w-100" controlId="pincode">
                    <Form.Label className="fw-medium">Pincode / ZipCode</Form.Label>
                    <Form.Control type="number" defaultValue={pincode} placeholder="600654" onChange={(e) => recordChange(e, true)} />
                </Form.Group>
                <Form.Group className="mb-3 w-100" controlId="shipPhone">
                    <Form.Label className="fw-medium">Phone</Form.Label>
                    <Form.Control type="number" defaultValue={shipPhone} placeholder="91 97315647658" onChange={(e) => recordChange(e, true)} />
                </Form.Group>
            </Container>
            <Button variant="info" type="submit" color="danger" className="fw-medium rounded-1">Update</Button>
        </Form >
    )
}

export default Profile;