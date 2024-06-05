import { Nav, NavDropdown, Navbar } from 'react-bootstrap';

const { Link } = Nav;
const { Item, Divider } = NavDropdown;

function NavigationLinks({ componentId, bg, className }) {
    return (
        <Nav id={componentId} bg={bg} className={`${className}`} >
            <Link href="#home" className='text-black'>Home</Link>
            <Link href="#link" className='text-black'>Link</Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
                <Item href="#action/3.1">Action</Item>
                <Item href="#action/3.2">
                    Another action
                </Item>
                <Item href="#action/3.3">Something</Item>
                <Divider />
                <Item href="#action/3.4">
                    Separated link
                </Item>
            </NavDropdown>
        </Nav >
    )
}

export default NavigationLinks;