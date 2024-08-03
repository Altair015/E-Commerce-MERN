import { useContext } from 'react';
import { Accordion, Col, Container, ListGroup, Row, useAccordionButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { contextStore } from "../context/ContextStore";

// Footer
function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return <p onClick={decoratedOnClick} className='cursor-pointer fw-bold text-center text-light m-0 p-0'>. . . .</p>
}

const Footer = () => {
    const store = useContext(contextStore);

    const { userId, userType } = store.userStore.userData;

    return (
        < Accordion className='bg-dark text-center' defaultActiveKey="1" >
            <CustomToggle eventKey="0" />
            <Accordion.Collapse eventKey="0">
                <Container fluid className='py-2 '>
                    <hr className="border border-light p-0 my-2 mt-0" />
                    <Row className="d-sm-flex justify-content-center">
                        {
                            (userType === "user" || !userType)
                                ?
                                <Col sm={3} className="text-center">
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="bg-dark text-white text-center border-0">
                                            <Link className='fs-5 fw-medium text-decoration-none text-light text-nowrap' to={'/products'}>Products</Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-dark text-center text-white border-0">
                                            <Link className='text-decoration-none text-light text-nowrap' to={'/food'}>Food</Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-dark text-center text-white border-0">
                                            <Link className='text-decoration-none text-light text-nowrap' to={'/litter'}>Litter</Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-dark text-center text-white border-0">
                                            <Link className='text-decoration-none text-light text-nowrap' to={'/toys'}>Toys</Link>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="bg-dark text-center text-white border-0">
                                            <Link className='text-decoration-none text-light text-nowrap' to={'/accessories'}>Accessory</Link>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                :
                                ""
                        }
                        <Col sm={3} className="text-center">
                            <ListGroup variant="flush">
                                <ListGroup.Item className="bg-dark text-white text-center border-0">
                                    <Link className='fs-5 fw-medium text-decoration-none text-light text-nowrap' >Links</Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-center text-white border-0">
                                    <Link className='text-decoration-none text-light text-nowrap' to={'/'}>Home</Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-center text-white border-0">
                                    <Link className='text-decoration-none text-light text-nowrap' to={'/contact'}>Contact Us</Link>
                                </ListGroup.Item>
                                <ListGroup.Item className="bg-dark text-center text-white border-0">
                                    <Link className='text-decoration-none text-light text-nowrap' to={'/about'}>About Us</Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        {
                            userId
                                ?
                                ""
                                :
                                <>
                                    <Col sm={3} className="text-center">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="bg-dark text-white text-center border-0">
                                                <Link className='fs-5 fw-medium text-decoration-none text-light text-nowrap' >Sign Up</Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-dark text-center text-white border-0">
                                                <Link className='text-decoration-none text-light text-nowrap' to={'/signup/user'}>User</Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-dark text-center text-white border-0">
                                                <Link className='text-decoration-none text-light text-nowrap' to={'/signup/seller'}>Seller</Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-dark text-center text-white border-0">
                                                <Link className='text-decoration-none text-light text-nowrap' to={'/signup/admin'}>Admin</Link>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                    <Col sm={3} className="text-center">
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="bg-dark text-white text-center border-0">
                                                <Link className='fs-5 fw-medium text-decoration-none text-light text-nowrap' >Sign In</Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-dark text-center text-white border-0">
                                                <Link className='text-decoration-none text-light text-nowrap' to={'/login/user'}>User</Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-dark text-center text-white border-0">
                                                <Link className='text-decoration-none text-light text-nowrap' to={'/login/seller'}>Seller</Link>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="bg-dark text-center text-white border-0">
                                                <Link className='text-decoration-none text-light text-nowrap' to={'/login/admin'}>Admin</Link>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </>
                        }
                    </Row>
                    <hr className="border border-light p-0 my-0" />
                    {/* <hr className="border border-light p-0 my-0" /> */}
                    <p className="m-0 bg-dark text-white fs-5 border-0 text-center pt-2">
                        Copyright © PurrStore 2024
                    </p>
                    <div className='d-sm-none'>
                        <CustomToggle eventKey="0" />
                    </div>
                </Container>
            </Accordion.Collapse>
        </Accordion >
    )
}

export default Footer;