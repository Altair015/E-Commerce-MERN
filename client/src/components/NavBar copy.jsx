import { useState } from "react";
import { Form, Nav, NavDropdown, Navbar, Offcanvas } from 'react-bootstrap';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavigationLinks from './Navigation';

const { Brand, Toggle, Collapse } = Navbar;
const { Link } = Nav;
const { Item, Divider } = NavDropdown;

function MyNavBar() {
    const [visible, setVisible] = useState("invisible");

    function SearchIconVisibility(event) {
        if (event.target.value) {
            return setVisible("visible");
        }
        setVisible("invisible");
    }

    return (
        <>
            <Navbar bg='info' expand="md" className="px-2 pe-md-0 py-2 py-md-1 d-flex gap-x-2">
                <Brand href="#home" className='fw-bold fs-2 flex-quarter'>PurrStore</Brand>
                <div className='d-flex flex-fill d-md-none justify-content-end'>
                    <FontAwesomeIcon icon={faShoppingCart} size='2x' className='d-md-none cursor-pointer' />
                </div>
                <Toggle id='offcanvasNavbar' />
                <Navbar.Offcanvas id="offcanvasNavbar" placement="end" className="w-50">
                    <Offcanvas.Header closeButton>
                        <Link href='#' className='d-md-none fs-5 flex-three-quarters text-md-center align-self-end fw-medium'>Hi Parent!</Link>
                    </Offcanvas.Header>
                    <Offcanvas.Body className='justify-content-md-center'>
                        <div className='d-md-flex order-md-1 flex-quarter'>
                            <Link href='#' className='d-none d-md-block fs-5 flex-three-quarters text-md-center align-self-end fw-medium pb-3 pb-md-0'>Hi Parent!</Link>
                            <FontAwesomeIcon icon={faShoppingCart} size='xl' className='d-none d-md-flex order-md-2 pb-3 pb-md-0 flex-quarter align-self-center cursor-pointer' />
                        </div>
                        <Form className="d-none d-md-flex flex-three-quarters position-relative order-md-0 py-0 ">
                            <Form.Control onChange={SearchIconVisibility} type="search" placeholder="Search" className="flex-1 search-input rounded-1 " />
                            <Link href='#' className={`${visible} position-absolute end-0 align-self-center pe-2`}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Link>
                        </Form>
                        <Nav className="d-sm-none me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Navbar >
            <Navbar bg='info' className="d-flex d-md-none flex-md-column justify-content-center px-2 flex-wrap">
                <Form className="d-flex d-md-none flex-fill position-relative order-md-0 py-0 ">
                    <Form.Control onChange={SearchIconVisibility} type="search" placeholder="Search" className="flex-fill search-input rounded-1 " />
                    <Link href='#' className={`${visible} position-absolute end-0 align-self-center pe-2`}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></Link>
                </Form>
            </Navbar>
        </>
    );
}

export default MyNavBar;