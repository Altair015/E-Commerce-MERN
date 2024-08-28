import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useContext, useEffect, useReducer } from 'react';
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";
import Message from "../components/Message";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
const { VITE_BACKEND_URL } = import.meta.env;

// Single user's data page.
function Profile() {
    const store = useContext(contextStore);
    const { userData, userDispatch } = store.userStore;
    const { userType } = userData;
    const { token, getToken } = store.tokenStore;
    const [localUserData, localUserDataDispatch] = useReducer(useStateReducer, null);
    const [newUserData, newUserDataDispatch] = useReducer(useStateReducer, {});
    const [newShipData, newShipDataDispatch] = useReducer(useStateReducer, {});
    const [error, errorDispatch] = useReducer(useStateReducer, "");
    const params = useParams();
    const { userId } = params;

    async function getUser(userId) {
        try {
            const loginResponse = await axios.post(
                `${VITE_BACKEND_URL}/getuser`,
                { userId },
                {
                    headers: { 'Authorization': `JWT ${token}` }
                }
            )
            if (loginResponse.status === 201) {
                if (Object.values(loginResponse.data.userFound).length) {
                    localUserDataDispatch(Object.values(loginResponse.data)[0])
                }
                else {
                    errorDispatch("Profile not found.")
                }
            }
        }
        catch (error) {
            if (Object.values(error.response.data)[0]) {
                errorDispatch(Object.values(error.response.data)[0]);
            }
            else if (error.response.statusText) {
                errorDispatch(error.response.statusText);
            }
        }
    }

    useEffect(
        () => {
            if (params.userId && userType === 'admin') {
                getUser(userId)
            }
            else {
                getUser(userData.userId)
            }
            getToken()
            return () => {
                localUserDataDispatch(null)
            }
        }, [userId]
    )


    if (error) {
        return <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
    }
    if (localUserData) {
        const { firstName, lastName, email, phone, userId, isActive, userType, shippingAddress } = localUserData;
        const { shipName, addressLine1, addressLine2, city, state, country, pincode, shipPhone } = shippingAddress;

        function recordChange(event, ship = false) {
            const key = event.target.id;
            const value = event.target.value;
            const temp = {};
            temp[key] = value
            if (ship && temp[key] != shippingAddress[key]) {
                newShipDataDispatch({ ...newShipData, ...temp })
            }
            else {
                if (temp[key] != localUserData[key]) {
                    newUserDataDispatch({ ...newUserData, ...temp })
                }
            }
        }

        function handleSubmit(event) {
            event.preventDefault()

            const dataToBeUpdated = { userId, ...newUserData, shippingAddress: { ...newShipData } }

            newUserDataDispatch({})
            newShipDataDispatch({})

            if (Object.keys(dataToBeUpdated.shippingAddress).length === 0) {
                delete dataToBeUpdated.shippingAddress
            }

            async function updateUserData() {
                try {
                    const response = await axios.put(
                        `${VITE_BACKEND_URL}/updateprofile`,
                        dataToBeUpdated,
                        {
                            headers: { 'Authorization': `JWT ${token}` }
                        }
                    )
                    if (response.status === 201) {
                        toast.success(Object.values(response.data)[0], {
                            position: "bottom-center"
                        });
                        if (userData.userType === localUserData.userType) {
                            userDispatch({ type: "UPDATE_USER_DATA", payload: Object.values(response.data)[1] })
                        }
                        else {
                            localUserDataDispatch(Object.values(response.data)[1])
                        }
                    }
                    else if (response.status === 208) {
                        toast.info(Object.values(response.data)[0], {
                            position: "bottom-center"
                        });
                    }
                }
                catch (error) {
                    if (Object.values(error.response.data)[0]) {
                        errorDispatch(Object.values(error.response.data)[0])
                    }
                    else {
                        errorDispatch(error.response.statusText)
                    }
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
                        <Form.Control type="text" defaultValue={firstName} placeholder="First Name" onChange={recordChange} disabled={!isActive} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="lastName">
                        <Form.Label className="fw-medium">Last Name</Form.Label>
                        <Form.Control type="text" defaultValue={lastName} placeholder="Last Name" onChange={recordChange} disabled={!isActive} />
                    </Form.Group>
                </Container>

                {/* Email & Phone */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                    <Form.Group className="mb-3 w-100" controlId="email">
                        <Form.Label className="fw-medium">Email</Form.Label>
                        <Form.Control type="tel" defaultValue={email} placeholder="Enter email" onChange={recordChange} disabled={!isActive} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="phone">
                        <Form.Label className="fw-medium">Phone</Form.Label>
                        <Form.Control type="number" defaultValue={phone} placeholder="country-code phone-number" onChange={recordChange} disabled={!isActive} />
                    </Form.Group>
                </Container>

                {/* UserStatus */}
                {params.userId
                    ?
                    <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                        <Form.Group className="mb-3 w-100" controlId="isActive">
                            <Form.Check className="d-inline pe-2" type="radio" defaultChecked={isActive} value={true} name="userStatus" onChange={recordChange} disabled={!isActive} />
                            <Form.Label className="fw-medium">Active</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3 w-100" controlId="isActive">
                            <Form.Check className="d-inline pe-2" type="radio" defaultChecked={!isActive} value={false} name="userStatus" onChange={recordChange} disabled={!isActive} />
                            <Form.Label className="fw-medium">Inactive</Form.Label>
                        </Form.Group>
                    </Container>
                    :
                    ""
                }

                <h1 className="pt-3">{userType === "user" ? "Shipping Details" : "Address"}</h1>
                <hr className="pb-2" />
                {/* Name and Address Line 1*/}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                    <Form.Group className="mb-3 w-100" controlId="shipName">
                        <Form.Label className="fw-medium">Name</Form.Label>
                        <Form.Control type="text" defaultValue={shipName} placeholder="First Name" onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="addressLine1">
                        <Form.Label className="fw-medium">Address Line 1</Form.Label>
                        <Form.Control type="text" defaultValue={addressLine1} placeholder="House No. Building Name..." onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                </Container>

                {/* Address Line 2 and City */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                    <Form.Group className="mb-3 w-100" controlId="addressLine2">
                        <Form.Label className="fw-medium">Address Line 2</Form.Label>
                        <Form.Control type="text" defaultValue={addressLine2} placeholder="Area/Sector..." onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="city">
                        <Form.Label className="fw-medium">City / District</Form.Label>
                        <Form.Control type="text" defaultValue={city} placeholder="Bangalore/New York..." onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                </Container>

                {/* State/Country/Phone */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                    <Form.Group className="mb-3 w-100" controlId="state">
                        <Form.Label className="fw-medium">State / Province</Form.Label>
                        <Form.Control type="text" defaultValue={state} placeholder="Karnataka/Northeastern U.S..." onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="country">
                        <Form.Label className="fw-medium">Country</Form.Label>
                        <Form.Control type="text" defaultValue={country} placeholder="India/U.S.A..." onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                </Container>

                {/* Pincode /Phone */}
                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                    <Form.Group className="mb-3 w-100" controlId="pincode">
                        <Form.Label className="fw-medium">Pincode / ZipCode</Form.Label>
                        <Form.Control type="number" defaultValue={pincode} placeholder="600654" onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="shipPhone">
                        <Form.Label className="fw-medium">Phone</Form.Label>
                        <Form.Control type="number" defaultValue={shipPhone} placeholder="91 97315647658" onChange={(e) => recordChange(e, true)} disabled={!isActive} />
                    </Form.Group>
                </Container>
                <Button variant="info" type="submit" color="danger" className="fw-medium rounded-1" disabled={!isActive}>Update</Button>
            </Form >
        )
    }
    else {
        return <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
    }
}

export default Profile;