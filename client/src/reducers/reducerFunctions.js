export function showReducer(state, action) {
    const { type, payload } = action;
    if (type === "SET_SHOW") {
        return payload;
    }
    return state;
}

export function useStateReducer(state, action) {
    return action
}