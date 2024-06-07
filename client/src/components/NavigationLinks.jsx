import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

const { Link } = Nav;
const { Item, Divider } = NavDropdown;

function NavigationLinks({ componentId, bg, className }) {


    return (
        <Nav id={componentId} bg={bg} className={`${className}`} >
            <Link href="/" className='text-black'>Home</Link>
            <NavDropdown title="Products" id="basic-nav-dropdown" >
                <Item href="/food">Food</Item>
                <Item href="/litter">Litter</Item>
                <Item href="/accessories">Accessories</Item>
                <Item href="/toys">Toys</Item>
            </NavDropdown>
            <Link href="/contact" className='text-black'>Contact Us</Link>
            <Link href="/about" className='text-black'>About Us</Link>
        </Nav >
    )
}

export default NavigationLinks;