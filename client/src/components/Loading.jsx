import { Spinner } from "react-bootstrap";

// Loading component
function Loading({ containerClassName, loadingMessage, variant }) {
    return (
        <div className={containerClassName}>
            <Spinner animation="border" variant={variant} />
            <span className="fs-4 text-truncate">{loadingMessage}</span>
        </div >
    )
}

export default Loading;