import MyCard from "../components/MyCard.jsx";
import { catFood } from "../utils/InitialData.js";
import { checkQuantity } from "../utils/cardQuantity.js";

function Food() {
    const catFoodComp = catFood.map((item, index) => <MyCard key={item.id} image={item.image} title={item.title} details={item.details} quantity={checkQuantity(item.title)} />)

    return (
        <div className="d-flex gap-3 flex-wrap">
            {catFoodComp}
        </div>
    )
}

export default Food;