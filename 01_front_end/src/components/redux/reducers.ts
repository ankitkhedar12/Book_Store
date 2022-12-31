function counterReducer2(state: any = { value2: 0 }, action: any) {
    if (action.type === "incrementAction2") {
        // console.log("reducer called", action.payload);
        
        return {
        ...state,
        value2: state.value2 + action.payload,
        };
    }
    if (action.type === "decrementAction2") {
        return {
        ...state,
        value2: state.value2 - action.payload,
        };
    }

    return state;
}
export default counterReducer2;  