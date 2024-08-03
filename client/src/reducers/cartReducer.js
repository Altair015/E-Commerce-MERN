export function cartReducer(state, action) {
    const { type, productId, payload } = action

    if (state.length >= 0 && action.type === "LOAD_PRODUCTS_IN_CART") {
        return [...payload];
    }

    else if (state.length >= 0 && action.type === undefined) {
        return [...action];
    }

    // If the product not exist in the cart
    else if (type === "ADD_PRODUCT_TO_CART") {
        return [...state, { ...payload }]
    }

    else if (type === "UPDATE_PRODUCT_IN_CART") {
        const { productId, quantity, productQuantity } = payload;
        const indexFound = state.findIndex((item) => item.productId === productId);
        if (indexFound !== -1) {
            const newState = [...state];
            newState[indexFound].quantity = quantity;
            newState[indexFound].productQuantity = productQuantity;
            return newState
        }
    }

    else if (type === "REDUCE_PRODUCT_QUANTITY_IN_CART") {
        const { productId, quantity, productQuantity } = payload;
        const indexFound = state.findIndex((item) => item.productId === productId);
        if (indexFound !== -1) {
            const newState = [...state];
            newState[indexFound].quantity = quantity;
            newState[indexFound].productQuantity = productQuantity;
            return newState
        }
    }

    else if (type === "REMOVE_PRODUCT_FROM_CART") {
        const { productId } = payload;
        const indexFound = state.findIndex((item) => item.productId === productId);
        if (indexFound !== -1) {
            const newState = [...state];
            newState.splice(indexFound, 1)
            return newState
        }
    }

    else if (type === "EMPTY_CART") {
        return []
    }

    else {
        return state;
    }
}