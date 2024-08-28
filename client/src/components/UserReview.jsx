import axios from "axios";
import { useContext, useReducer } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
import StarRating from "./StarRating";
const { VITE_BACKEND_URL } = import.meta.env;

// Review component
function UserReview({ reviews, productId, productDispatch, errorDispatch }) {
    const store = useContext(contextStore);
    const { userId, userType } = store.userStore.userData;
    const { token } = store.tokenStore;
    const { Label, Select, Group, Control } = Form;
    const [show, showDispatch] = useReducer(useStateReducer, true);

    // Submission of the review by logged in users.
    const submitReview = async (event) => {
        event.preventDefault()
        showDispatch(false);

        const review = {
            rating: event.target[0].value,
            comment: event.target[1].value,
            ratedBy: userId
        }
        if (event.target[1].value.trim()) {
            try {
                const response = await axios.put(
                    `${VITE_BACKEND_URL}/addRating`,
                    {
                        productId,
                        review
                    },
                    {
                        headers: { 'Authorization': `JWT ${token}` }
                    }
                )

                if (response.status === 201) {
                    toast.success("Review submitted succesfully.", { position: "bottom-center" });
                    productDispatch({ type: "UPDATE_PRODUCT_RATING", payload: response.data.ratedProduct })
                    showDispatch(true)
                }
            }
            catch (error) {
                if (Object.values(error.response.data)[0].length) {
                    errorDispatch(Object.values(error.response.data)[0])
                }
                else {
                    errorDispatch(error.response.statusText)
                }
                showDispatch(true)
            }
        }
        else {
            toast.info("Review cannot be empty", { position: "bottom-center" });
            showDispatch(true)
        }
    }

    // Searching for review for the logged in user
    const userReviewFound = reviews.find(
        (review) => {
            return review.ratedBy._id === userId
        }
    )

    {/* If the logged in user is User only and he has not submitted the review earlier. */ }
    return (
        <>
            <ToastContainer />
            {/* Review Submission form */}
            {
                (userType === "user" && !userReviewFound)
                    ?
                    <Form onSubmit={submitReview} className='p-3'>
                        <p className="p-0 pb-2 fs-5 fw-semibold m-0">Create a review.</p>
                        <Label className='fw-medium'>Rating</Label>
                        <Select className="mb-3 outline-0" defaultValue={3}>
                            <option value="1">Worst</option>
                            <option value="2">Good</option>
                            <option value="3">Very Good</option>
                            <option value="4">Great</option>
                            <option value="5">Excellent</option>
                        </Select>
                        <Group className="mb-3" controlId="submitReview">
                            <Label className='fw-medium'>Comment</Label>
                            <Control placeholder="Comments" as="textarea" rows={3} />
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
            {/* Existing reviews if exist. */}
            {
                (userType !== "admin" || userType !== "seller")
                    ?
                    (reviews.length > 0)
                        ?
                        <div className="p-3 py-0">
                            <p className="p-0 pb-3 fs-5 fw-semibold m-0">Reviews</p>
                            {
                                reviews.map(
                                    (review, index) => {
                                        return (
                                            <Container fluid className="p-0 pb-1" key={index}>
                                                {userId && review.ratedBy._id === userId
                                                    ?
                                                    <Row className="px-2 mb-2">
                                                        <Col className="p-3 py-2 border rounded-1 border-secondary-subtle">
                                                            <p className="mb-1 fw-medium">You</p>
                                                            <StarRating ratingClass="mb-3" rating={review.rating} />
                                                            <p>{review.comment}</p>
                                                        </Col>
                                                    </Row>
                                                    :
                                                    <Row className="px-2 mb-2">
                                                        <Col className="p-3 py-2 border rounded-1 border-secondary-subtle">
                                                            <p className="mb-1 fw-medium">{`${review.ratedBy.firstName} ${review.ratedBy.lastName}`}</p>
                                                            <StarRating ratingClass="mb-3" rating={review.rating} />
                                                            <p>{review.comment}</p>
                                                        </Col>
                                                    </Row>
                                                }
                                            </Container>
                                        )
                                    }
                                )
                            }
                        </div>
                        :
                        ""
                    :
                    ""
            }
        </>
    )
}

export default UserReview;