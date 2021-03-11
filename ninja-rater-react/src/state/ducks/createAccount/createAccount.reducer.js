import {createAccountConstants} from "./createAccountConstants";
const initialState = {
    chosenPlan: {},
    userName: "",
    pswd: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    organizationName: "",
    producerCode: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    billingAddressSame: false,
    knewVia: "",
    tmz: "",
    live: "",

};
const initialState1 = {
    subscriptionPlans: [],
    createAccountData: {},
    showSpinner: false,
    signedUp: false
};

const createAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case createAccountConstants.CREATE_ACCOUNT_STATE:
            return {
                ...initialState,
                ...action.payload,
            };
        default:
            return state;
    }
};
const createAccountAjaxCallsReducer = (state = initialState1, action) => {
    switch (action.type) {
        case createAccountConstants.GET_SUBSCRIPTION_PLANS_REQUEST:
            return {
                ...state
            }
        case createAccountConstants.GET_SUBSCRIPTION_PLANS_SUCCESS:
            return {
                ...state,
                subscriptionPlans: action.payload,
                showSpinner: false,
                error: {},
            };
        case createAccountConstants.GET_SUBSCRIPTION_PLANS_FAILURE:
            return {
                subscriptionPlans: [],
                showSpinner: false,
                error: action.payload,
            };
        case createAccountConstants.CREATE_USER_REQUEST:
            return {
                ...state,
                showSpinner: true,
            }
        case createAccountConstants.CREATE_USER_SUCCESS:
            console.log('action.payload success', action.payload)
            return {
                ...state,
                createAccountData: action.payload,
                showSpinner: false,
                error: {},
                signedUp: true
            };
        case createAccountConstants.CREATE_USER_FAILURE:
            console.log('actio.payload', action.payload);
            return {
                createAccountData: {},
                showSpinner: false,
                error: action.payload,
                signedUp: false
            };
        default:
            return state;
    }
};
export {createAccountReducer, createAccountAjaxCallsReducer};
