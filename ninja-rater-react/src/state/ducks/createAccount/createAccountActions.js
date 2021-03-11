import {createAccountConstants} from "./createAccountConstants";

export const createAccountActions = {
    createAccountState,
    getSubscriptionPlans,
    getSubscriptionPlanSuccess,
    getSubscriptionPlanFailure,
    createUser,
    createUserSuccess,
    createUserFailure
};

function createAccountState(payload) {
    return {
        type: createAccountConstants.CREATE_ACCOUNT_STATE,
        payload
    };
}
function getSubscriptionPlans(payload) {
    return {
        type: createAccountConstants.GET_SUBSCRIPTION_PLANS_REQUEST,
        payload
    }
}

function getSubscriptionPlanSuccess(payload) {
    return {
        type: createAccountConstants.GET_SUBSCRIPTION_PLANS_SUCCESS,
        payload,
    };
}

function getSubscriptionPlanFailure(payload) {
    return {
        type: createAccountConstants.GET_SUBSCRIPTION_PLANS_FAILURE,
        payload,
    };
}

function createUser(payload) {
    return {
        type: createAccountConstants.CREATE_USER_REQUEST,
        payload
    }
}

function createUserSuccess(payload) {
    return {
        type: createAccountConstants.CREATE_USER_SUCCESS,
        payload,
    };
}

function createUserFailure(payload) {
    return {
        type: createAccountConstants.CREATE_USER_FAILURE,
        payload,
    };
}


