import React, { useState } from 'react';
import { contextStore } from './ContextStore';

const ContextProvider = ({ children }) => {
    // Define state and functions to be shared via context
    const [userStore, setUserStore] = useState({
        userData: {
            userId: null,
            userType: null,
        },
    });

    // Add methods to update state if needed
    const updateUserData = (data) => {
        setUserStore(prev => ({ ...prev, userData: data }));
    };

    return (
        <contextStore.Provider value={{ userStore, updateUserData }}>
            {children}
        </contextStore.Provider>
    );
};

export default ContextProvider;