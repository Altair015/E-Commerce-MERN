export function stringCapitalize(stRing1) {
    let parts = stRing1.split(/(?=[A-Z0-9])/);
    parts[0] = titleCase(parts[0])
    return parts.join(' ');
}

export function titleCase(string) {
    return string.slice(0, 1).toUpperCase() + string.slice(1)
}

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