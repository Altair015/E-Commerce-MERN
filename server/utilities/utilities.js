export function averageRating(product, avgReview = 0) {
        if (product.reviews.length > 1) {
                product.reviews.map(
                        ({ rating }) => {
                                avgReview += rating
                        }
                )
                avgReview = avgReview / product.reviews.length
        }
        else if (product.reviews.length === 1) {
                avgReview += product.reviews[0].rating
        }

        return avgReview;
}

export function stringCapitalize(stRing1) {
        let parts = stRing1.split(/(?=[A-Z0-9])/);
        parts[0] = titleCase(parts[0])
        return parts.join(' ');
}

export function titleCase(string) {
        return string.slice(0, 1).toUpperCase() + string.slice(1)
}