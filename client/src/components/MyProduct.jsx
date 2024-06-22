import axios from 'axios';
import { useContext } from 'react';
import { Button, ButtonGroup, Card, Container, Form } from 'react-bootstrap';
import { contextStore } from '../context';
import "./MyCard.css";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MyProduct({ productId, image, title, description, cartProductQuantity, productQuantity, age, price, rating, reviewsCount, category, sellerName }) {

    const store = useContext(contextStore);

    const { userId, userType } = store.storeUserData.userData;

    const { Img, Header, Body, Footer, Title, Text } = Card;

    const { cartItems, cartDispatch } = store.cart;

    function starRatings() {

        let ratings = [];

        const abs = Math.abs

        const topRating = abs(Math.ceil(rating) - rating)
        const bottomRating = abs(Math.floor(rating) - rating);

        let modifiedRating = rating;

        if (topRating > bottomRating) {
            modifiedRating = Math.floor(rating)
        }
        else if (topRating < bottomRating) {
            modifiedRating = Math.ceil(rating)
        }

        for (let i = 0; i < modifiedRating; i++) {
            ratings.push(<FontAwesomeIcon key={`rating${i}`} icon={faStar} color='#e6e600' />)
        }

        return ratings
    }

    const ratings = starRatings()

    console.log(ratings)

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

    return (
        <Card className='w-100 d-flex flex-md-row border-0 flex-wrap align-items-center align-items-lg-start justify-content-center' >
            <Header className='flex-lg-one-third align-self-center bg-transparent border-0 w-min-sm-75 w-min-md-50 w-min-lg-25'>
                <Img className='object-fit-contain bg-light' src="/images/purefood.webp" />
            </Header>
            <Body className='flex-1 flex-lg-one-third w-mx-md-100' >
                <Text className='display-6'>{title}</Text>
                <Text className='fw-semibold'>₹ {price}</Text>
                {ratings}
                <span >&nbsp; &nbsp;{`${reviewsCount} `} reviews</span>
                <Text className='my-3'>description {description}</Text>
                {/* <Text>p-quanti -- {productQuantity}</Text> */}
                {/* <Text>ca-quant -- {cartProductQuantity}</Text> */}
                <Text className='fw-medium'>Age : Older than {age} months </Text>
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
                            <Button variant="danger" onClick={removeFromCartClick}>
                                {cartProductQuantity === 1 ? `${'🗑️'}` : "-"}
                            </Button>
                            <Form.Control disabled value={cartProductQuantity > 0 ? cartProductQuantity : 0} className='rounded-0 text-center' />
                            <Button variant="success" onClick={addToCartClick}>
                                +
                            </Button>
                        </ButtonGroup>
                        :
                        <Button variant="info" className='w-mx-sm-50 w-min-sm-25 w-min-md-50 text-center d-block d-lg-none fw-medium' onClick={addToCartClick} >Add to Cart</Button>
                }

            </Body>
            <Container fluid className='d-none d-lg-flex flex-column flex-lg-one-third justify-content-md-center p-3 gap-3'>
                <Body className='p-0' >
                    <Text className='fw-medium'>Sold By : {sellerName}</Text>
                    {
                        productQuantity === cartProductQuantity
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
                            <Button variant="danger" onClick={removeFromCartClick}>
                                {cartProductQuantity === 1 ? `${'🗑️'}` : "-"}
                            </Button>
                            <Form.Control disabled value={cartProductQuantity > 0 ? cartProductQuantity : 0} className='rounded-0 text-center' />
                            <Button variant="success" onClick={addToCartClick}>
                                +
                            </Button>
                        </ButtonGroup>
                        :
                        <Button variant="info" className='w-50 text-center fw-medium' onClick={addToCartClick} >Add to Cart</Button>
                }
            </Container>

        </Card >
    );
}

export default MyProduct;