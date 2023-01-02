export const loginAction = (isLoggedIn: boolean) => {
    console.log("action2 called");
    return {
      type: "loginAction",
      payload: isLoggedIn,
    };
  };