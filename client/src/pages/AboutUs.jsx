import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { aboutData } from '../utils/InitialData';

// About Us page.
function AboutUs() {
    return (
        <Container className="py-3">
            <h1>About Us</h1>
            <hr className="pb-2" />
            {
                aboutData.map(
                    ({ cardTitle, cardText }, index) => {
                        return (
                            <Row key={index} className="mb-4">
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{cardTitle}</Card.Title>
                                            <Card.Text>{cardText}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )
                    }
                )
            }
        </Container>
    );
}

export default AboutUs;
