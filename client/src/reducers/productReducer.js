export function productReducer(state, action) {
    const { type, payload } = action

    if (type === "LOAD_PRODUCTS") {
        return payload;
    }

    else if (type === "LOAD_PRODUCT") {
        return payload;
    }

    else if (type === "UPDATE_PRODUCT") {
        return payload;
    }

    else if (type === "UPDATE_PRODUCT_QUANTITY") {
        const { productId, productQuantity } = payload
        if (Array.isArray(state)) {
            const indexFound = state.findIndex(item => item.productId === productId);
            if (indexFound !== -1) {
                const newState = [...state];
                newState[indexFound] = {
                    ...newState[indexFound],
                    quantity: productQuantity
                };
                return newState;
            }
        }
        else {
            if (state.productId === productId) {
                state.quantity = productQuantity;
                return { ...state }
            }
        }
    }

    else if (type === "UPDATE_PRODUCT_RATING") {
        return payload
    }

    return state
}