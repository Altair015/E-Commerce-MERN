export function userReducer(state, action) {
    const { type, payload } = action;

    if (type === "LOAD_USER_DATA") {
        return payload;
    }

    else if (type === "UPDATE_USER_DATA") {
        return payload;
    }

    else if (type === "CLEAR_DATA") {
        return {}
    }

    return state;
}