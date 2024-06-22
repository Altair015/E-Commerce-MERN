import { useContext } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyCard from '../components/MyCard';
import { contextStore } from '../context';


function Cart() {
    const store = useContext(contextStore);
    const { cartItems } = store.cart;
    console.log(cartItems)

    return (
        <>
            <ProgressBar now={25} />
            <div className="d-flex gap-3 flex-wrap">
                {
                    cartItems.map(
                        (item, index) => {
                            console.log(item)
                            return (
                                <MyCard
                                    key={item.productId}
                                    productId={item.productId}
                                    image={item.imageUrl}
                                    title={item.title}
                                    description={item.description}
                                    cartProductQuantity={item.quantity}
                                    productQuantity={item.productQuantity}
                                    age={item.age}
                                    price={item.price}
                                    rating={item.rating}
                                    category={item.category}
                                />
                            )
                        }
                    )
                }
            </div>
            <br></br>
            {cartItems.length
                ?
                <Link to="/ship">Checkout</Link>
                :
                <Link to="/">Go to Home</Link>
            }
        </>
    );
}

export default Cart;