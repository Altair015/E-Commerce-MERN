// Cart Icon from fontawesome
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

// Font-awesome Component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useState } from "react";

// Navigation Components from React Bootstrap
import { Form, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import NavigationLinks from './NavigationLinks';

import { Link, useNavigate } from "react-router-dom";
import { contextStore } from "../context";

const { Brand, Toggle } = Navbar;
const { Divider } = NavDropdown;

function MyNavBar({ handleToken }) {
    const store = useContext(contextStore);

    const dropdownItemClass = "dropdown-item d-block text-decoration-none fw-normal text-dark py-1 px-3";

    // state for managing the visibility of search icon in the search bar.
    const [visible, setVisible] = useState("invisible");

    // state for managing the input to the search field.
    const [searchData, setSearchData] = useState("")

    const { token, getToken } = store.tokenStore;

    // Making the search icon visible and invisible based on the user input.
    function handleSearchChange(event) {
        if (event.target.value) {
            setSearchData(event.target.value)
            return setVisible("visible");
        }
        setVisible("invisible");
    }

    const navigate = useNavigate();

    // State to handle the Women Dropdown in the Navigation Bar.
    const [show, setShow] = useState(false);

    function handleLogout() {
        localStorage.clear()
        const { cartItems, cartDispatch } = store.cart;
        const { setUserData } = store.storeUserData
        getToken()
        cartDispatch([])
        setUserData({})
        setTimeout(() => {
            navigate('/login/user')
        }, 100);
    }

    return (
        <>
            <Navbar bg='info' expand="sm" className="p-2 py-sm-1 d-flex gap-mx-md-x-2">
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
                                <NavDropdown title="Sign In" show={show} onMouseEnter={() => { setShow(true) }} onMouseLeave={() => { setShow(false) }} onClick={() => { setShow(!show) }}>
                                    {/* <NavDropdown title="Hi User!"> */}
                                    <Link to="/login/user" className={`${dropdownItemClass}`}>User</Link>
                                    <Link to="/login/admin" className={`${dropdownItemClass}`}>Admin</Link>
                                    <Link to="/login/seller" className={`${dropdownItemClass}`}>Seller</Link>
                                    <Link to="/profile" className={`${dropdownItemClass}`}>User Profile</Link>
                                    <Link to="/history" className={`${dropdownItemClass}`}>Order History</Link>
                                    <Divider />
                                    <Link onClick={handleLogout} className={`${dropdownItemClass}`}>Logout</Link>
                                </NavDropdown>
                            </div>
                            <FontAwesomeIcon onClick={() => navigate('/cart')} icon={faShoppingCart} size='xl' className='d-none d-sm-flex order-sm-2 pb-3 pb-sm-0 flex-sm-one-third align-self-center cursor-pointer' />
                        </div>
                        {/* Search Bar Screen Size > 576 px */}
                        <Form className="d-none d-sm-flex flex-sm-two-third flex-md-three-quarters position-relative order-sm-0 py-0 ">
                            <Form.Control onChange={handleSearchChange} type="search" placeholder="Search" className="flex-1 search-input rounded-1 " />
                            <Link to='#' className={`${visible} position-absolute end-0 align-self-center pe-2`}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Link>
                        </Form>
                        <NavigationLinks className={`d-flex d-sm-none`} dropdownItemClass={dropdownItemClass} />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar >
            <Navbar bg='info' className="d-flex d-sm-none flex-sm-column justify-content-center px-2 flex-wrap">
                {/* Search Bar Screen Size > 768 px */}
                <Form className="d-flex d-sm-none flex-fill position-relative order-sm-0 py-0 ">
                    <Form.Control onChange={handleSearchChange} type="search" placeholder="Search" className="flex-fill search-input rounded-1 " />
                    <Link to='#' className={`${visible} position-absolute end-0 align-self-center pe-2`}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Link>
                </Form>
            </Navbar>
            <NavigationLinks className={`d-none d-sm-flex bg-light justify-content-center`} dropdownItemClass={dropdownItemClass} />
        </>
    );
}

export default MyNavBar;