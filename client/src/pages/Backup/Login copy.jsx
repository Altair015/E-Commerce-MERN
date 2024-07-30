import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { contextStore } from '../../context';
import { useStateReducer } from "../../reducers/reducerFunctions";

const { Group, Label, Control, Text } = Form;

function Login() {
    const store = useContext(contextStore);

    const currentLocation = useLocation();

    // Extracting the path and usertype from the URL
    const params = useParams();
    const { path, usertype } = params

    const [phone, phoneDispatch] = useReducer(useStateReducer, null);

    // Sign Up
    const [firstName, firstNameDispatch] = useReducer(useStateReducer, "");
    const [lastName, lastNameDispatch] = useReducer(useStateReducer, "");

    // Sign In
    const [email, emailDispatch] = useReducer(useStateReducer, "");
    const [password, passwordDispatch] = useReducer(useStateReducer, "");
    // Sign In

    const [confirmPassword, confirmPasswordDispatch] = useReducer(useStateReducer, "");
    // Sign Up

    const navigate = useNavigate()

    const [fieldError, fieldErrorDispatch] = useReducer(useStateReducer, "");

    const [show, showDispatch] = useReducer(useStateReducer, true);

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

        // Sign In
        if (event.target["6"].textContent === "Sign In") {

            try {
                const loginResponse = await axios.post(
                    "/api/signin",
                    {
                        email: email,
                        password: password,
                        userType: usertype
                    }
                )
                const { data } = loginResponse;

                const responseData = Object.values(data);

                if (loginResponse.status === 201) {
                    localStorage.setItem("token", responseData[1]);
                    localStorage.setItem("userType", responseData[2].userType);
                    store.tokenStore.getToken(localStorage.getItem("token"));
                    store.userStore.userDispatch({ type: "LOAD_USER_DATA", payload: responseData[2] })
                    const { userId, userType } = responseData[2];
                    getOrUpdateCart(userId)
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                fieldErrorDispatch(Object.values(err)[0])
            }
        }
        // Sign Up
        else if (event.target["6"].textContent === "Sign Up") {

            try {
                const loginResponse = await axios.post(
                    `/api/signup`,
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                        userType: usertype,
                        phone: phone
                    }
                )
                const status = { ...loginResponse.data }

                if (loginResponse.status === 201) {
                    navigate(`/login/${usertype}`)
                }
                else if (loginResponse.status === 208) {
                    fieldErrorDispatch(Object.values(status)[0])
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                fieldErrorDispatch(Object.values(err)[0])
            }
        }
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
            <Group className="mb-3" hidden={show}>
                <Label className="fw-medium">First Name</Label>
                <Control className="rounded-1" type="text" placeholder="Enter email" onChange={(event) => firstNameDispatch(event.target.value)} />
            </Group>
            <Group className="mb-3" hidden={show}>
                <Label className="fw-medium">Last Name</Label>
                <Control className="rounded-1" type="text" placeholder="Enter email" onChange={(event) => lastNameDispatch(event.target.value)} />
            </Group>
            <Group className="mb-3" hidden={show}>
                <Label className="fw-medium">Phone</Label>
                <Control className="rounded-1" type="number" placeholder="e.g. +91 8794651232" onChange={(event) => phoneDispatch(event.target.value)} />
            </Group>
            <Group className="mb-3" >
                <Label className="fw-medium">Email</Label>
                <Control className="rounded-1" type="email" placeholder="Enter email" onChange={(event) => emailDispatch(event.target.value)} />
            </Group>
            <Group className="mb-3">
                <Label className="fw-medium">Password</Label>
                <Control className="rounded-1" type="password" placeholder="Password" onChange={(event) => passwordDispatch(event.target.value)} />
            </Group>
            <Group className="mb-3" hidden={show}>
                <Label className="fw-medium">Confirm Password</Label>
                <Control className="rounded-1" type="password" placeholder="Password" onChange={(event) => confirmPasswordDispatch(event.target.value)} />
            </Group>

            <Group className="mb-2">
                <Text className="text-danger">{fieldError}</Text>
            </Group>

            <Group className="mb-3">
                <Text>
                    {!show && <> Already have an account? <Link className="fw-semibold text-info text-decoration-none" to={`/login/${usertype}`} onClick={() => showDispatch(!show)}>SignIn</Link> . </>}
                    {show && <>  Dont't have an account? <Link className="fw-semibold text-info text-decoration-none" to={`/signup/${usertype}`} onClick={() => showDispatch(!show)}>SignUp</Link> . </>}
                </Text>
            </Group >

            {!show && <> <Button className="fw-medium rounded-1" variant="info" type="submit">Sign Up</Button></>
            }
            {show && <> <Button className="fw-medium rounded-1" variant="info" type="submit">Sign In</Button></>}
        </Form >
    );
}


export default Login;