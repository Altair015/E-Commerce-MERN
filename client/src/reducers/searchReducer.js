export function searchReducer(state, action) {
    const { type, payload } = action

    if (type === "SEARCHED_PRODUCTS") {
        return payload;
    }

    return state
}