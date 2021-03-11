import { userConstants } from "./userConstants";
const initialState = {
  tabSelected: 0,
  tabLabels: [
    {
      id: 0,
      label: "Choose plan",
    },
    {
      id: 1,
      label: "General Information",
    },
    {
      id: 2,
      label: "Payment",
    },
  ],
};

const registerationTabUtilites = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.Choose_Plan:
      return {
        ...state,
        tabSelected: 0,
      };

    case userConstants.General_Info:
      return {
        ...state,
        tabSelected: 1,
        ...action.payload,
      };
    case userConstants.Payment:
      return {
        ...state,
        tabSelected: 2,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default registerationTabUtilites;
