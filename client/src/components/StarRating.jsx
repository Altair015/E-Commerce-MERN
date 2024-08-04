import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStar0 } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap";

// Rating component to display the stars.
function StarRating({ ratingClass, rating, reviewsCount }) {

    const { Text } = Card;
    let ratings = [];
    const abs = Math.abs
    const topRating = abs(Math.ceil(rating) - rating)
    const bottomRating = abs(Math.floor(rating) - rating);

    let modifiedRating = rating;

    if (topRating > bottomRating) {
        modifiedRating = Math.floor(rating)
    }
    else if (topRating < bottomRating) {
        modifiedRating = Math.ceil(rating)
    }

    if (rating) {
        for (let i = 0; i < modifiedRating; i++) {
            ratings.push(<FontAwesomeIcon key={`rating${i}`} icon={faStar} color='#e6e600' />)
        }
    }
    else {
        for (let i = 0; i < 5; i++) {
            ratings.push(<FontAwesomeIcon key={i} icon={faStar0} />)
        }
    }
    return <Text className={`mb-2 fw-medium ${ratingClass}`}>{ratings} &nbsp;{reviewsCount ? `${reviewsCount} reviews` : ""} </Text>
}

export default StarRating;