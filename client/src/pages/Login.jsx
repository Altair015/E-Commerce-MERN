import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
import { stringCapitalize } from "../utils/functions";
const { VITE_BACKEND_URL } = import.meta.env;

const { Group, Label, Control, Text } = Form;

function Login() {
    const store = useContext(contextStore);
    const { getToken } = store.tokenStore;
    const currentLocation = useLocation();

    // Extracting the path and usertype from the URL
    const params = useParams();
    const { usertype } = params

    const navigate = useNavigate()
    const [error, errorDispatch] = useReducer(useStateReducer, {});
    const [show, showDispatch] = useReducer(useStateReducer, true);
    const [userData, userDataDispatch] = useReducer(useStateReducer, {})
    const { cartItems, cartDispatch } = store.cart;

    // Function to get the updated cart from the server.
    async function getOrUpdateCart(userId, responseToken) {
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
                    `${VITE_BACKEND_URL}/updatingcart`,
                    {
                        userId,
                        existingCart
                    },
                    {
                        headers: { 'Authorization': `JWT ${responseToken}` }
                    }
                )
            }
            else {
                cartResponse = await axios.get(
                    `${VITE_BACKEND_URL}/getcart/${userId}`,
                    {
                        headers: { 'Authorization': `JWT ${responseToken}` }
                    }
                )
            }

            if (cartResponse.status === 201) {
                const { existingCart } = cartResponse.data
                cartDispatch(existingCart)
            }
        }
        catch (error) {
            errorDispatch({ general: "Inactive Account. Contact Support." })
        }
    }

    // Sign In or Sign Up
    const handleSubmit = async (event) => {
        event.preventDefault();
        delete userData.confirmPassword

        // Sign In
        if (event.target["6"].textContent === "Sign In") {

            try {
                const loginResponse = await axios.post(
                    `${VITE_BACKEND_URL}/signin`,
                    {
                        ...userData,
                        userType: usertype
                    }
                )
                const { data } = loginResponse;

                const responseData = Object.values(data);

                if (loginResponse.status === 201) {
                    if (responseData[2].isActive) {
                        // setting the token in the localstorage
                        const responseToken = responseData[1];
                        localStorage.setItem("token", responseToken);

                        // setting the token in the context
                        getToken(localStorage.getItem("token"));

                        store.userStore.userDispatch({ type: "LOAD_USER_DATA", payload: responseData[2] })
                        const { userId } = responseData[2];
                        getOrUpdateCart(userId, responseToken)
                    }
                    else {
                        errorDispatch({ general: "Inactive Account. Contact Support." })
                    }
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                errorDispatch({ general: Object.values(err)[0] })
            }
        }
        // Sign Up
        else if (event.target["6"].textContent === "Sign Up") {
            try {
                const loginResponse = await axios.post(
                    `${VITE_BACKEND_URL}/signup`,
                    {
                        ...userData,
                        userType: usertype,
                    }
                )
                const status = { ...loginResponse.data }
                if (loginResponse.status === 201) {
                    navigate(`/login/${usertype}`)
                    errorDispatch({ general: Object.values(status)[0] })
                }
                else if (loginResponse.status === 208) {
                    error["general"] = Object.values(status)[0];
                    errorDispatch({ general: Object.values(status)[0] })
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                errorDispatch({ general: Object.values(err)[0] })
            }
        }
    }

    // recording user input
    function recordChange(event) {
        const key = event.target.id
        const value = event.target.value;

        if (error["general"]) {
            delete error["general"]
        }
        if (!value.trim()) {
            delete userData[key]
        }
        else {
            userData[key] = value.trim();
        }

        userDataDispatch({ ...userData })

        if (!userData[key]) {
            error[key] = `${stringCapitalize(key)} field cannot be empty.`
            errorDispatch({ ...error })

        }
        else {
            if ((userData["password"] && userData["confirmPassword"])) {
                if ((userData["password"] !== userData["confirmPassword"])) {
                    error["password"] = "Password and Confirm Password do not match."
                    error["confirmPassword"] = "Password and Confirm Password do not match."
                }
                else {
                    delete error["password"]
                    delete error["confirmPassword"]
                }
            }
            else {
                delete error[key]
            }
            errorDispatch({ ...error })
        }
    }

    function handlelinkClick() {
        showDispatch(!show);
        errorDispatch({});
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
            <Group className={error["firstName"] ? "mb-2" : "mb-3"} hidden={show} controlId="firstName">
                <Label className="fw-medium">First Name</Label>
                <Control className="rounded-1 mb-2" type="text" placeholder="Enter email" onChange={recordChange} />
                <Text className="text-danger">{error["firstName"]}</Text>
            </Group>
            <Group className={error["lastName"] ? "mb-2" : "mb-3"} hidden={show} controlId="lastName">
                <Label className="fw-medium">Last Name</Label>
                <Control className="rounded-1 mb-2" type="text" placeholder="Enter email" onChange={recordChange} />
                <Text className="text-danger">{error["lastName"]}</Text>
            </Group>
            <Group className={error["phone"] ? "mb-2" : "mb-3"} hidden={show} controlId="phone">
                <Label className="fw-medium">Phone</Label>
                <Control className="rounded-1 mb-2" type="number" placeholder="e.g. +91 8794651232" onChange={recordChange} />
                <Text className="text-danger">{error["phone"]}</Text>
            </Group>
            <Group className={error["email"] ? "mb-2" : "mb-3"} controlId="email">
                <Label className="fw-medium" >Email</Label>
                <Control className="rounded-1 mb-2" type="email" placeholder="Enter email" onChange={recordChange} />
                <Text className="text-danger">{error["email"]}</Text>            </Group>
            <Group className={error["password"] ? "mb-2" : "mb-3"} controlId="password">
                <Label className="fw-medium" >Password</Label>
                <Control className="rounded-1 mb-2" type="password" placeholder="Password" onChange={recordChange} />
                <Text className="text-danger">{error["password"]}</Text>
            </Group>
            <Group className={error["confirmPassword"] ? "mb-2" : "mb-3"} hidden={show} controlId="confirmPassword">
                <Label className="fw-medium">Confirm Password</Label>
                <Control className="rounded-1 mb-2" type="password" placeholder="Password" onChange={recordChange} />
                <Text className="text-danger">{error["confirmPassword"]}</Text>
            </Group>
            <Group className={error["general"] ? "mb-2" : "mb-2"} controlId="general">
                <Text className="text-danger">{error["general"]}</Text>
            </Group>
            <Group className="mb-3">
                <Text>
                    {!show && <> Already have an account? <Link className="fw-semibold text-info text-decoration-none" to={`/login/${usertype}`} onClick={handlelinkClick}>SignIn</Link> . </>}
                    {show && <>  Dont't have an account? <Link className="fw-semibold text-info text-decoration-none" to={`/signup/${usertype}`} onClick={handlelinkClick}>SignUp</Link> . </>}
                </Text>
            </Group >
            <Button className="fw-medium rounded-1" variant="info" type="submit" disabled={(!Object.values(userData).length && Object.values(error).length) ? true : false}>
                {!show ? "Sign Up" : "Sign In"}
            </Button>
        </Form >
    );
}


export default Login;