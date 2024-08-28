import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext } from 'react';
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { contextStore } from "../context/ContextStore";
import { checkQuantity } from '../utils/functions';
import "./MyCard.css";
import StarRating from './StarRating';
const { VITE_BACKEND_URL, VITE_STATIC_URL } = import.meta.env;

function MyCard({ productId, image, title, description, quantity, age, price, rating, category, reviews, sellerId, errorDispatch }) {
    const store = useContext(contextStore);
    const { Img, Body, Text } = Card;
    const { token } = store.tokenStore;
    const { cartItems, cartDispatch } = store.cart;
    const { userId } = store.userStore.userData
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
                    `${VITE_BACKEND_URL}/createcart`,
                    {
                        userId,
                        productId
                    },
                    {
                        headers: { 'Authorization': `JWT ${token}` }
                    }
                );
                if (response.status === 201) {
                    const { newCart } = response.data
                    cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: newCart })
                }
            } catch (error) {
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
                );
                if (response.status === 201) {
                    const { updatedCart } = response.data
                    cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
                }
            } catch (error) {
                if (Object.values(error.response.data)[0].length) {
                    errorDispatch(Object.values(error.response.data)[0])
                }
                else {
                    errorDispatch(error.response.statusText)
                }
            }
        }
    }

    // Removing the product from the Cart on the server and updating the cart in the context.
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
            );
            if (response.status === 201) {
                const { updatedCart, productQuantity } = response.data;
                cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
            }
        } catch (error) {
            if (Object.values(error.response.data)[0].length) {
                errorDispatch(Object.values(error.response.data)[0])
            }
            else {
                errorDispatch(error.response.statusText)
            }
        }
    }

    // Adding the product to the cart in the context.
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

    // Removing the product from the cart in the context.
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
                src={image ? `${VITE_STATIC_URL}/${sellerId}/${image}` : "/images/PurrStore.svg"}
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