export function searchReducer(state, action) {
    console.log(state, action)
    const { type, payload } = action

    if (type === "SEARCHED_PRODUCTS") {
        return payload;
    }

    return state
}