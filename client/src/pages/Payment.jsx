import { Button, Container, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const { Check } = Form;

// Payment selection page.
function Payment() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        navigate("/summary")
    }

    return (
        <Container className="p-4">
            <ProgressBar variant="info" now={50} />
            <Form onSubmit={handleSubmit} className='w-min-sm-75 w-min-md-50 m-auto py-4 px-4 px-sm-0'>
                <h1>Select Payment</h1>
                <hr className="pb-2" />
                <Container className="p-0 pb-2">
                    <Check className="mb-3 fs-5 fw-medium" type="radio" label="Paypal" name="payment" id="paypal" value={"PayPal"} defaultChecked />
                    <Check className="mb-3 fs-5 fw-medium" type="radio" label="Stripe" name="payment" id="stripe" value={"Stripe"} disabled />
                </Container>
                <Button variant="info" type="submit" className="fw-medium rounded-1">Continue</Button>
            </Form>
        </Container>
    )
}

export default Payment;