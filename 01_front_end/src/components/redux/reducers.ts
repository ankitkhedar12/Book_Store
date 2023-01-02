function counterReducer(state: any = { isLoggedIn: false }, action: any) {
    if (action.type === "incrementAction") {
        // console.log("reducer called", action.payload);
        
        return {
        ...state,
        value2: state.value + action.payload,
        };
    }
    // if (action.type === "decrementAction") {
    //     return {
    //     ...state,
    //     value2: state.value - action.payload,
    //     };
    // }

    return state;
}
export default counterReducer;  