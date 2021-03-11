import React, {Component} from "react";
import styles from "./sharedcss.module.scss";
function ErrorTemplateForFormValidation(props) {
    const {errors, customStyle} = props.validator;
    return (
        errors.length > 0 && (
            <div className={styles.error_message}
            >
                <div>* {errors[0]}</div>
            </div>
        )
    )
}
function displayForValidationErrors(fieldName, validators, customStyle) {
    const validator = validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
        return <ErrorTemplateForFormValidation
            validator={validator} customStyle={customStyle} />
    }

}
function resetFormValidations(validators) {
    Object.keys(validators).forEach((fieldName) => {
        validators[fieldName].errors = [];
        validators[fieldName].state = "";
        validators[fieldName].valid = false;
    })
}
function updateFormValidations(fieldName, value, validatorsObject) {
    validatorsObject[fieldName].errors = [];
    validatorsObject[fieldName].state = value;
    validatorsObject[fieldName].valid = true;
    validatorsObject[fieldName].rules.forEach((rule) => {
        if (rule.test instanceof RegExp) {
            if (!rule.test.test(value)) {
                validatorsObject[fieldName].errors.push(rule.message);
                validatorsObject[fieldName].valid = false;
            }
        } else if (typeof rule.test === "function") {
            if (!rule.test(value)) {
                validatorsObject[fieldName].errors.push(rule.message);
                validatorsObject[fieldName].valid = false;
            }
        }
    });
    return validatorsObject[fieldName].valid;
}
export {displayForValidationErrors, resetFormValidations, updateFormValidations};
