import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { contextStore } from "../context/ContextStore";

// Order place or error page.
function ThankYou() {
    const store = useContext(contextStore);
    const { userId } = store.userStore.userData
    const { orderId } = useParams();
    const failure = "Your Order Could Not be placed. Please try again later or contact support."
    const success = "You have Successfully placed the order."

    function Message({ message, icon, color }) {
        return (
            <Col className={`bg-${color} h-100`}>
                <div className="p-4  d-flex align-items-center gap-3">
                    <FontAwesomeIcon className="d-none d-sm-inline" icon={icon} size="xl" color=" whitesmoke" beat />
                    <span className="fs-2 text-light">{message}</span>
                </div>
                <div className="p-4 ">
                    {color === "success"
                        ?
                        <Link to={`/order/${userId}/${orderId}`} className="btn btn-light border-0 rounded-1 fw-medium">Review Order</Link>
                        :
                        <Link to="/summary" className="btn btn-light border-0 rounded-1 fw-medium">Retry Payment</Link>
                    }
                </div>
            </Col>
        )
    }

    return (
        < Row className="h-100" >
            {
                orderId
                    ?
                    <Message message={success} icon={faSquareCheck} color="success" />
                    :
                    <Message message={failure} icon={faExclamationCircle} color="danger" />
            }
        </Row >
    )
}

export default ThankYou;