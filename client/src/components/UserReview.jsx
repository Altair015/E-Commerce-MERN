import { useContext, useEffect, useState } from "react";
import { contextStore } from "../context";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

function UserReview({ reviews, productId }) {
    const store = useContext(contextStore);

    const { userId, userType } = store.storeUserData.userData;

    const { products, setProducts } = store.storeProducts;

    const { token, getToken } = store.tokenStore;

    const { Label, Select, Group, Control } = Form;

    const [show, setShow] = useState(true)

    const submitReview = async (event) => {
        event.preventDefault()
        setShow(false);

        const review = {
            rating: event.target[0].value,
            comment: event.target[1].value,
            ratedBy: userId
        }
        console.log(review, productId)



        try {
            const response = await axios.put(
                "/api/addRating",
                {
                    productId,
                    review
                }
            )
            console.log(response)
            if (response.status === 201) {
                setProducts(
                    products.map(
                        (product) => {
                            if (product.productId === productId) {
                                product.reviews = response.data.productFoundAndRatingUpdated.reviews
                            }
                            return product
                        }
                    )
                )

                setTimeout(() => {
                    console.log("TIMEOUT")
                    setShow(true)
                }, 1000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userReviewFound = reviews.find(
        (review) => {
            return review.ratedBy._id === userId
        }
    )


    console.log("userFOund", userReviewFound)

    {/* If the logged in user is User only and he has not submitted the review earlier. */ }
    return (
        <>
            {
                token && (userType === "user") && !userReviewFound
                    ?
                    <Form onSubmit={submitReview} className='p-3'>
                        <Label className='fw-medium'>Rating</Label>
                        <Select className="mb-3 outline-0">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </Select>
                        <Group className="mb-3" controlId="submitReview">
                            <Label className='fw-medium'>Comment</Label>
                            <Control as="textarea" rows={3} />
                        </Group>
                        <div className="d-flex gap-2 align-items-center">
                            <Button type='submit' variant="info" className=' text-center fw-medium'>
                                Submit Review
                            </Button>
                            <Spinner hidden={show} animation="grow" role="status" size="md" />
                        </div>
                    </Form>
                    :
                    ""
            }
            <div className="p-3">
                <p className="fs-5 fw-semibold mb-2">Reviews</p>
                {
                    reviews.map(
                        (review, index) => {
                            console.log(review.ratedBy._id, userId)
                            return <div className="pb-1" key={index}>
                                {review.ratedBy._id === userId
                                    ?
                                    <p className="mb-1 fw-medium">You</p>
                                    :
                                    <p className="mb-1 fw-medium">{`${review.ratedBy.firstName} ${review.ratedBy.lastName}`}</p>
                                }
                                <p className="mb-2">{review.comment}</p>
                            </div>
                        }
                    )
                }
            </div>
        </>
    )
}

export default UserReview;