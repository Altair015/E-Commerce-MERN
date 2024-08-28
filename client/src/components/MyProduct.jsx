import axios from 'axios';
import { useContext } from 'react';
import { Button, ButtonGroup, Card, Container, Form } from 'react-bootstrap';
import { contextStore } from "../context/ContextStore";
import "./MyCard.css";

import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checkQuantity } from '../utils/functions';
import StarRating from './StarRating';
const { VITE_BACKEND_URL, VITE_STATIC_URL } = import.meta.env;

function MyProduct({ productId, image, title, description, quantity, age, price, rating, category, sellerId, reviews, productDispatch, errorDispatch }) {
    const store = useContext(contextStore);
    const { token, getToken } = store.tokenStore;
    const { userId } = store.userStore.userData;
    const { Img, Header, Body, Text } = Card;
    const { cartItems, cartDispatch } = store.cart;

    let cartProductQuantity = checkQuantity(productId, cartItems);
    let productQuantity = Math.abs(quantity - checkQuantity(productId, cartItems));
    const reviewsCount = reviews.length
    const sellerName = sellerId.firstName + " " + sellerId.lastName
    sellerId = sellerId._id;

    if (userId) {
        productQuantity = quantity;
    }

    // Adding one product to the cart in the server.
    const addToServerCart = async () => {
        if (cartItems.length === 0) {
            try {
                const response = await axios.post(
                    `${VITE_BACKEND_URL}/createcart`,
                    {
                        userId,
                        productId
                    },
                    {
                        headers: { 'Authorization': `JWT ${token}` }
                    }
                )
                if (response.status === 201) {
                    const { newCart, productQuantity } = response.data
                    cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: newCart })
                    productDispatch({ type: "UPDATE_PRODUCT_QUANTITY", payload: { productId, productQuantity } })
                }
            }
            catch (error) {
                if (Object.values(error.response.data)[0].length) {
                    errorDispatch(Object.values(error.response.data)[0])
                }
                else {
                    errorDispatch(error.response.statusText)
                }
            }
        }

        else if (cartItems.length > 0 && productQuantity > 0) {

            try {
                const response = await axios.put(
                    `${VITE_BACKEND_URL}/updatecart`,
                    {
                        userId,
                        productId
                    },
                    {
                        headers: { 'Authorization': `JWT ${token}` }
                    }
                )
                if (response.status === 201) {
                    const { updatedCart, productQuantity } = response.data
                    cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
                    productDispatch({ type: "UPDATE_PRODUCT_QUANTITY", payload: { productId, productQuantity } })
                }
            }
            catch (error) {
                if (Object.values(error.response.data)[0].length) {
                    errorDispatch(Object.values(error.response.data)[0])
                }
                else {
                    errorDispatch(error.response.statusText)
                }
            }
        }
    }

    // Removing one product from the cart in the server.
    const removeFromServerCart = async () => {
        try {
            const response = await axios.delete(
                `${VITE_BACKEND_URL}/deletecart`,
                {
                    headers: { 'Authorization': `JWT ${token}` },
                    data: {
                        userId,
                        productId
                    }
                }
            )
            if (response.status === 201) {
                const { updatedCart, productQuantity } = response.data;
                cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
                productDispatch({ type: "UPDATE_PRODUCT_QUANTITY", payload: { productId, productQuantity } })
            }
        }
        catch (error) {
            if (Object.values(error.response.data)[0].length) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    // Adding one product to the cart in the context.
    const addToLocalCart = async () => {
        const findProductInCart = cartItems.find(
            (cartProduct) => {
                return cartProduct.productId === productId
            }
        )

        if ((!findProductInCart || cartItems.length === 0) && productQuantity > 0) {
            cartDispatch(
                {
                    type: "ADD_PRODUCT_TO_CART",
                    payload: { productId, image, title, description, quantity: cartProductQuantity + 1, productQuantity: productQuantity - 1, age, price, rating, category, reviews, sellerId }
                }
            )
        }

        else if (findProductInCart && productQuantity > 0) {
            cartDispatch(
                {
                    type: "UPDATE_PRODUCT_IN_CART",
                    payload: { productId, quantity: cartProductQuantity + 1, productQuantity: productQuantity - 1 }
                }
            )
        }
    }

    // Removing one product from the cart in the context.
    const removerFromLocalCart = async () => {
        const findProductInCart = cartItems.find(
            (cartProduct) => {
                return cartProduct.productId === productId
            }
        )

        if (findProductInCart && cartProductQuantity > 1) {
            cartDispatch(
                {
                    type: "REDUCE_PRODUCT_QUANTITY_IN_CART",
                    payload: { productId, quantity: cartProductQuantity - 1, productQuantity: productQuantity + 1 }
                }
            )
        }

        else if (findProductInCart && cartProductQuantity === 1) {
            cartDispatch(
                {
                    type: "REMOVE_PRODUCT_FROM_CART",
                    payload: { productId, productQuantity: productQuantity + 1 }
                }
            )
        }
    }

    return (
        <Card className='w-100 d-flex flex-md-row border-0 flex-wrap align-items-center align-items-lg-start justify-content-center' >
            <Header className='flex-lg-one-third align-self-center bg-transparent border-0 w-min-sm-75 w-min-md-50 w-min-lg-25'>
                <Img className='object-fit-contain' src={image ? `${VITE_STATIC_URL}/${sellerId}/${image}` : "/images/PurrStore.svg"} alt='images/PurrStore.svg' />
            </Header>
            <Body className='flex-1 flex-lg-one-third w-mx-md-100 align-self-start' >
                <Text className='display-6'>{title}</Text>
                <StarRating rating={rating} reviewsCount={reviewsCount} />
                <Text className='fw-semibold'>₹ {price}</Text>
                <Text className='my-3'>description {description}</Text>
                <Text className='fw-medium'>Age : {age} </Text>
                <Text className='fw-medium'>Category : {category}</Text>
                <Body className='p-0 d-lg-none pb-3' >
                    <Text className='fw-medium'>Sold By : {sellerName}</Text>
                    {
                        productQuantity === cartProductQuantity
                            ? <Text className='fw-medium text-danger'> Out of Stock </Text>
                            : <Text className='fw-medium text-success'> In Stock </Text>
                    }
                    {/* greater than lg */}
                </Body>
                {
                    cartProductQuantity > 0 && cartItems.filter(
                        (item) => {
                            return item.name === title
                        }
                    )
                        ?
                        < ButtonGroup aria-label="Basic example" className='w-mx-sm-50 w-min-sm-25 w-min-md-50 d-flex d-lg-none'>
                            <Button variant="danger" onClick={userId ? removeFromServerCart : removerFromLocalCart}>
                                {cartProductQuantity === 1 ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faMinus} />}
                            </Button>
                            <Form.Control disabled value={cartProductQuantity > 0 ? cartProductQuantity : 0} className='rounded-0 text-center' />
                            <Button variant="success" onClick={userId ? addToServerCart : addToLocalCart}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </ButtonGroup>
                        :
                        <Button variant="info" className='w-mx-sm-50 w-min-sm-25 w-min-md-50 text-center d-block d-lg-none fw-medium' onClick={userId ? addToServerCart : addToLocalCart} >Add to Cart</Button>
                }

            </Body>
            <Container fluid className='d-none d-lg-flex flex-column flex-lg-one-third justify-content-md-center p-3 gap-3'>
                <Body className='p-0' >
                    <Text className='fw-medium'>Sold By : {sellerName}</Text>
                    {
                        productQuantity === 0
                            ? <Text className='fw-medium text-danger'> Out of Stock </Text>
                            : <Text className='fw-medium text-success'> In Stock </Text>
                    }
                </Body>
                {/* Button */}
                {
                    cartProductQuantity > 0 && cartItems.filter(
                        (item) => {
                            return item.name === title
                        }
                    )
                        ?
                        < ButtonGroup aria-label="Basic example" className='w-50 d-flex'>
                            <Button variant="danger" onClick={userId ? removeFromServerCart : removerFromLocalCart}>
                                {cartProductQuantity === 1 ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faMinus} />}
                            </Button>
                            <Form.Control disabled value={cartProductQuantity > 0 ? cartProductQuantity : 0} className='rounded-0 text-center' />
                            <Button variant="success" onClick={userId ? addToServerCart : addToLocalCart}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </ButtonGroup>
                        :
                        <Button variant="info" className='w-50 text-center fw-medium' onClick={userId ? addToServerCart : addToLocalCart} >Add to Cart</Button>
                }
            </Container>
        </Card >
    );
}

export default MyProduct;