import { useContext } from "react";
import { contextStore } from "../context";
import { useParams } from "react-router-dom";
import MyProduct from "../components/MyProduct";
import { checkQuantity, rating } from "../utils/cardQuantity";
import UserReview from "../components/UserReview";

function Product() {
    const store = useContext(contextStore);
    const { products, setProducts } = store.storeProducts;
    const { cartItems, cartDispatch } = store.cart;

    const urlParams = useParams("productId")
    const { productId } = urlParams;
    console.log(productId)

    const product = products.find(
        (item, index) => {
            return item.productId === productId
        }
    )

    const productRating = rating(product.rating)

    // return (

    return (
        <>
            <MyProduct
                key={product.productId}
                productId={product.productId}
                image={product.imageUrl}
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
            <UserReview reviews={product.reviews} productId={product.productId} />
        </>
    )
}

export default Product;