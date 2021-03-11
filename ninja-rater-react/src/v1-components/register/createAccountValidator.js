const emailPattern = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const createAccountValidator = {
    userName: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the email or username"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    pswd: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the password"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    firstName: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the first name"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    lastName: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the last name"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    phone: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the phone"
            },
            {
                test: value => {
                    return phonePattern.test(value) || value.length <= 0;
                },
                message: "Please enter a valid phone number"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    email: {
        rules: [
            {
                test: (value) => {
                    return value.length > 0;
                },
                message: "Please enter the email",
            },
            {
                test: (value) => {
                    return emailPattern.test(value) || value.length <= 0;
                },
                message: "Please enter a valid email address",
            },
        ],
        errors: [],
        valid: false,
        state: ""
    },
    organizationName: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the organization name"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    producerCode: {
        rules: [],
        errors: [],
        valid: false,
        state: ""
    },
    address: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the address"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    city: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the city"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    state: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the state"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    country: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the country"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    zipcode: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter the zipcode"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    chosenPlan: {
        rules: [],
        errors: [],
        valid: false,
        state: "",
    },
    billingAddressSame: {
        rules: [],
        errors: [],
        valid: false,
        state: "",
    },
    knewVia: {
        rules: [
            {
                test: (value) => {
                    console.log('dropdown value', value)
                    return value.length > 0;
                },
                message: "Please select how did you hear about us",
            }],
        errors: [],
        valid: false,
        state: "",
    },
    tmz: {
        rules: [],
        errors: [],
        valid: false,
        state: "",
    },
    live: {
        rules: [],
        errors: [],
        valid: false,
        state: "",
    },
    stripe: {
        rules: [],
        errors: [],
        valid: false,
        state: "",
    },
    userCheckingError: {
        rules: [],
        errors: [],
        valid: false,
        state: "",
    },

};
const paymentPageValidator = {
    selectedAccountType: {
        rules: [
            {
                test: value => {
                    return value != 0;
                },
                message: "Please Select Account type"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    selectedPaymentType: {
        rules: [
            {
                test: value => {
                    return value != 0;
                },
                message: "Please select payment type"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    routingNumber: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter routing number"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    accountNumber: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter account number"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    nameOnAccount: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter name of the account"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    cvs: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter cvs"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    termsAndSubFee: {
        rules: [
            {
                test: value => {
                    return value.length > 0;
                },
                message: "Please enter terms and sub fee"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
    acceptTermsAndCond: {
        rules: [
            {
                test: value => {
                    return value;
                },
                message: "Please Accept terms and condition"
            }
        ],
        errors: [],
        valid: false,
        state: ""
    },
}
export {createAccountValidator, paymentPageValidator}