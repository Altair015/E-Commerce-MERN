import { useContext, useEffect, useReducer, useState } from "react";
import { Button, Carousel, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { contextStore } from "../../context.js";
import Brand from "../../components/Brand.jsx";
import Footer from "../../components/Footer.jsx";
import axios from "axios";
import { productReducer } from "../../reducers/productReducer.js";
import MyCard from "../../components/MyCard.jsx";


function Home() {
    const store = useContext(contextStore);
    const { userId, userType } = store.userStore.userData;

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    const navigate = useNavigate();

    const [products, productsDispatch] = useReducer(productReducer, []);

    async function getProducts() {
        try {
            const response = await axios.get(`/api/getitems/${userType}/${userId}/null`);
            console.log(response)
            if (response.status === 201) {
                productsDispatch({ type: "LOAD_PRODUCTS", payload: response.data.products })
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    function carouselItems(arr, increment, carouselClass) {
        let result = [];

        for (let i = 0; i < 12; i += increment) {
            let group = arr.slice(i, i + increment);
            group.map(
                (card) => {
                    return card
                }
            )
            result.push(group);
        }

        return (
            <Carousel className={carouselClass} activeIndex={index} onSelect={handleSelect} indicators={false}>
                {
                    result.map(
                        (product, index) => {
                            return (
                                <Carousel.Item key={`carousfdel${index}`}>
                                    <div className="d-flex flex-column align-items-center bg-secondary-subtle">
                                        < div className="d-flex px-4 pb-4 gap-3 flex-wrap bg-secondary-subtle" >
                                            {
                                                product.map(
                                                    (card) => {
                                                        return <MyCard
                                                            {...card}
                                                            key={card.productId}
                                                        />
                                                    }
                                                )
                                            }
                                        </div>
                                    </div>
                                </Carousel.Item>
                            )
                        }
                    )
                }
            </Carousel>
        )
    }

    useEffect(
        () => {
            console.log("USEFFCT")
            if (!products.length) {
                getProducts();
            }
        }, []
    )

    return (
        <>
            {(userType === "seller" || userType === "admin")
                ?
                <>
                    <Button variant="success" onClick={() => navigate("/product")}>+ Add Product</Button>
                    <Button variant="success" onClick={() => navigate("/products")}>Products</Button>
                    {
                        (userType === "admin")
                            ?
                            <>
                                <Button variant="success" onClick={() => navigate("/orders")}>Orders</Button>
                                <Button variant="success" onClick={() => navigate("/users")}>Users</Button>
                            </>
                            :
                            ""
                    }
                </>
                :
                <>
                    <Brand />
                    {
                        products.length >= 12
                            ?
                            <>
                                <section
                                    className="display-4 fw-semibold text-shadow text-center bg-secondary-subtle py-3">
                                    Featured Products
                                </section>
                                {
                                    carouselItems(products, 1, "d-sm-none")
                                }
                                {
                                    carouselItems(products, 2, "d-none d-sm-block d-md-none")
                                }
                                {
                                    carouselItems(products, 3, "d-none d-md-block d-lg-none")
                                }
                                {
                                    carouselItems(products, 4, "d-none d-lg-block")
                                }
                            </>
                            :
                            ""
                    }
                </>
            }

        </>
    )
}

export default Home;