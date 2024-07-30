import { useContext } from "react";
import { contextStore } from "../../context";
import { useParams } from "react-router-dom";
import MyProduct from "../../components/MyProduct";
import { checkQuantity, rating } from "../../utils/cardQuantity";
import UserReview from "../../components/UserReview";
import SETTINGS from "../../config";
import AddProduct from "../../components/AddProduct";

function Product() {
    const store = useContext(contextStore);
    const { products, productsDispatch } = store.productStore;
    const { cartItems, cartDispatch } = store.cart;
    const { userId, userType } = store.userStore.userData

    console.log(15, store)
    const { BASE_URL } = SETTINGS;
    const urlParams = useParams("productId")
    const { productId } = urlParams;

    let product = {};

    if (productId) {
        product = products.find(
            (item, index) => {
                return item.productId === productId
            }
        )
    }

    console.log(product)

    return (
        <>
            {(userType === "admin" || userType === "seller")
                ?
                <>
                    {
                        productId
                            ?
                            // Creation of Product
                            <AddProduct
                                key={product.productId}
                                productId={product.productId}
                                image={product.image}
                                title={product.title}
                                description={product.description}
                                cartProductQuantity={checkQuantity(product.productId, cartItems)}
                                productQuantity={product.quantity}
                                age={product.age}
                                price={product.price}
                                rating={product.rating}
                                reviewsCount={product.reviews.length}
                                category={product.category}
                                sellerName={product.sellerId.firstName + " " + product.sellerId.lastName}
                                sellerId={product.sellerId._id}
                                sellerEmail={product.sellerId.email}
                            />
                            :
                            // Updation of Product
                            <AddProduct sellerId={userId} />
                    }
                </>
                :
                <>
                    <MyProduct
                        key={product.productId}
                        productId={product.productId}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        cartProductQuantity={checkQuantity(product.productId, cartItems)}
                        productQuantity={userId ? product.quantity : Math.abs(product.quantity - checkQuantity(product.productId, cartItems))}
                        age={product.age}
                        price={product.price}
                        rating={product.rating}
                        reviewsCount={product.reviews.length}
                        reviews={product.reviews}
                        category={product.category}
                        sellerName={product.sellerId.firstName + " " + product.sellerId.lastName}
                        sellerId={product.sellerId._id}
                        sellerEmail={product.sellerId.email}
                    />
                    <UserReview reviews={product.reviews} productId={product.productId} />
                </>
            }
        </>
    )
}

export default Product;