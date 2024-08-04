export function orderReducer(state, action) {
    const { type, payload } = action;

    if (type === "LOAD_USER_ORDERS") {
        return payload.orders
    }
    else if (type === "LOAD_ORDERS") {
        const orders = payload.map(
            (orders) => {
                delete orders.userId
                return orders.orders
            }
        )
        return [...orders.flat()]
    }
    else if (type === "UPDATE_ORDER") {
        return payload
    }
    else if (type === "emptyOrders") {
        return []
    }
    return state
}

export function changeReducer(state, action) {
    const { type, payload } = action;

    if (type === "SET_CHANGE") {
        return payload;
    }

    return state
}