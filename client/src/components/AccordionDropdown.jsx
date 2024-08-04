import { Accordion, Col, Container, ListGroup, Row, useAccordionButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomToggle({ eventKey, heading }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    // headding for the dropdown
    return (
        <p onClick={decoratedOnClick} className='d-flex justify-content-between align-items-center text-light fw-medium cursor-pointer m-0 p-0'>
            <span className='fw-medium text-light'>{heading}</span> +
        </p>
    )
}

const AccordionDropdown = ({ heading, options }) => {
    // Dropdown for the smaller screen
    return (
        < Accordion className='bg-dark text-center py-1' defaultActiveKey="1" >
            <CustomToggle eventKey="0" heading={heading} />
            <Accordion.Collapse eventKey="0">
                <Container fluid className='px-0 '>
                    <Row className="d-sm-flex justify-content-evenly">
                        <Col sm={3} className="text-center">
                            <ListGroup variant="flush">
                                {/* Items of the dropdown */}
                                {
                                    options.map(
                                        ({ title, to }, index) => {
                                            return (
                                                <ListGroup.Item key={index} className="p-0 py-1 bg-dark text-white text-start border-0">
                                                    <Link className='fw-medium text-decoration-none text-info text-nowrap' to={to}>{title}</Link>
                                                </ListGroup.Item>
                                            )
                                        }
                                    )
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </Accordion.Collapse>
        </Accordion >
    )
}

export default AccordionDropdown;