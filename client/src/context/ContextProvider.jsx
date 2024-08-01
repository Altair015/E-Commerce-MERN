import React, { useReducer } from 'react';
import { cartReducer } from '../reducers/cartReducer';
import { useStateReducer } from '../reducers/reducerFunctions';
import { userReducer } from '../reducers/userReducer';
import { contextStore } from './ContextStore';

const ContextProvider = ({ children }) => {
    const [cartItems, cartDispatch] = useReducer(cartReducer, []);

    const [userData, userDispatch] = useReducer(userReducer, {})

    const [token, tokenDispatch] = useReducer(useStateReducer, null);

    function getToken() {
        tokenDispatch(window.localStorage.getItem("token"))
    }

    return (
        < contextStore.Provider value=
            {
                {
                    cart: { cartItems, cartDispatch },
                    userStore: { userData, userDispatch },
                    tokenStore: { token, getToken },
                }
            }
        >
            {children}
        </contextStore.Provider>
    );
};

export default ContextProvider;