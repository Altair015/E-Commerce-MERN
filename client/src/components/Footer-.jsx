import { Container, DropdownDivider } from 'react-bootstrap';

// Footer
const Footer = () => {
    return (
        <footer className="bg-dark py-2">
            <Container className='text-light text-center display-6'>
                Footer
                <DropdownDivider />
            </Container>
            <hr className="border border-light p-0 my-2" />
            <p className="m-0 bg-dark text-white fs-5 border-0 text-center">
                Copyright © PurrStore 2024
            </p>
        </footer>
    )
}

export default Footer;