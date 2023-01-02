function userReducer(state: any = { isLoggedIn: false }, action: any) {
    if (action.type === "loginAction") {
        // console.log("reducer called", action.payload);
        return {
        ...state,
        isLoggedIn: action.payload,
        };
    }
    return state;
}
export default userReducer;  