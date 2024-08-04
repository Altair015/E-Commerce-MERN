import { Carousel } from "react-bootstrap";
import MyCard from "./MyCard";
import { useMemo } from "react";
import { useEffect } from "react";

const { Item } = Carousel;

function Crousel({ products, increment, carouselClass, handleSelect, index, errorDispatch }) {
    let result = [];

    for (let i = 0; i < 12; i += increment) {
        let cards = products.slice(i, i + increment);
        result.push(cards);
    }

    // Carousel to display the featured products
    return (
        <Carousel className={carouselClass} activeIndex={index} onSelect={handleSelect} indicators={false}>
            {
                result.map(
                    (cards, index) => {
                        return (
                            <Item key={`carousfdel${index}`}>
                                <div className="d-flex flex-column align-items-center bg-secondary-subtle">
                                    < div className="d-flex px-4 pb-4 gap-3 flex-wrap bg-secondary-subtle" >
                                        {
                                            cards.map(
                                                (card) => {
                                                    return <MyCard
                                                        key={card.productId}
                                                        {...{ ...card, errorDispatch }}
                                                    />
                                                }
                                            )
                                        }
                                    </div>
                                </div>
                            </Item>
                        )
                    }
                )
            }
        </Carousel>
    )
}

export default Crousel;