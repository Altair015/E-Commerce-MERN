import React from 'react';
import { Container, Row, Col, Form, Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

// Contact Us Page
const ContactUs = () => {
    return (
        <Container className="p-4">
            <h1>Contact Us</h1>
            <hr className="pb-2" />
            <Row className="mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Header>Contact Information</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem><strong>Company Name:</strong> PurrStore</ListGroupItem>
                                <ListGroupItem><strong>Address:</strong> 123 Feline Lane, Catville, CA 90210, USA</ListGroupItem>
                                <ListGroupItem><strong>Phone:</strong> +1 (555) 123-4567</ListGroupItem>
                                <ListGroupItem><strong>Email:</strong> <a href="mailto:support@purrstore.com">support@purrstore.com</a></ListGroupItem>
                                <ListGroupItem><strong>Website:</strong> <a href="http://www.purrstore.com" target="_blank" rel="noopener noreferrer">www.purrstore.com</a></ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className='mt-4 mt-md-0'>
                    <Card>
                        <Card.Header>Office Hours</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</ListGroupItem>
                                <ListGroupItem><strong>Saturday:</strong> 10:00 AM - 4:00 PM</ListGroupItem>
                                <ListGroupItem><strong>Sunday:</strong> Closed</ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>Follow Us</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroupItem><a href="http://facebook.com/purrstore" target="_blank" rel="noopener noreferrer">Facebook</a></ListGroupItem>
                                <ListGroupItem><a href="http://instagram.com/purrstore" target="_blank" rel="noopener noreferrer">Instagram</a></ListGroupItem>
                                <ListGroupItem><a href="http://twitter.com/purrstore" target="_blank" rel="noopener noreferrer">Twitter</a></ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactUs;
