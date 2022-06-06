import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../store/Theme';

export const Theme = () => {
    const { state, dispatch } = useContext(ThemeContext);

    useEffect(
        () => {
            document.body.style.backgroundColor = state.color.back;
            document.body.style.color = state.color.text;
        },
        [state.color]
    );

    const resetColor = () => {
        dispatch({
            type: 'reset-color'
        });
    }

    const setDarkColor = (color) => () => {
        dispatch({
            type: 'change-dark-color',
            payload: {
                color: { name: color.name, text: color.text, back: color.back }
            }
        });
    }

    return (
        <>
            <button onClick={resetColor}>Reset</button>
            <button onClick={setDarkColor({
                name: 'Dark', text: '#ffffff', back: '#333333'
            })}>Dark</button>
        </>
    );
}