import axios from "axios";
import MyCard from "../components/MyCard.jsx";
import { useContext, useEffect } from "react";
import { contextStore } from "../context.js";
import { checkQuantity } from "../utils/cardQuantity.js";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Form, Image } from "react-bootstrap";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons"
import SETTINGS from "../config.js";

function Home() {
    const store = useContext(contextStore);

    const { email, userType } = store.storeUserData.userData;
    const { products, setProducts } = store.storeProducts;
    const { userId } = store.storeUserData.userData
    const { cartItems, cartDispatch } = store.cart;

    const navigate = useNavigate();

    const { Label, Select, Group, Control } = Form;

    const { BASE_URL } = SETTINGS;

    // Getting the Cart Items for the logged in user
    async function getCart() {
        try {
            const cartResponse = await axios.get(
                `/api/getcart/${userId}`
            )
            if (cartResponse.status === 201) {
                const { existingCart } = cartResponse.data
                console.log(existingCart)
                cartDispatch(existingCart)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    // Getting all the products from the DB
    async function getItems() {
        try {
            const response = await axios.get("/api/getitems");
            console.log(response)
            if (response) {
                setProducts(
                    response.data.products.filter(
                        (product, index) => {
                            console.log(product)
                            if (userType === "seller") {
                                return (product.sellerId.userType === userType && product.sellerId.email === email)
                            }
                            else {
                                return product
                            }
                        }
                    )
                )
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(
        () => {
            getItems();
            if (userId) {
                getCart();
            }
        }, []
    )


    const productsComp = products.map(
        (item, index) => {
            console.log(item)
            return (
                <MyCard
                    key={item.productId}
                    productId={item.productId}
                    image={item.imageUrl}
                    title={item.title}
                    description={item.description}
                    cartProductQuantity={checkQuantity(item.productId, cartItems)}
                    productQuantity={item.quantity}
                    age={item.age}
                    price={item.price}
                    rating={item.rating}
                    category={item.category}
                />
            )
        }
    )

    function handleSubmit(event) {
        event.preventDefault()
        // console.log(event)
        const formData = new FormData();
        formData.append("sellerId", userId);
        formData.append("file", event.target[0].files[0])

        for (let i = 1; i < event.target.length - 1; i++) {
            if (event.target[i].value) {
                const key = event.target[i].id
                let value = event.target[i].value

                // removing trailing and leading whitespace
                if (typeof (value) === "string") {
                    value = value.trim()
                }
                formData.append(key, value)
            }
        }

        console.log(formData)
        async function createProduct() {
            try {
                const imageUploadResponse = await axios.post(
                    "/api/uploadImage",
                    formData,
                )
                console.log(imageUploadResponse)
                // if (imageUploadResponse.status === 201) {
                //     console.log(formData)
                //     const dataResponse = await axios.post(
                //         "/api/createitem",
                //         { ...formData }
                //     )
                // }
            }
            catch (error) {
                console.log(error.response.data)
            }
        }

        createProduct()
    }


    return (

        <>
            {/* {(userType === "seller" || userType === "admin")
                ?
                <> */}
            <img src={`${BASE_URL}/uploads/U-D.W.jpg`}></img>
            <Button variant="success" onClick={() => navigate("/login/user")}>+ Add Product</Button>
            <Form onSubmit={handleSubmit} className="mb-3 d-flex flex-column flex-md-row">
                <Container className="d-flex justify-content-center align-items-center bg-light-subtle rounded-1">
                    <Group controlId="imageUrl">
                        <Label className="cursor-pointer d-flex flex-column gap-1 justify-content-center align-items-center">
                            <FontAwesomeIcon icon={faImage} size="3x" color="#0DCAF0" />
                            <p className="fw-medium text-info fs-4">Upload Image</p>
                        </Label>
                        <Control type="file" hidden />
                    </Group>
                </Container >
                <Container>
                    <Container>
                        <Group className="mb-3" controlId="productName">
                            <Label className="fw-medium">Name</Label>
                            <Control type="text" placeholder="Product Name" />
                        </Group>
                        <Group className="mb-3" controlId="productFor">
                            <Label className="fw-medium">Age</Label>
                            <Select className="mb-3 outline-0">
                                <option value="Kitten">Kitten (0 - 12 months)</option>
                                <option value="Adult">Adult (1+ years)</option>
                            </Select>
                        </Group>
                        <Group className="mb-3" controlId="productDescription">
                            <Label className='fw-medium'>Description</Label>
                            <Control as="textarea" rows={3} placeholder="Product Description" />
                        </Group>
                        <Group className="mb-3" controlId="productPrice">
                            <Label className='fw-medium'>Price</Label>
                            <Control type="number" placeholder="Product Price" />
                        </Group>
                        <Group className="mb-3" controlId="productCategory">
                            <Label className="fw-medium">Category</Label>
                            <Select className="mb-3 outline-0">
                                <option value="Food">Food</option>
                                <option value="Litter">Litter</option>
                                <option value="Accessory">Accessory</option>
                                <option value="Toy">Toy</option>
                            </Select>
                        </Group>
                        <Group className="mb-3" controlId="productQuantity">
                            <Label className='fw-medium'>Quantity</Label>
                            <Control type="number" placeholder="Product Quantity" />
                        </Group>
                    </Container >
                    <Container >
                        <Button type="submit" variant="info" className="fw-medium rounded-1" >Create Product</Button>
                    </Container>
                </Container>
            </Form>
            {/* </>
                :
                ""} */}
            <div className="d-flex gap-3 flex-wrap">
                {productsComp}
            </div>
        </>
    )
}

export default Home;