import axios from 'axios';
import { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { contextStore } from "../context/ContextStore";
import "./MyCard.css";

import { faCircleMinus, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
const { VITE_BACKEND_URL, VITE_STATIC_URL } = import.meta.env;

function MyCartProduct({ productId, image, title, description, quantity, cartProductQuantity, productQuantity, age, price, rating, category, sellerId, displayActions, errorDispatch }) {
    cartProductQuantity = quantity;
    const store = useContext(contextStore);
    const { token, getToken } = store.tokenStore;
    const { userId } = store.userStore.userData;
    const { Img } = Card;
    const { cartItems, cartDispatch } = store.cart;
    const navigate = useNavigate();

    // Adding one product to the cart in the server.
    const addToServerCart = async () => {

        if (cartItems.length > 0 && productQuantity > 0) {

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
                    const { updatedCart } = response.data
                    cartDispatch(updatedCart)
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

    // Removing one product from the cart in the server.
    const removeFromServerCart = async () => {
        try {
            const response = await axios.delete(
                `${VITE_BACKEND_URL}/deletecart`,
                {
                    headers: { 'Authorization': `JWT ${token}` }
                    ,
                    data: {
                        userId,
                        productId
                    }
                }
            )
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

    // Removing the product from the cart in the server.
    const removeProductFromServerCart = async () => {
        try {
            const response = await axios.delete(
                `${VITE_BACKEND_URL}/deletecart`,
                {
                    headers: { 'Authorization': `JWT ${token}` }
                    ,
                    data: {
                        userId,
                        productId,
                        removeQuantity: cartProductQuantity
                    }
                }
            )
            if (response.status === 201) {
                const { updatedCart, productQuantity } = response.data;
                cartDispatch({ type: "LOAD_PRODUCTS_IN_CART", payload: updatedCart })
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

    // Removing the product from the cart in the context.
    const removeProductFromLocalCart = async () => {
        const findProductInCart = cartItems.find(
            (cartProduct) => {
                return cartProduct.productId === productId
            }
        )

        if (findProductInCart && cartProductQuantity) {
            cartDispatch(
                {
                    type: "REMOVE_PRODUCT_FROM_CART",
                    payload: { productId, productQuantity: productQuantity + cartProductQuantity }
                }
            )
        }
    }

    function handleCardClick(event) {
        navigate(`/product/${productId}`)
    }

    return (
        <Row className='mb-4 mb-sm-3' >
            <Col onClick={handleCardClick} className='d-none d-sm-flex align-items-center justify-content-center p-0'>
                <div className='h-75 w-75'>
                    <Img className='' src={image ? `${VITE_STATIC_URL}/${sellerId}/${image}` : "/images/PurrStore.svg"} alt='images/PurrStore.svg' />
                </div>
            </Col>
            <Col onClick={handleCardClick} className=' d-sm-flex text-truncate align-items-center justify-content-center p-0'>
                <Link className='link-offset-1 text-truncate' >{title}</Link>
            </Col>
            <Col xs={4} sm={3} className='d-flex align-items-center justify-content-center p-0'>
                <FontAwesomeIcon className={`px-1 ${displayActions}`} icon={cartProductQuantity === 1 ? faTrash : faCircleMinus} color='' onClick={userId ? removeFromServerCart : removerFromLocalCart} />
                <span className='px-2'>{cartProductQuantity > 0 ? cartProductQuantity : 0}</span>
                <FontAwesomeIcon className={`px-1 ${displayActions}`} icon={faCirclePlus} onClick={userId ? addToServerCart : addToLocalCart} />
            </Col>
            <Col xs={4} className='d-flex align-items-center justify-content-center text-truncate p-0'>
                <p className='m-0'>₹ {price}</p>
            </Col>
            <Col className={`d-flex align-items-center justify-content-center p-0 ${displayActions}`}>
                <FontAwesomeIcon icon={faTrash} size='lg' onClick={userId ? removeProductFromServerCart : removeProductFromLocalCart} />
            </Col>
        </Row >
    );
}

export default MyCartProduct;