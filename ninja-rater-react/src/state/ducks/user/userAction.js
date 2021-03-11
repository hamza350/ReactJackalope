import { userConstants } from "../user/userConstants";

export const userActions = {
  switchtoChoosePlan,
  switchtoGeneral_Info,
  switchToPayment,
};

function switchtoChoosePlan(payload) {
  return {
    type: userConstants.Choose_Plan,
    payload,
    meta: false,
  };
}

function switchtoGeneral_Info(payload) {
  return {
    type: userConstants.General_Info,
    payload,
    meta: false,
  };
}

function switchToPayment(payload) {
  return {
    type: userConstants.Payment,
    payload,
    meta: false,
  };
}
