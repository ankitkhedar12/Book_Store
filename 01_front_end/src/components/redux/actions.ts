export const incrementAction = (value: any) => {
    console.log("action2 called");
    return {
      type: "incrementAction2",
      payload: value,
    };
  };
export const decrementAction=(value: any) => {
    return{
      type: "decrementAction2",
      payload: value
    }
  };
  