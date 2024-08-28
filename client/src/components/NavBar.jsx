// Cart Icon from fontawesome
import { faBars, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Font-awesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useReducer } from "react";

// Navigation Components from React Bootstrap
import { Button, Form, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import NavigationLinks from './NavigationLinks';

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";

const { Brand, Toggle } = Navbar;
const { Divider } = NavDropdown;
const { VITE_BACKEND_URL } = import.meta.env;

function MyNavBar({ searchDispatch, sideShow, sideShowDispatch }) {
    const store = useContext(contextStore);
    const dropdownItemClass = "dropdown-item d-block text-decoration-none fw-normal text-dark py-1 px-3";
    const { userData, userDispatch } = store.userStore;
    const { cartDispatch } = store.cart;
    const { getToken } = store.tokenStore;
    const { userId, userType, firstName } = userData;
    const [searchValue, searchValueDispatch] = useReducer(useStateReducer, "");

    const navigate = useNavigate();

    // State to handle the Women Dropdown in the Navigation Bar.
    const [show, showDispatch] = useReducer(useStateReducer, false);

    // Function to handle the searching of products
    function handleSubmit(event) {
        event.preventDefault();
        const searchValue = event.target[0].value.trim().toLowerCase();

        async function getProducts() {
            try {
                const response = await axios.get(`${VITE_BACKEND_URL}/getitems/${userType}/${userId}/${searchValue}`);
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

    // Function to handle the logout click.
    function handleLogout(event) {
        event.preventDefault()
        localStorage.clear()
        userDispatch({ type: "CLEAR_DATA" });
        cartDispatch({ type: "EMPTY_CART" })
        getToken()
        navigate(`/login/${userType}`);
    }

    // Function to handle the sidebar show hide functionality.
    function handleSideShowClick(event) {
        event.stopPropagation();
        sideShowDispatch({ type: "SET_SHOW", payload: !sideShow })
    }

    function handleSearchChange(event) {
        searchValueDispatch(event.target.value);
        if (!event.target.value) {
            searchDispatch({ type: 'SEARCHED_PRODUCTS', payload: [] })
        }
    }

    return (
        <>
            <Navbar bg='info' sticky="top" expand="sm" className="p-2 py-sm-2 d-flex gap-mx-md-x-2">
                <FontAwesomeIcon icon={faBars} size="xl" className="d-none p-2 d-sm-block cursor-pointer" onClick={handleSideShowClick} />
                <Link to="/" className='fw-bold fs-2 flex-one-third text-decoration-none text-dark'>PurrStore</Link>
                {/* Cart Icon for Screen Size < 576 px */}
                <div className='d-flex flex-fill d-sm-none justify-content-end'>
                    {
                        (userType === "admin" || userType === "seller")
                            ?
                            ""
                            :
                            <FontAwesomeIcon onClick={() => navigate('/cart')} icon={faShoppingCart} size='2x' />
                    }
                </div>
                <div className='d-sm-flex order-sm-1 flex-sm-one-third'>
                    {/* Cart Icon for Screen Size > 576 px */}
                    <div className='d-none d-sm-flex justify-content-sm-center fs-5 flex-fill align-self-end fw-medium pb-3 pb-sm-0'>
                        <NavDropdown title={`${userId ? firstName : "Sign In"}`} show={show} onMouseEnter={() => { showDispatch(true) }} onMouseLeave={() => { showDispatch(false) }} onClick={() => { showDispatch(!show) }}>
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
                <Form onSubmit={handleSubmit} className="d-flex w-100 flex-sm-two-third flex-md-three-quarters position-relative order-1 order-sm-0 py-0 pt-2 pt-sm-0 ">
                    <Form.Control type="search" placeholder="Search Products" className="flex-1 search-input rounded-1" onChange={handleSearchChange} />
                    <Button variant="dark" type="submit" className={`position-absolute end-0 align-self-center rounded-1 rounded-start-0`}><FontAwesomeIcon icon={faSearch} color="#0dcaf0" /></Button>
                </Form>
                <Toggle id='offcanvasNavbar' className="d-sm-none" />
                <Navbar.Offcanvas id="offcanvasNavbar" placement="start" className="w-50 bg-dark d-sm-none">
                    {/* Search Bar Screen Size > 576 px */}
                    {/* Greeting Text for Screen Size < 576 px */}
                    <Offcanvas.Header closeButton closeVariant="white" />
                    <Offcanvas.Body className='d-sm-none justify-content-sm-between'>
                        <NavigationLinks handleLogout={handleLogout} className={`d-flex d-sm-none`} dropdownItemClass={dropdownItemClass} />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar >
        </>
    );
}

export default MyNavBar;