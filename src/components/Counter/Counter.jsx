import { useReducer } from 'react';

const initialState = {
    firstCounter: 1,
    secondCounter: 2,
};

const reduceFunc = (countState, action) => {
    switch (action.type) {
        case 'increment1':
            return { ...countState, firstCounter: countState.firstCounter + action.value };
        case 'decrement1':
            return { ...countState, firstCounter: countState.firstCounter - action.value };
        case 'reset1':
            return { ...countState, firstCounter: initialState.firstCounter };
        case 'increment2':
            return { ...countState, secondCounter: countState.secondCounter + action.value };
        case 'decrement2':
            return { ...countState, secondCounter: countState.secondCounter - action.value };
        case 'reset2':
            return { ...countState, secondCounter: initialState.secondCounter };
        default:
            return countState;
    }
}

export const Counter = () => {
    const [count, dispatch] = useReducer(reduceFunc, initialState);

    return (
        <>
            <p>{ count.firstCounter }</p>
            <button onClick={() => dispatch({ type: 'increment1', value: 1 })}>increment1</button>
            <button onClick={() => dispatch({ type: 'decrement1', value: 1 })}>decrement1</button>
            <button onClick={() => dispatch({ type: 'reset1' })}>reset1</button>

            <p>{ count.secondCounter }</p>
            <button onClick={() => dispatch({ type: 'increment2', value: 1 })}>increment2</button>
            <button onClick={() => dispatch({ type: 'decrement2', value: 1 })}>decrement2</button>
            <button onClick={() => dispatch({ type: 'reset2' })}>reset2</button>
        </>
    );
};