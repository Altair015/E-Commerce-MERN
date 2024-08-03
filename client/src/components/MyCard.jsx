import { useContext } from 'react';
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { contextStore } from "../context/ContextStore";
import "./MyCard.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMinus, faPlus, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';
import StarRating from './StarRating';
import SETTINGS from '../config';
import { checkQuantity } from '../utils/functions';

function MyCard({ productId, image, title, description, quantity, age, price, rating, category, reviews, sellerId, errorDispatch }) {

    const store = useContext(contextStore);

    const { Img, Body, Title, Text } = Card;

    const { token, getToken } = store.tokenStore;
    console.log(token)

    const { cartItems, cartDispatch } = store.cart;

    const { userId } = store.userStore.userData

    const { BASE_URL } = SETTINGS;

    const navigate = useNavigate();

    let cartProductQuantity = checkQuantity(productId, cartItems);
    let productQuantity = Math.abs(quantity - checkQuantity(productId, cartItems));
    const reviewsCount = reviews.length
    sellerId = sellerId._id

    if (userId) {
        productQuantity = quantity;
    }

    // Adding/Updating the product quantity in the cart as well as on the server.
    const addToServerCart = async () => {
        if (cartItems.length === 0) {
            try {
                const response = await axios.post(
                    "/api/createcart",
                    {
                        userId,
                        productId
                    },
                    {
                        headers: { 'Authorization': `JWT ${token}` }
                    }
                );
                console.log(response)
                if (response.status === 201) {
                    const { newCart } = response.data
                    cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: newCart })
                }
            } catch (error) {
                console.log(error)
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
                    "/api/updatecart",
                    {
                        userId,
                        productId
                    },
                    {
                        headers: { 'Authorization': `JWT ${token}` }
                    }
                );
                if (response.status === 201) {
                    const { updatedCart } = response.data
                    cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
                }
            } catch (error) {
                console.log(error)
                if (Object.values(error.response.data)[0].length) {
                    errorDispatch(Object.values(error.response.data)[0])
                }
                else {
                    errorDispatch(error.response.statusText)
                }
            }
        }
    }

    const removeFromServerCart = async () => {
        try {
            const response = await axios.delete(
                "/api/deletecart",
                {
                    headers: { 'Authorization': `JWT ${token}` },
                    data: {
                        userId,
                        productId
                    }
                }
            );
            if (response.status === 201) {
                const { updatedCart, productQuantity } = response.data;
                cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
            }
        } catch (error) {
            console.log(error)
            if (Object.values(error.response.data)[0].length) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

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

    function handleCardClick(event) {
        navigate(`/product/${productId}`)
    }

    return (
        <Card className='my-card-width rounded-1 cursor-pointer' >
            <Img
                className='object-fit-cover'
                src={image ? `${BASE_URL}/uploads/${sellerId}/${image}` : "/images/PurrStore.svg"}
                alt='ImageNotFound'
                onClick={handleCardClick}
                width="250em"
                height="250em"
            />
            <Body className='pb-0' onClick={handleCardClick}>
                <Text className='mb-2 fw-medium'>{title}</Text>
                <StarRating rating={rating} reviewsCount={reviewsCount} />
                <Text className='mb-2 fw-medium'>₹ {price}</Text>
            </Body>
            {
                cartProductQuantity > 0 && cartItems.filter(
                    (item) => {
                        return item.productId === productId
                    }
                )
                    ?
                    < ButtonGroup aria-label="Basic example" className='mx-3 mb-3 rounded-1'>
                        <Button variant="danger" className='rounded-1 rounded-end-0' onClick={userId ? removeFromServerCart : removerFromLocalCart}>
                            {cartProductQuantity === 1 ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faMinus} />}
                        </Button>
                        <Form.Control disabled value={cartProductQuantity > 0 ? cartProductQuantity : 0} className='rounded-0 text-center' />
                        <Button className='rounded-1 rounded-start-0' variant="success" onClick={userId ? addToServerCart : addToLocalCart}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    </ButtonGroup>
                    :
                    <Button variant="info" className='mx-3 mb-3 rounded-1 fw-medium' onClick={userId ? addToServerCart : addToLocalCart} >Add to Cart</Button>
            }

        </Card >
    );
}

export default MyCard;