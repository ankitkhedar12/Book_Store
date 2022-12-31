export const incrementAction2 = (value: any) => {
    console.log("action2 called");
    return {
      type: "incrementAction2",
      payload: value,
    };
  };
export const decrementAction2=(value: any) => {
    return{
      type: "decrementAction2",
      payload: value
    }
  };
  