import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { contextStore } from "../context/ContextStore";

// Message component to display the error or info messages.
function Message({ text, icon, color, size, textClass, iconClas }) {
    const store = useContext(contextStore);
    const { userData, userDispatch } = store.userStore;
    const { userType } = userData;
    const { cartDispatch } = store.cart;
    const { getToken } = store.tokenStore;

    const navigate = useNavigate();

    // Clearing the context when the token is invalid
    function clearContext() {
        localStorage.clear()
        userDispatch({ type: "CLEAR_DATA" });
        cartDispatch({ type: "EMPTY_CART" })
        getToken()
        navigate(`/login/${userType}`);
    }

    if (text === "Invalid Token") {
        text = "Your session is expired. You are being redirected to the login page."
        setTimeout(() => {
            clearContext()
        }, 2000);
    }

    return (
        <Container className={`h-100 d-flex flex-column align-items-center justify-content-center gap-4`} >
            <FontAwesomeIcon {...{ icon, color, size }} className={`${iconClas}`} />
            <p className={`fs-2 fw-medium text-center ${textClass}`}>{text}</p>
        </Container>
    );
}

export default Message;