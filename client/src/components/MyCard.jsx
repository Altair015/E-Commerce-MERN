import { useContext } from 'react';
import { Button, ButtonGroup, Card, Form } from 'react-bootstrap';
import { contextStore } from '../context';
import "./MyCard.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function MyCard({ productId, image, title, description, cartProductQuantity, productQuantity, age, price, rating, category }) {

    const store = useContext(contextStore);

    const { Img, Body, Title, Text } = Card;

    const { cartItems, cartDispatch } = store.cart;

    const { userId } = store.storeUserData.userData

    const navigate = useNavigate();

    const addToCartClick = async () => {
        if (cartItems.length === 0) {
            try {
                const response = await axios.post(
                    "/api/createcart",
                    {
                        userId,
                        "product": {
                            productId,
                            quantity: cartProductQuantity + 1,
                        }
                    }
                )
                if (response.status === 201) {
                    const { newCart } = response.data
                    cartDispatch(newCart)
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (cartItems.length > 0 && cartProductQuantity < productQuantity) {
            try {
                const response = await axios.put(
                    "/api/updatecart",
                    {
                        userId,
                        "product": {
                            productId,
                            quantity: cartProductQuantity + 1
                        }
                    }
                )
                if (response.status === 208) {
                    const { updatedCart } = response.data
                    cartDispatch(updatedCart)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const removeFromCartClick = async () => {
        // if (quantity === 1) {
        if (cartProductQuantity > 1) {
            try {
                const response = await axios.put(
                    "/api/updatecart",
                    {
                        userId,
                        product: {
                            productId,
                            quantity: cartProductQuantity - 1
                        }
                    }
                )
                if (response.status === 208) {
                    const { updatedCart } = response.data
                    cartDispatch(updatedCart)
                }
            } catch (error) {
                // console.log(error)
            }
        }
        else {
            try {
                console.log("elsetry")
                console.log(userId, productId, cartProductQuantity)
                const response = await axios.delete(
                    "/api/deletecart",
                    {
                        data: {
                            userId,
                            product: {
                                productId,
                                quantity: cartProductQuantity
                            }
                        }
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

    function handleCardClick(event) {
        navigate(`/product/${productId}`)
    }

    return (
        <Card className='w-25 rounded-3 cursor-pointer' >
            <Img className='card-image object-fit-cover' src={image} onClick={handleCardClick} />
            <Body onClick={handleCardClick}>
                <Text>{productId}</Text>
                <Text>{image}</Text>
                <Text>{title}</Text>
                <Text>{description}</Text>
                <Text>p-quanti -- {productQuantity}</Text>
                <Text>ca-quant -- {cartProductQuantity}</Text>
                <Text>{age}</Text>
                <Text>{price}</Text>
                <Text>{rating}</Text>
                <Text>{category}</Text>
            </Body>

            {
                cartProductQuantity > 0 && cartItems.filter(
                    (item) => {
                        return item.name === title
                    }
                )
                    ?
                    < ButtonGroup aria-label="Basic example" className='w-50'>
                        <Button variant="danger" onClick={removeFromCartClick}>
                            {cartProductQuantity === 1 ? `${'🗑️'}` : "-"}
                        </Button>
                        <Form.Control disabled value={cartProductQuantity > 0 ? cartProductQuantity : 0} className='rounded-0 text-center' />
                        <Button variant="success" onClick={addToCartClick}>
                            +
                        </Button>
                    </ButtonGroup>
                    :
                    <Button variant="primary" className='w-50' onClick={addToCartClick} >Add to Cart</Button>
            }

        </Card >
    );
}

export default MyCard;