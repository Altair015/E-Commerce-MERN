import axios from "axios";
import { useContext, useReducer } from "react";
import { Alert, Button, Container, Form, Image } from "react-bootstrap";
import SETTINGS from "../../config";
import { contextStore } from "../../context";
import { useStateReducer } from "../../reducers/reducerFunctions";

function AddProduct({ productId, image, title, description, productQuantity,
    age, price, category, sellerId, sellerEmail, productDispatch }) {
    console.log(sellerId)

    const store = useContext(contextStore);
    const { Label, Select, Group, Control } = Form;
    const { BASE_URL } = SETTINGS;
    const { userId, userType } = store.userStore.userData;
    const [uploadImage, uploadImageDispatch] = useReducer(useStateReducer, { preview: "", data: "" });

    if (sellerId) {
        sellerId = sellerId._id;
    }
    else if (userType === "seller" || userType === "admin") {
        sellerId = userId;
    }

    const [alert, altertDispatch] = useReducer(useStateReducer,
        {
            variant: "",
            message: "",
            display: true
        }
    )

    function alertValue(variant = "", message = "", display = true) {
        altertDispatch(
            {
                variant: variant,
                message: message,
                display: display
            }
        )
        setTimeout(() => {
            altertDispatch(alert)
        }, 4000);
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(event)
        const operation = event.target[7].textContent

        const formData = new FormData();
        formData.append("sellerId", sellerId);

        if (operation === "Create Product") {
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
                    const response = await axios.post(
                        "/api/createitem",
                        formData,
                    )
                    console.log(response)
                    if (response.status === 201) {
                        console.log(response)
                        alertValue("success", "Product Created Successfully.", false)
                    }
                }
                catch (error) {
                    console.log(error)
                    alertValue("danger", Object.values(error.response.data), false)
                }
            }

            createProduct()
        }
        else if (operation === "Update Product") {
            formData.append("productId", productId);

            const oldData = {
                productId, sellerId, image, title, age, description,
                price, category, quantity: productQuantity
            }

            if (event.target[0].files[0] && image !== event.target[0].files[0].name) {
                formData.append("file", event.target[0].files[0])
            }

            for (let i = 1; i < event.target.length - 1; i++) {
                if (event.target[i].value) {
                    const key = event.target[i].id
                    let value = event.target[i].value
                    let oldValue = oldData[key];

                    // removing trailing and leading whitespace
                    if (typeof (oldValue) === "string") {
                        value = value.trim()
                        oldValue = oldValue.trim();
                    }
                    if (oldValue != value) {
                        console.log("old", oldValue, "\nnew", value)
                        formData.append(key, value)
                    }
                }
            }

            async function updateProduct() {
                try {
                    const response = await axios.put(
                        "/api/updateitem",
                        formData,
                    )
                    console.log(response)
                    if (response.status === 201) {
                        const message = Object.values(response.data)[0]
                        productDispatch({ type: "UPDATE_PRODUCT", payload: Object.values(response.data)[1] })
                        alertValue("success", message, false)
                    }
                    else if (response.status === 208) {
                        const message = Object.values(response.data)[0]
                        alertValue("info", message, false)
                    }
                }
                catch (error) {
                    console.log()
                    alertValue("danger", Object.values(error.response.data), false)
                }
            }
            updateProduct()
        }
    }

    return (
        <>
            <Alert variant={alert.variant} className="m-3 fw-semibold" hidden={alert.display}>
                {alert.message}
            </Alert>
            <Form onSubmit={handleSubmit} className="my-3 d-flex flex-column flex-md-row">
                <Container className="d-flex justify-content-center align-items-center  rounded-1">
                    <Label htmlFor=" imageUrl" className="flex-fill cursor-pointer d-flex flex-column gap-1 justify-content-center align-items-center">
                        <Image
                            src={
                                image
                                    ?
                                    `${BASE_URL}/uploads/${sellerId}/${image}`
                                    :

                                    "/images/PurrStore.svg"
                            }
                        />
                        <p className="fw-medium text-info fs-4 opacity-50">Upload Image</p>
                    </Label>
                    {/* <Control id=" imageUrl" type="file" onChange={handleFileSelect} hidden /> */}
                    <Control id=" imageUrl" type="file" hidden />
                    {/* {image.preview && <img src={image.preview} alt="ImageNotFound" />} */}

                </Container >
                <Container>
                    <Container>
                        <Group className="mb-3" controlId="title">
                            <Label className="fw-medium">Name</Label>
                            <Control type="text" defaultValue={title} placeholder="Product Name" />
                        </Group>
                        <Group className="mb-3" controlId="age">
                            <Label className="fw-medium">Age</Label>
                            <Select className="mb-3 outline-0" defaultValue={age} >
                                <option value="Adult">Adult (1+ years)</option>
                                <option value="Kitten">Kitten (0 - 12 months)</option>
                            </Select>
                        </Group>
                        <Group className="mb-3" controlId="description">
                            <Label className='fw-medium'>Description</Label>
                            <Control as="textarea" rows={3} placeholder="Product Description" defaultValue={description} />
                        </Group>
                        <Group className="mb-3" controlId="price">
                            <Label className='fw-medium'>Price</Label>
                            <Control type="number" placeholder="Product Price" defaultValue={price} />
                        </Group>
                        <Group className="mb-3" controlId="category">
                            <Label className="fw-medium">Category</Label>
                            <Select className="mb-3 outline-0" defaultValue={category} >
                                <option value="Food">Food</option>
                                <option value="Litter">Litter</option>
                                <option value="Accessory">Accessory</option>
                                <option value="Toy">Toy</option>
                            </Select>
                        </Group>
                        <Group className="mb-3" controlId="quantity">
                            <Label className='fw-medium'>Quantity</Label>
                            <Control type="number" placeholder="Product Quantity" defaultValue={productQuantity} />
                        </Group>
                    </Container >
                    <Container >
                        {productId
                            ?
                            <Button type="submit" variant="success" className="fw-medium rounded-1" >Update Product</Button>
                            :
                            <Button type="submit" variant="info" className="fw-medium rounded-1" >Create Product</Button>
                        }
                    </Container>
                </Container>
            </Form >
        </>
    )
}

export default AddProduct;