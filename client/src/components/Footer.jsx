import { Col, Container, ListGroup, Row, DropdownDivider } from 'react-bootstrap';

// Footer
const Footer = () => {
    return (
        <footer className="bg-dark py-2">
            <Container>
                <Row className="justify-content-center">
                    {/* Women Options in the footer */}
                    <Col md={3}>
                        <ListGroup className="text-center">
                            <ListGroup.Item className="bg-dark text-white fs-5 border-0 pt-3" action href="#">
                                Women
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Dresses
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Pants
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Skirts
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    {/* Men Options in the footer */}
                    <Col md={3}>
                        <ListGroup className="text-center">
                            <ListGroup.Item className="bg-dark text-white fs-5 border-0 pt-3" action href="#">
                                Men
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Shirts
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Pants
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Hoodies
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    {/* Kid Option in the footer */}
                    <Col md={3}>
                        <ListGroup className="text-center">
                            <ListGroup.Item className="bg-dark text-white fs-5 border-0 pt-3" action href="#">
                                Kids
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    {/* Links, Home, Login and Contact Option in the footer */}
                    <Col md={3}>
                        <ListGroup className="text-center">
                            <ListGroup.Item className="bg-dark text-white fs-5 border-0 pt-3">
                                Links
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Home
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Login
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-dark text-white border-0" action href="#">
                                Contact
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
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