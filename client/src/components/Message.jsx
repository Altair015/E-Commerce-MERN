import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";

function Message({ text, icon, color, size, textClass, iconClas }) {

    return (
        <Container className={`h-100 d-flex flex-column align-items-center justify-content-center gap-4`} >
            <FontAwesomeIcon {...{ icon, color, size }} className={`${iconClas}`} />
            <p className={`fs-2 fw-medium ${textClass}`}>{text}</p>
        </Container>
    );
}

export default Message;