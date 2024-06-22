import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { contextStore } from '../context';

function Login() {
    const store = useContext(contextStore);

    const currentLocation = useLocation();

    // Extracting the path and usertype from the URL
    const params = useParams();
    const { path, usertype } = params

    const [phone, setPhone] = useState(null);

    // Sign Up
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // Sign In
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Sign In

    const [confirmPassword, setConfirmPassword] = useState("");
    // Sign Up

    const navigate = useNavigate()

    const [fieldError, setFieldError] = useState("");

    const [show, setShow] = useState(true);

    useEffect(
        () => {
            if (currentLocation.pathname === `/signup/${usertype}`) {
                setShow(false);

            }
            if (currentLocation.pathname === `/login/${usertype}`) {
                setShow(true)
            }
            localStorage.clear()
        }, [currentLocation]
    )

    const handleSubmit = async (event) => {
        event.preventDefault();
        // sending the data to the Backend Api to login.

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
                    localStorage.setItem("token", responseData[1])
                    store.tokenStore.getToken(localStorage.getItem("token"));
                    store.storeUserData.setUserData(responseData[2])
                    navigate("/")
                }
            }
            catch (error) {
                const err = { ...error.response.data }
                setFieldError(Object.values(err)[0])
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
                    setFieldError(Object.values(status)[0])
                }
            }
            catch (error) {

                const err = { ...error.response.data }
                setFieldError(Object.values(err)[0])
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} className='w-min-sm-75 w-min-md-50 m-auto py-4 px-4 px-sm-0'>
            <h1>{show ? "Sign In" : "Sign Up"}</h1>
            <hr className="pb-3" />
            {/* First and Last Name */}
            <Form.Group className="mb-3" hidden={show}>
                <Form.Label className="fw-medium">First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter email" onChange={(event) => setFirstName(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" hidden={show}>
                <Form.Label className="fw-medium">Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter email" onChange={(event) => setLastName(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" hidden={show}>
                <Form.Label className="fw-medium">Phone</Form.Label>
                <Form.Control type="number" placeholder="e.g. +91 8794651232" onChange={(event) => setPhone(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="fw-medium">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" hidden={show}>
                <Form.Label className="fw-medium">Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(event) => setConfirmPassword(event.target.value)} />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Text className="text-danger">{fieldError}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Text>
                    {!show && <> Already have an account? <Link to={`/login/${usertype}`} onClick={() => setShow(!show)}>SignIn</Link>. </>}
                    {show && <>  Dont't have an account? <Link to={`/signup/${usertype}`} onClick={() => setShow(!show)}>SignUp</Link>. </>}
                </Form.Text>
            </Form.Group >


            {!show && <> <Button variant="primary" type="submit">Sign Up</Button></>
            }
            {show && <> <Button variant="primary" type="submit">Sign In</Button></>}
        </Form >
    );
}


export default Login;