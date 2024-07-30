// Cart Icon from fontawesome
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Font-awesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useReducer } from "react";

// Navigation Components from React Bootstrap
import { Button, Form, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import NavigationLinks from './NavigationLinks';

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useStateReducer } from "../../reducers/reducerFunctions";
import { contextStore } from "../context";

const { Brand, Toggle } = Navbar;
const { Divider } = NavDropdown;

function MyNavBar({ handleToken, search, searchDispatch }) {
    const store = useContext(contextStore);

    const dropdownItemClass = "dropdown-item d-block text-decoration-none fw-normal text-dark py-1 px-3";

    const token = localStorage.getItem("token")

    const { userId, userType, firstName } = store.userStore.userData

    const navigate = useNavigate();

    // State to handle the Women Dropdown in the Navigation Bar.
    const [show, showDispatch] = useReducer(useStateReducer, false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log("searchSubmit")
        const searchValue = event.target[0].value.trim().toLowerCase();

        async function getProducts() {
            try {
                const response = await axios.get(`/api/getitems/${userType}/${userId}/${searchValue}`);
                console.log(response)
                if (response.status === 201) {
                    searchDispatch({ type: "SEARCHED_PRODUCTS", payload: response.data.products });
                    navigate("search")
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        if (searchValue) {
            getProducts()
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        const { cartDispatch } = store.cart;
        const { setUserData } = store.userStore
        getToken()
        cartDispatch([])
        setUserData({})
        setTimeout(() => {
            navigate('/login/user')
        }, 100);
    }

    return (
        <>
            <Navbar bg='info' sticky="top" expand="sm" className="p-2 py-sm-2 d-flex gap-mx-md-x-2">
                <Link to="/" className='fw-bold fs-2 flex-sm-one-third text-decoration-none text-dark'>PurrStore</Link>
                {/* Cart Icon for Screen Size < 576 px */}
                <div className='d-flex flex-fill d-sm-none justify-content-end'>
                    <FontAwesomeIcon onClick={() => navigate('/cart')} icon={faShoppingCart} size='2x' />
                </div>
                <Toggle id='offcanvasNavbar' />
                <Navbar.Offcanvas id="offcanvasNavbar" placement="end" className="w-50">
                    {/* Greeting Text for Screen Size < 576 px */}
                    <Offcanvas.Header closeButton />
                    {/* <Link to='#' className='d-sm-none fs-5'>Hi Parent!</Link> */}
                    {/* </Offcanvas.Header> */}
                    <Offcanvas.Body className='justify-content-sm-between'>
                        <div className='d-sm-flex order-sm-1 flex-sm-one-third'>
                            {/* Cart Icon for Screen Size > 576 px */}
                            {/* <Link href='#' className='d-none d-sm-flex justify-content-sm-center fs-5 flex-fill align-self-end fw-medium pb-3 pb-sm-0'>Hi User!</Link> */}
                            <div className='d-none d-sm-flex justify-content-sm-center fs-5 flex-fill align-self-end fw-medium pb-3 pb-sm-0'>
                                <NavDropdown title={`${userId ? firstName : "Sign In"}`} show={show} onMouseEnter={() => { showDispatch(true) }} onMouseLeave={() => { showDispatch(false) }} onClick={() => { showDispatch(!show) }}>
                                    {/* <NavDropdown title="Hi User!"> */}
                                    {userId
                                        ?
                                        <>
                                            <Link to="/profile" className={`${dropdownItemClass}`}>Profile</Link>
                                            {userType === "user"
                                                ?
                                                <Link to="/orders" className={`${dropdownItemClass}`}>Order History</Link>
                                                :
                                                ""
                                            }
                                            <Divider />
                                            <Link onClick={handleLogout} className={`${dropdownItemClass}`}>Logout</Link>
                                        </>
                                        :
                                        <>
                                            <Link to="/login/user" className={`${dropdownItemClass}`}>User</Link>
                                            <Link to="/login/admin" className={`${dropdownItemClass}`}>Admin</Link>
                                            <Link to="/login/seller" className={`${dropdownItemClass}`}>Seller</Link>
                                        </>
                                    }
                                </NavDropdown>
                            </div>
                            {
                                (userType === "admin" || userType === "seller")
                                    ?
                                    ""
                                    :
                                    <FontAwesomeIcon onClick={() => navigate('/cart')} icon={faShoppingCart} size='xl' className='d-none d-sm-flex order-sm-2 pb-3 pb-sm-0 flex-sm-one-third align-self-center cursor-pointer' />
                            }
                        </div>
                        {/* Search Bar Screen Size > 576 px */}
                        <Form onSubmit={handleSubmit} className="d-none d-sm-flex flex-sm-two-third flex-md-three-quarters position-relative order-sm-0 py-0 ">
                            <Form.Control type="search" placeholder="Search Products" className="flex-1 search-input rounded-1 " />
                            {/* <Button variant="dark" role="button" to='/' type="submit" className={`position-absolute end-0 align-self-center rounded-1 rounded-start-0 pe-2`}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="cyan"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Button> */}
                            <Button variant="dark" type="submit" className={`position-absolute end-0 align-self-center rounded-1 rounded-start-0`}><FontAwesomeIcon icon={faSearch} color="#0dcaf0" /></Button>
                        </Form>
                        <NavigationLinks className={`d-flex d-sm-none`} dropdownItemClass={dropdownItemClass} />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar >
            <Navbar bg='info' className="d-flex d-sm-none flex-sm-column justify-content-center px-2 flex-wrap">
                {/* Search Bar Screen Size > 768 px */}
                <Form onSubmit={handleSubmit} className="d-flex d-sm-none flex-fill position-relative order-sm-0 py-0 ">
                    <Form.Control type="search" placeholder="Search Products" className="flex-fill search-input rounded-1 " />
                    <Button variant="dark" type="submit" className={`position-absolute end-0 align-self-center rounded-1 rounded-start-0`}><FontAwesomeIcon icon={faSearch} color="#0dcaf0" /></Button>
                </Form>
            </Navbar>
            {/* <NavigationLinks className={`d-none d-sm-flex bg-light justify-content-center`} dropdownItemClass={dropdownItemClass} /> */}
        </>
    );
}

export default MyNavBar;