import { useState } from 'react';
import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';

// const { Link } = Nav;
// const { Item, Divider } = NavDropdown;

function NavigationLinks({ componentId, bg, className, dropdownItemClass }) {

    // State to handle the Women Dropdown in the Navigation Bar.
    const [show, setShow] = useState(false);

    // State to handle the Men Dropdown in the Navigation Bar.
    const [showMan, setShowMan] = useState("");

    return (
        <Nav id={componentId} bg={bg} className={`${className}`} >
            <Link to="/" className='text-black py-2 text-decoration-none px-0 px-sm-3' >Home</Link>
            <NavDropdown title="Products" id="basic-nav-dropdown" show={showMan} onMouseEnter={() => { setShowMan(true) }} onMouseLeave={() => { setShowMan(false) }} onClick={() => { setShowMan(!showMan) }}>
                <Link to="/food" className={`${dropdownItemClass}`} >Food</Link>
                <Link to="/litter" className={`${dropdownItemClass} `}>Litter</Link>
                <Link to="/accessories" className={`${dropdownItemClass} `}>Accessories</Link>
                <Link to="/toys" className={`${dropdownItemClass} `}>Toys</Link>
            </NavDropdown>
            <Link to="/contact" className='text-black py-2 text-decoration-none px-0 px-sm-3'>Contact Us</Link>
            <Link to="/about" className='text-black py-2 text-decoration-none px-0 px-sm-3'>About Us</Link>
        </Nav >
    )
}

export default NavigationLinks;