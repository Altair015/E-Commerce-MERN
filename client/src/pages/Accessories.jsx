import MyCard from "../components/MyCard.jsx";
import { catAccessories } from "../utils/InitialData.js";
import { checkQuantity } from "../utils/cardQuantity.js";


function Accessories() {
    const catAccessoriesComp = catAccessories.map(
        (item, index) => {
            <MyCard
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                cartProductQuantity={checkQuantity(item.id, cartItems)}
            />
        }
    )

    return (
        <div className="d-flex gap-3 flex-wrap">
            {catAccessoriesComp}
        </div>
    )
}

export default Accessories;