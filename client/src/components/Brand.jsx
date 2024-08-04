import { Container, Image } from "react-bootstrap";
import "./Brand.css"

// Website banner displayed for the standard users
function Brand() {
    return (
        <Container fluid className="d-flex ps-2 pt-5 pt-sm-0 h-100 flex-column justify-content-sm-center cover-page">
            <span className="display-1 fw-normal text-secondary user-select-none text-shadow">
                PurrStore
            </span>
            <span className="fs-5 fw-normal text-secondary user-select-none">A Cat Heaven.</span>
        </Container>
    )
}

export default Brand;

