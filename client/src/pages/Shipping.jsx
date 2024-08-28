import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Button, Container, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";

const { Group, Label, Control } = Form;
const { Feedback } = Control;
const { VITE_BACKEND_URL } = import.meta.env;

// Shipping address page while placing the order
function Shipping() {
    const store = useContext(contextStore);
    const [error, errorDispatch] = useReducer(useStateReducer, "")
    const navigate = useNavigate();
    const { userData, userDispatch } = store.userStore;
    const { userId } = userData;
    const { shipName, addressLine1, addressLine2, city, state, country, pincode, shipPhone } = userData.shippingAddress;
    const { token } = store.tokenStore;
    const [newShipData, newShipDataDispatch] = useReducer(useStateReducer, {});
    const [feedBack, feedBackDispatch] = useReducer(useStateReducer, {});

    function recordChange(event) {
        const key = event.target.id;
        const value = event.target.value;
        const temp = {};
        temp[key] = value

        if (temp[key] != userData.shippingAddress[key]) {
            newShipDataDispatch({ ...newShipData, ...temp })
        }
        if (userData.shippingAddress[key] == value) {
            delete newShipData[key]
            newShipDataDispatch({ ...newShipData })
        }

        delete feedBack[key];
        feedBackDispatch({ ...feedBack })

        if (!temp[key].trim()) {
            feedBack[key] = "Field Cannot be empty";
            feedBackDispatch({ ...feedBack })
        }

    }

    function handleSubmit(event) {
        event.preventDefault()

        const dataToBeUpdated = { userId, shippingAddress: { ...newShipData } }

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
                    userDispatch({ type: "UPDATE_USER_DATA", payload: Object.values(response.data)[1] })
                }
                else if (response.status === 208) {
                    toast.info(Object.values(response.data)[0], {
                        position: "bottom-center"
                    });
                }
                setTimeout(() => {
                    navigate("/pay")
                }, 2000);
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

        if (!Object.keys(feedBack).length) {
            updateUserData()
        }
        else {
            toast.error("Incomplete Shipping Address", {
                position: "bottom-center"
            });
        }
    }

    useEffect(
        () => {
            for (const key of Object.keys(userData.shippingAddress)) {
                if (!userData.shippingAddress[key]) {
                    feedBack[key] = "Field Cannot be empty";
                    feedBackDispatch({ ...feedBack })
                }
            }
        }, []
    )

    return (
        <>
            {
                error
                    ?
                    <Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                    :
                    userData
                        ?
                        <Container className="p-4">
                            <ProgressBar variant="warning" now={25} />
                            <Form onSubmit={handleSubmit} className='w-min-sm-100 w-min-md-75 w-min-lg-50 m-auto py-4 px-4 px-sm-0'>
                                <ToastContainer />
                                <h1>Shipping Address</h1>
                                <hr className="pb-2" />

                                {/* Name and Address Line 1*/}
                                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                                    <Group className="mb-3 w-100" controlId="shipName">
                                        <Label className="fw-medium">First Name</Label>
                                        <Control type="text" defaultValue={shipName} placeholder="customerName" onChange={recordChange} />
                                        <Feedback className={feedBack.shipName ? "d-block" : "d-none"} type="invalid">{feedBack.shipName}</Feedback>
                                    </Group>
                                    <Group className="mb-3 w-100" controlId="addressLine1">
                                        <Label className="fw-medium">Address Line 1</Label>
                                        <Control type="text" defaultValue={addressLine1} placeholder="House No. Building Name..." onChange={recordChange} />
                                        <Feedback className={feedBack.addressLine1 ? "d-block" : "d-none"} type="invalid">{feedBack.addressLine1}</Feedback>
                                    </Group>
                                </Container>

                                {/* Address Line 2 and City */}
                                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">

                                    <Group className="mb-3 w-100" controlId="addressLine2">
                                        <Label className="fw-medium">Address Line 2</Label>
                                        <Control type="text" defaultValue={addressLine2} placeholder="Area/Sector..." onChange={recordChange} />
                                        <Feedback className={feedBack.addressLine2 ? "d-block" : "d-none"} type="invalid">{feedBack.addressLine2}</Feedback>
                                    </Group>
                                    <Group className="mb-3 w-100" controlId="city">
                                        <Label className="fw-medium">City / District</Label>
                                        <Control type="text" defaultValue={city} placeholder="Bangalore/New York..." onChange={recordChange} />
                                        <Feedback className={feedBack.city ? "d-block" : "d-none"} type="invalid">{feedBack.city}</Feedback>
                                    </Group>
                                </Container>

                                {/* State/Country/Phone */}
                                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                                    <Group className="mb-3 w-100" controlId="state">
                                        <Label className="fw-medium">State / Province</Label>
                                        <Control type="text" defaultValue={state} placeholder="Karnataka/Northeastern U.S..." onChange={recordChange} />
                                        <Feedback className={feedBack.state ? "d-block" : "d-none"} type="invalid">{feedBack.state}</Feedback>
                                    </Group>
                                    <Group className="mb-3 w-100" controlId="country">
                                        <Label className="fw-medium">Country</Label>
                                        <Control type="text" defaultValue={country} placeholder="India/U.S.A..." onChange={recordChange} />
                                        <Feedback className={feedBack.country ? "d-block" : "d-none"} type="invalid">{feedBack.country}</Feedback>
                                    </Group>
                                </Container>

                                {/* Pincode /Phone */}
                                <Container className="d-sm-flex justify-content-between gap-4 p-0 pb-2">
                                    <Group className="mb-3 w-100" controlId="pincode">
                                        <Label className="fw-medium">Pincode / ZipCode</Label>
                                        <Control type="number" defaultValue={pincode} placeholder="600654" onChange={recordChange} />
                                        <Feedback className={feedBack.pincode ? "d-block" : "d-none"} type="invalid">{feedBack.pincode}</Feedback>
                                    </Group>
                                    <Group className="mb-3 w-100" controlId="shipPhone">
                                        <Label className="fw-medium">Phone</Label>
                                        <Control type="number" defaultValue={shipPhone} placeholder="91 97315647658" onChange={recordChange} />
                                        <Feedback className={feedBack.shipPhone ? "d-block" : "d-none"} type="invalid">{feedBack.shipPhone}</Feedback>
                                    </Group>
                                </Container>
                                <Button variant="info" type="submit" className="fw-medium rounded-1" disabled={Object.keys(feedBack).length ? true : false}>
                                    {
                                        Object.keys(newShipData).length || Object.keys(feedBack).length
                                            ?
                                            "Save & Continue"
                                            :
                                            "Continue"
                                    }
                                </Button>
                            </Form >
                        </Container>
                        :
                        <Loading variant="info" loadingMessage="Loading..." containerClassName="h-100 d-flex align-items-center justify-content-center gap-3" />
            }

        </>
    )
}

export default Shipping;