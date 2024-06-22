import axios from "axios";
import { createContext, useReducer } from "react";

export const contextStore = createContext();

export function cartReducer(state, action) {
    console.log(state, action)

    if (state.length > 0 && action.type === "-") {
        const productIndex = state.findIndex(item => item.productId === action.productId);
        if (productIndex !== -1) {
            const product = state[productIndex]
            if (product.quantity > 1) {
                const newState = [...state];
                newState[productIndex] = {
                    ...newState[productIndex],
                    quantity: newState[productIndex].quantity - 1
                };
                return newState;
            }
            else {
                state.splice(productIndex, 1)
            }
        }
        else {
            return state;
        }
    }

    else if (state.length >= 0 && action.type === "+") {
        console.log(action, state)
        const productIndex = state.findIndex(item => item.productId === action.productId);
        if (productIndex !== -1) {
            // If product exists, update its quantity
            const newState = [...state];
            newState[productIndex] = {
                ...newState[productIndex],
                quantity: newState[productIndex].quantity + 1
            };
            return newState;
        } else {
            // If product doesn't exist, add it to the cart
            return state + { productId: action.productId, quantity: 1, };
        }
    }

    else if (state.length >= 0 && action.type === undefined) {
        return action;
    }

    else {
        return state;
    }
}
