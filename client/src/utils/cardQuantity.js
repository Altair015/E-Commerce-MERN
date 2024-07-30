export function checkQuantity(cardProductId, cartItems) {

    if (cartItems.length > 0) {
        const foundItem = cartItems.find(
            (element) => {
                // console.log(element)
                const cartProductId = element.productId;
                return cartProductId === cardProductId;
            }
        );
        if (foundItem) {
            console.log(foundItem)
            return foundItem.quantity
        }
    }
    return 0;
}

// will check later
export function rating(value) {
    let overallRating = value;
    const ratingValues = [];

    for (let i = 0; i < value; i++) {
        if (overallRating > 1) {
            ratingValues.push(100)
        }
        else {
            ratingValues.push(Math.trunc(overallRating * 100))
        }
        overallRating -= 1
    }
    return ratingValues;
}

export function navigateTo(hookName, endPoint, userType = "user") {
    hookName(endPoint)
}