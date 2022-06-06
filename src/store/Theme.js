import { useReducer, createContext } from 'react';

export const initialState = {
    color: { name: 'Light', text: '#000000', back: '#ffffff' }
}

export const ThemeContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'change-dark-color':
            return { ...state, ...action.payload };
        case 'reset-color':
            return initialState;
        default:
            return state;
    }
}

export const ThemeContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return (
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    );
}