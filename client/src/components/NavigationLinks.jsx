import { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contextStore } from "../context/ContextStore";
import { adminOptions, productsOptions, sellerOptions, signInOptions, signUpOptions } from '../utils/InitialData';
import AccordionDropdown from './AccordionDropdown';

// const { Link } = Nav;
// const { Item, Divider } = NavDropdown;

function NavigationLinks({ handleLogout, componentId, bg, className, dropdownItemClass }) {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;

    // Navigation links to be displayed for the smaller screen
    return (
        <Nav id={componentId} className={`${className} d-sm-none`} >
            <Link to="/" className='text-light fw-medium py-2 text-decoration-none px-0 px-sm-3'>Home</Link>
            {
                (userType === "admin")
                    ?
                    <AccordionDropdown options={adminOptions} heading="Categories" />
                    :
                    (userType === "seller")
                        ?
                        <AccordionDropdown options={sellerOptions} heading="Categories" />
                        :
                        <AccordionDropdown options={productsOptions} heading="Categories" />
            }
            {userId
                ?
                <>
                    <Link to="/profile" className='text-light fw-medium py-2 text-decoration-none px-0 px-sm-3'>User Profile</Link>
                    {userType === "user"
                        ?
                        <>
                            <Link to="/orders" className='text-light fw-medium py-2 text-decoration-none px-0 px-sm-3'>Order History</Link>
                        </>
                        :
                        ""
                    }
                </>
                :
                <>
                    <AccordionDropdown options={signInOptions} heading="Sign In" />
                    <AccordionDropdown options={signUpOptions} heading="Sign Up" />
                </>
            }
            {userId ? <Link onClick={handleLogout} className='text-light fw-medium py-2 text-decoration-none px-0 px-sm-3'>Logout</Link> : ""}
            <Link to="/contact" className='text-light fw-medium py-2 text-decoration-none px-0 px-sm-3'>Contact Us</Link>
            <Link to="/about" className='text-light fw-medium py-2 text-decoration-none px-0 px-sm-3'>About Us</Link>
        </Nav >
    )
}

export default NavigationLinks;