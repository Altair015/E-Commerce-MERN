import axios from 'axios';
import { useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { contextStore } from "../context/ContextStore";
import "./MyCard.css";

import { faCircleMinus, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import SETTINGS from '../config';

function MyCartProduct({ productId, image, title, description, quantity, cartProductQuantity, productQuantity, age, price, rating, category, sellerId, displayActions }) {
    cartProductQuantity = quantity;

    const store = useContext(contextStore);


    const { userId } = store.userStore.userData;

    const { Img } = Card;

    const { cartItems, cartDispatch } = store.cart;

    const { BASE_URL } = SETTINGS;

    const navigate = useNavigate();

    const addToServerCart = async () => {

        if (cartItems.length > 0 && productQuantity > 0) {

            try {
                const response = await axios.put(
                    "/api/updatecart",
                    {
                        userId,
                        productId
                    }
                )
                if (response.status === 201) {
                    const { updatedCart } = response.data
                    cartDispatch(updatedCart)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const removeFromServerCart = async () => {
        try {
            const response = await axios.delete(
                "/api/deletecart",
                {
                    data: {
                        userId,
                        productId
                    }
                }
            )
            console.log(response)
            if (response.status === 201) {
                const { updatedCart, productQuantity } = response.data;
                cartDispatch(updatedCart);
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(productQuantity, cartProductQuantity, quantity)
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
    // image = "";
    return (
        <Row className='mb-4 mb-sm-3' >
            <Col onClick={handleCardClick} className='d-none d-sm-flex align-items-center justify-content-center p-0'>
                <div className='h-75 w-75'>
                    <Img className='' src={image ? `${BASE_URL}/uploads/${sellerId}/${image}` : "/images/PurrStore.svg"} alt='images/PurrStore.svg' />
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
                <FontAwesomeIcon icon={faTrash} size='lg' />
            </Col>
        </Row >
    );
}

export default MyCartProduct;