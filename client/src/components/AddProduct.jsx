import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useReducer } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contextStore } from "../context/ContextStore";
import { useStateReducer } from "../reducers/reducerFunctions";
const { VITE_BACKEND_URL, VITE_STATIC_URL } = import.meta.env;

function AddProduct({ productId, image, title, description, quantity,
    age, price, category, sellerId, sellerEmail, productDispatch, errorDispatch }) {
    const store = useContext(contextStore);
    const { Label, Select, Group, Control } = Form;
    const { userId, userType } = store.userStore.userData;
    const { token } = store.tokenStore;
    const [uploadImage, uploadImageDispatch] = useReducer(useStateReducer, { preview: "", data: "" });

    if (sellerId) {
        sellerId = sellerId._id;
    }
    else if (userType === "seller" || userType === "admin") {
        sellerId = userId;
    }

    // Function generating the preview for image uploaded and setting it to be sent.
    const handleImageUpload = (event) => {
        if (event.target.files[0].size > 1000000) {
            toast.error("Image too large.", { position: "bottom-center" });
        }
        else {
            uploadImage.preview = URL.createObjectURL(event.target.files[0]);
            uploadImage.data = event.target.files[0];
            uploadImageDispatch({ ...uploadImage });
        }

    }

    function handleSubmit(event) {
        event.preventDefault()
        const operation = event.target[7].textContent

        const formData = new FormData();
        formData.append("sellerId", sellerId);

        // Creation of new product
        if (operation === "Create Product") {
            formData.append("file", uploadImage.data)

            // inserting the data in the formData which will be sent.
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

            // Trying to create a new product
            async function createProduct() {
                try {
                    const response = await axios.post(
                        `${VITE_BACKEND_URL}/createitem`,
                        formData,
                        {
                            headers: { 'Authorization': `JWT ${token}` }
                        }
                    )
                    if (response.status === 201) {
                        toast.success("Product Created Successfully.", { position: "bottom-center" });
                        productDispatch({ type: "UPDATE_PRODUCT", payload: Object.values(response.data)[1] })
                    }
                    if (response.status === 208) {
                        toast.info(Object.values(response.data)[0], { position: "bottom-center" });
                    }
                }
                catch (error) {
                    if (Object.values(error.response.data)[0].length) {
                        if (Object.values(error.response.data)[0] === "Invalid Token") {
                            errorDispatch(Object.values(error.response.data)[0]);
                        }
                        else {
                            toast.error(Object.values(error.response.data)[0], { position: "bottom-center" });
                        }
                    }
                    else {
                        errorDispatch(error.response.statusText)
                    }
                }
            }

            createProduct()
        }

        // Updating the existing product
        else if (operation === "Update Product") {
            formData.append("productId", productId);

            const oldData = {
                productId, sellerId, image, title, age, description,
                price, category, quantity: quantity
            }
            if (uploadImage.data.name && image !== uploadImage.data.name) {
                formData.append("file", uploadImage.data)
            }

            // inserting the data in the formData which will be sent.
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
                        formData.append(key, value)
                    }
                }
            }

            // Trying to update the existing product.
            async function updateProduct() {
                try {
                    const response = await axios.put(
                        `${VITE_BACKEND_URL}/updateitem`,
                        formData,
                        {
                            headers: { 'Authorization': `JWT ${token}` }
                        }
                    )
                    if (response.status === 201) {
                        const message = Object.values(response.data)[0]
                        toast.success(message, { position: "bottom-center" });
                        productDispatch({ type: "UPDATE_PRODUCT", payload: Object.values(response.data)[1] })
                    }
                    else if (response.status === 208) {
                        const message = Object.values(response.data)[0]
                        toast.info(message, { position: "bottom-center" });
                    }
                }
                catch (error) {
                    console.log(error)
                    if (Object.values(error.response.data)[0].length) {
                        if (Object.values(error.response.data)[0] === "Invalid Token") {
                            errorDispatch(Object.values(error.response.data)[0]);
                        }
                        else {
                            toast.error(Object.values(error.response.data)[0], { position: "bottom-center" });
                        }
                    }
                    else {
                        errorDispatch(error.response.statusText)
                    }
                }
            }
            updateProduct()
        }
    }

    return (
        <>
            <ToastContainer />
            <Form onSubmit={handleSubmit} className="h-100">
                <Container className="py-4">
                    <Row >
                        <Col sm={12} md={6} className="pe-4">
                            <Label htmlFor=" imageUrl" className="h-100 cursor-pointer d-flex flex-column gap-3 justify-content-between align-items-center">
                                <Image
                                    src={
                                        uploadImage.preview
                                            ?
                                            uploadImage.preview
                                            :
                                            image
                                                ?
                                                `${VITE_STATIC_URL}/${sellerId}/${image}`
                                                :
                                                "/images/PurrStore.svg"
                                    }
                                    width="100%"
                                    className={`${(image || uploadImage.preview) ? "opacity-100" : "opacity-25"}`}
                                />
                                <p className="fw-medium text-info fs-4 opacity-75">
                                    <FontAwesomeIcon icon={faCloudUpload} color="#0dcaf0" />
                                    &nbsp; Upload Image
                                </p>
                            </Label>
                            <Control id=" imageUrl" type="file" hidden onChange={handleImageUpload} />
                        </Col>
                        <Col>
                            <Group className="mb-3" controlId="title">
                                <Label className="fw-medium">Name</Label>
                                <Control type="text" defaultValue={title} placeholder="Product Name" />
                            </Group>
                            {age && <Group className="mb-3" controlId="age">
                                <Label className="fw-medium">Age</Label>
                                <Select className="mb-3 outline-0" defaultValue={age} >
                                    <option value="All">All</option>
                                    <option value="Adult">Adult (1+ years)</option>
                                    <option value="Kitten">Kitten (0 - 12 months)</option>
                                </Select>
                            </Group>}
                            {!age && <Group className="mb-3" controlId="age">
                                <Label className="fw-medium">Age</Label>
                                <Select className="mb-3 outline-0" defaultValue={age} >
                                    <option value="All">All</option>
                                    <option value="Adult">Adult (1+ years)</option>
                                    <option value="Kitten">Kitten (0 - 12 months)</option>
                                </Select>
                            </Group>}
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
                                {category && <Select className="mb-3 outline-0" defaultValue={category} >
                                    <option value="Food">Food</option>
                                    <option value="Litter">Litter</option>
                                    <option value="Accessory">Accessory</option>
                                    <option value="Toy">Toy</option>
                                </Select>}
                                {!category && <Select className="mb-3 outline-0" defaultValue={category} >
                                    <option value="Food">Food</option>
                                    <option value="Litter">Litter</option>
                                    <option value="Accessory">Accessory</option>
                                    <option value="Toy">Toy</option>
                                </Select>}
                            </Group>
                            <Group className="mb-3" controlId="quantity">
                                <Label className='fw-medium'>Quantity</Label>
                                <Control type="number" placeholder="Product Quantity" defaultValue={quantity} />
                            </Group>
                            {productId
                                ?
                                <Button type="submit" variant="success" className="fw-medium rounded-1" >Update Product</Button>
                                :
                                <Button type="submit" variant="info" className="fw-medium rounded-1" >Create Product</Button>
                            }
                        </Col>
                    </Row>
                </Container>
            </Form >
        </>
    )
}

export default AddProduct;