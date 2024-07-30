import axios from "axios";
import { useContext, useReducer } from "react";
import { Alert, Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import SETTINGS from "../config";
import { contextStore } from "../context";
import { useStateReducer } from "../reducers/reducerFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faCloudArrowUp, faCloudUpload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Icons, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct({ productId, image, title, description, quantity,
    age, price, category, sellerId, sellerEmail, productDispatch }) {
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
        const operation = event.target[7].textContent

        const formData = new FormData();
        formData.append("sellerId", sellerId);

        if (operation === "Create Product") {
            formData.append("file", uploadImage.data)

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

            async function createProduct() {
                try {
                    const response = await axios.post(
                        "/api/createitem",
                        formData,
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
                    if (error.response.statusText) {
                        toast.error(error.response.statusText, { position: "bottom-center" });
                    }
                }
            }

            createProduct()
        }
        else if (operation === "Update Product") {
            formData.append("productId", productId);

            const oldData = {
                productId, sellerId, image, title, age, description,
                price, category, quantity: quantity
            }

            if (uploadImage.data && image !== uploadImage.data.name) {
                formData.append("file", uploadImage.data)
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
                    if (error.response.statusText) {
                        toast.error(error.response.statusText, { position: "bottom-center" });
                    }
                }
            }
            updateProduct()
        }
    }

    const handleImageUpload = (event) => {
        uploadImage.preview = URL.createObjectURL(event.target.files[0]);
        uploadImage.data = event.target.files[0];
        uploadImageDispatch({ ...uploadImage });
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
                                                `${BASE_URL}/uploads/${sellerId}/${image}`
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
            <Alert variant={alert.variant} className="m-3 fw-semibold" hidden={alert.display}>
                {alert.message}
            </Alert>
        </>
    )
}

export default AddProduct;