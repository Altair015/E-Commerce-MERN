import axios from "axios";
import { createContext, useReducer } from "react";

export const contextStore = createContext();

// export function cartReducer(state, action) {
//     console.log(state, action)
//     const { type, productId, payload } = action


//     if (state.length > 0 && action.type === "-") {
//         console.log("---------")
//         const productIndex = state.findIndex(item => item.productId === action.productId);
//         if (productIndex !== -1) {
//             const product = state[productIndex]
//             const newState = [...state];
//             if (product.quantity > 1) {
//                 newState[productIndex] = {
//                     ...newState[productIndex],
//                     quantity: newState[productIndex].quantity - 1
//                 };
//                 return newState;
//             }
//             else {
//                 newState.splice(productIndex, 1)
//                 return newState
//             }
//         }
//         else if (state.length >= 0 && action.type === undefined) {
//             console.log("UNDEFINED CONTEXT")
//             return [...action];
//         }

//         else {
//             return state;
//         }
//     }

//     else if (state.length >= 0 && action.type === "+") {
//         console.log("+++++++++")
//         // console.log(action, state)
//         const productIndex = state.findIndex(item => item.productId === action.productId);
//         if (productIndex !== -1) {
//             // If product exists, update its quantity
//             const newState = [...state];
//             newState[productIndex] = {
//                 ...newState[productIndex],
//                 quantity: newState[productIndex].quantity + 1
//             };
//             return newState;
//         } else {
//             // If product doesn't exist, add it to the cart
//             return [...state] + { productId: action.productId, quantity: 1, };
//         }
//     }

//     else if (state.length >= 0 && action.type === undefined) {
//         console.log("UNDEFINED CONTEXT")
//         return [...action];
//     }

//     // If the product not exist in the cart
//     else if (type === "ADD_PRODUCT_TO_CART") {
//         console.log("ADD_PRODUCT_TO_CART")
//         return [...state, { ...payload }]
//     }

//     else if (type === "UPDATE_PRODUCT_IN_CART") {
//         const { productId, quantity, productQuantity } = payload;
//         const indexFound = state.findIndex((item) => item.productId === productId);
//         if (indexFound !== -1) {
//             const newState = [...state];
//             newState[indexFound].quantity = quantity;
//             newState[indexFound].productQuantity = productQuantity;
//             console.log("ADD_PRODUCT_TO_CART", newState)
//             return newState
//         }
//     }

//     else if (type === "REDUCE_PRODUCT_QUANTITY_IN_CART") {
//         const { productId, quantity, productQuantity } = payload;
//         const indexFound = state.findIndex((item) => item.productId === productId);
//         if (indexFound !== -1) {
//             const newState = [...state];
//             newState[indexFound].quantity = quantity;
//             newState[indexFound].productQuantity = productQuantity;
//             console.log(newState[indexFound])
//             return newState
//         }
//     }

//     else if (type === "REMOVE_PRODUCT_FROM_CART") {
//         const { productId } = payload;
//         const indexFound = state.findIndex((item) => item.productId === productId);
//         if (indexFound !== -1) {
//             const newState = [...state];
//             newState.splice(indexFound, 1)
//             console.log(newState)
//             return newState
//         }
//     }

//     else if (type === "EMPTY_CART") {
//         console.log("EMPTY_CART")
//         return []
//     }

//     else {
//         return state;
//     }
// }

export function userReducer(state, action) {

    return action
}

export function productsReducer(state, action) {
    console.log(state, action)
    const { type, payload } = action

    if (type === "updateProductQuantity") {
        const { productId, productQuantity } = payload
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

    return [...action]
}

// export function orderReducer(state, action) {
//     console.log(state, action)
//     const { type, payload } = action;

//     if (type === "createOrInsertOrder" || type === "loadUserOrders") {
//         return payload.orders
//     }
//     else if (type === "loadOrders") {
//         const orders = payload.map(
//             (orders) => {
//                 delete orders.userId
//                 return orders.orders
//             }
//         )
//         console.log(orders.flat())
//         return [...orders.flat()]
//     }
//     else if (type === "updateOrder") {
//         return payload
//     }
//     else if (type === "emptyOrders") {
//         return []
//     }
//     return state
// }

export function searchReducer(state, action) {
    console.log(state, action)
    return [...action]
}