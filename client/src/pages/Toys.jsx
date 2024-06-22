import MyCard from "../components/MyCard.jsx";
import { catToys } from "../utils/InitialData.js";
import { checkQuantity } from "../utils/cardQuantity.js";

function Toys() {
    const catToysComp = catToys.map((item, index) => <MyCard key={item.id} image={item.image} title={item.title} details={item.details} quantity={checkQuantity(item.title)} />)

    return (
        <div className="d-flex gap-3 flex-wrap">
            {catToysComp}
        </div>
    )
}

export default Toys;