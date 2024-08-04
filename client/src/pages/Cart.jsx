import { faCartArrowDown, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useContext, useReducer } from 'react';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import MyCartProduct from '../components/MyCartProduct';
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from '../reducers/reducerFunctions';

// Cart Page
function Cart() {
    const navigate = useNavigate();
    const store = useContext(contextStore);
    const [error, errorDispatch] = useReducer(useStateReducer, "");
    const { cartItems } = store.cart;

    const total = cartItems.reduce(
        (total, item) => {
            return total + (item.quantity * item.price)
        }, 0
    )

    const handleClick = () => {
        if (cartItems.length) {
            navigate("/ship")
        }
        else {
            navigate("/")
        }
    }
    return (
        <>
            {
                error
                    ?
                    < Message text={error} icon={faCircleExclamation} color="#0dcaf0" size="8x" />
                    :
                    cartItems.length
                        ?
                        <Container className="p-4">
                            <ProgressBar now={0} />
                            <h1 className="my-3">Shopping Cart</h1>
                            <Row className="gx-5">
                                <Col sm={12} lg={8}>
                                    <Row className="mb-3">
                                        <Col className="p-4 border rounded-1 lh-md">
                                            {
                                                cartItems.map(
                                                    (product, index) => {
                                                        return (
                                                            <MyCartProduct
                                                                key={product.productId}
                                                                {...{ ...product, errorDispatch }}
                                                            />
                                                        )
                                                    }
                                                )
                                            }

                                        </Col>
                                    </Row>
                                </Col>
                                <Col className="px-4 pt-4 pt-lg-0 border-0 rounded-1">
                                    <Row>
                                        <Col className="p-4 border rounded-1">
                                            <Row className="px-3 py-2 border-bottom">
                                                <Col className="px-0 fw-semibold fs-6 text-nowrap">Subtotal {`(${cartItems.length} items)`}</Col>
                                                {cartItems.length
                                                    ?
                                                    <Col className="px-0 fw-semibold"> &nbsp;:&nbsp; ₹ &nbsp;{total}</Col>
                                                    : ""
                                                }
                                            </Row>
                                            <Button variant="info"
                                                type="submit"
                                                className="fw-medium rounded-1 w-100 py-2 mt-3"
                                                onClick={handleClick}
                                            >
                                                Proceed to Checkout
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        :
                        <Message text="Cart is Empty" icon={faCartArrowDown} size='10x' textClass="fw-medium" iconClas="opacity-50" />

            }
        </>
    );
}

export default Cart;