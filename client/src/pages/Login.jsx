import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
import { stringCapitalize } from "../utils/functions";

const { Group, Label, Control, Text } = Form;

function Login() {
    const store = useContext(contextStore);


    const currentLocation = useLocation();

    // Extracting the path and usertype from the URL
    const params = useParams();
    const { usertype } = params

    const navigate = useNavigate()

    const [fieldError, fieldErrorDispatch] = useReducer(useStateReducer, {});

    const [show, showDispatch] = useReducer(useStateReducer, true);

    const [userData, userDataDispatch] = useReducer(useStateReducer, {})
    console.log(userData)
    const { cartItems, cartDispatch } = store.cart;

    async function getOrUpdateCart(userId) {
        try {
            let cartResponse = null;
            if (cartItems.length > 0) {
                const existingCart = cartItems.reduce(
                    (newCart, { productId, quantity }) => {
                        newCart.push(
                            {
                                productId,
                                quantity
                            }
                        )
                        return newCart
                    }, []
                )

                cartResponse = await axios.put(
                    `/api/updatingcart`,
                    {
                        userId,
                        existingCart
                    }
                )
            }
            else {
                cartResponse = await axios.get(
                    `/api/getcart/${userId}`
                )
            }

            if (cartResponse.status === 201) {
                const { existingCart } = cartResponse.data
                console.log(existingCart)
                cartDispatch(existingCart)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        delete userData.confirmPassword
        console.log("SIGNIN", userData, event)

        // Sign In
        if (event.target["6"].textContent === "Sign In") {

            try {
                const loginResponse = await axios.post(
                    "/api/signin",
                    {
                        ...userData,
                        userType: usertype
                    }
                )
                const { data } = loginResponse;

                const responseData = Object.values(data);

                if (loginResponse.status === 201) {
                    if (responseData[2].isActive) {
                        localStorage.setItem("token", responseData[1]);
                        localStorage.setItem("userType", responseData[2].userType);
                        store.tokenStore.getToken(localStorage.getItem("token"));
                        store.userStore.userDispatch({ type: "LOAD_USER_DATA", payload: responseData[2] })
                        const { userId, userType } = responseData[2];
                        getOrUpdateCart(userId)
                    }
                    else {
                        fieldErrorDispatch({ general: "Inactive Account. Contact Support." })
                    }
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                fieldErrorDispatch({ general: Object.values(err)[0] })
            }
        }
        // Sign Up
        else if (event.target["6"].textContent === "Sign Up") {
            try {
                const loginResponse = await axios.post(
                    `/api/signup`,
                    {
                        ...userData,
                        userType: usertype,
                    }
                )
                const status = { ...loginResponse.data }
                console.log(loginResponse)
                if (loginResponse.status === 201) {
                    navigate(`/login/${usertype}`)
                    fieldErrorDispatch({ general: Object.values(status)[0] })
                }
                else if (loginResponse.status === 208) {
                    fieldError["general"] = Object.values(status)[0];
                    fieldErrorDispatch({ general: Object.values(status)[0] })
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                fieldErrorDispatch({ general: Object.values(err)[0] })
            }
        }
    }


    function recordChange(event) {
        const key = event.target.id
        const value = event.target.value;

        if (fieldError["general"]) {
            delete fieldError["general"]
        }

        if (!value.trim()) {
            delete userData[key]
        }
        else {
            userData[key] = value.trim();
        }

        userDataDispatch({ ...userData })

        if (!userData[key]) {
            fieldError[key] = `${stringCapitalize(key)} field cannot be empty.`
            fieldErrorDispatch({ ...fieldError })

        }
        else {
            if ((userData["password"] && userData["confirmPassword"])) {
                if ((userData["password"] !== userData["confirmPassword"])) {
                    fieldError["password"] = "Password and Confirm Password do not match."
                    fieldError["confirmPassword"] = "Password and Confirm Password do not match."
                }
                else {
                    delete fieldError["password"]
                    delete fieldError["confirmPassword"]
                }
            }
            else {
                delete fieldError[key]
            }
            fieldErrorDispatch({ ...fieldError })
        }
    }

    function handlelinkClick() {
        showDispatch(!show);
        // userDataDispatch({});
        fieldErrorDispatch({});
    }

    useEffect(
        () => {
            if (currentLocation.pathname === `/signup/${usertype}`) {
                showDispatch(false);
            }
            if (currentLocation.pathname === `/login/${usertype}`) {
                showDispatch(true)
            }
            localStorage.clear()
        }, [currentLocation]
    )

    return (
        <Form onSubmit={handleSubmit} className='w-min-sm-75 w-min-md-50 m-auto py-4 px-4 px-sm-0'>
            <h1>{show ? "Sign In" : "Sign Up"}</h1>
            <hr className="pb-3" />
            {/* First and Last Name */}
            <Group className={fieldError["firstName"] ? "mb-2" : "mb-3"} hidden={show} controlId="firstName">
                <Label className="fw-medium">First Name</Label>
                <Control className="rounded-1 mb-2" type="text" placeholder="Enter email" onChange={recordChange} />
                <Text className="text-danger">{fieldError["firstName"]}</Text>
            </Group>
            <Group className={fieldError["lastName"] ? "mb-2" : "mb-3"} hidden={show} controlId="lastName">
                <Label className="fw-medium">Last Name</Label>
                <Control className="rounded-1 mb-2" type="text" placeholder="Enter email" onChange={recordChange} />
                <Text className="text-danger">{fieldError["lastName"]}</Text>
            </Group>
            <Group className={fieldError["phone"] ? "mb-2" : "mb-3"} hidden={show} controlId="phone">
                <Label className="fw-medium">Phone</Label>
                <Control className="rounded-1 mb-2" type="number" placeholder="e.g. +91 8794651232" onChange={recordChange} />
                <Text className="text-danger">{fieldError["phone"]}</Text>
            </Group>
            <Group className={fieldError["email"] ? "mb-2" : "mb-3"} controlId="email">
                <Label className="fw-medium" >Email</Label>
                <Control className="rounded-1 mb-2" type="email" placeholder="Enter email" onChange={recordChange} />
                <Text className="text-danger">{fieldError["email"]}</Text>            </Group>
            <Group className={fieldError["password"] ? "mb-2" : "mb-3"} controlId="password">
                <Label className="fw-medium" >Password</Label>
                <Control className="rounded-1 mb-2" type="password" placeholder="Password" onChange={recordChange} />
                <Text className="text-danger">{fieldError["password"]}</Text>
            </Group>
            <Group className={fieldError["confirmPassword"] ? "mb-2" : "mb-3"} hidden={show} controlId="confirmPassword">
                <Label className="fw-medium">Confirm Password</Label>
                <Control className="rounded-1 mb-2" type="password" placeholder="Password" onChange={recordChange} />
                <Text className="text-danger">{fieldError["confirmPassword"]}</Text>
            </Group>
            <Group className={fieldError["general"] ? "mb-2" : "mb-2"} controlId="general">
                <Text className="text-danger">{fieldError["general"]}</Text>
            </Group>
            <Group className="mb-3">
                <Text>
                    {!show && <> Already have an account? <Link className="fw-semibold text-info text-decoration-none" to={`/login/${usertype}`} onClick={handlelinkClick}>SignIn</Link> . </>}
                    {show && <>  Dont't have an account? <Link className="fw-semibold text-info text-decoration-none" to={`/signup/${usertype}`} onClick={handlelinkClick}>SignUp</Link> . </>}
                </Text>
            </Group >
            <Button className="fw-medium rounded-1" variant="info" type="submit" disabled={(!Object.values(userData).length && Object.values(fieldError).length) ? true : false}>
                {!show ? "Sign Up" : "Sign In"}
            </Button>
        </Form >
    );
}


export default Login;