import {createAccountConstants} from "../createAccountConstants";
import {createAccountActions} from "../createAccountActions";
import {createAccountService} from "../../../../shared/services/createAccount.service";
import {of} from "rxjs";
import {catchError, switchMap, map} from "rxjs/operators";
import {ofType} from "redux-observable";
const getSubscriptionPlansEpic = action$ =>
    action$.pipe(
        ofType(createAccountConstants.GET_SUBSCRIPTION_PLANS_REQUEST),
        switchMap(action =>
            createAccountService.getSubscriptionPlans(action).pipe(
                map(data => createAccountActions.getSubscriptionPlanSuccess(data.response)),
                catchError(error =>
                    of(
                        createAccountActions.getSubscriptionPlanFailure(
                            error.xhr.response
                        )
                    )
                )
            )
        )
    );
const createAccountEpic = action$ =>
    action$.pipe(
        ofType(createAccountConstants.CREATE_USER_REQUEST),
        switchMap(action =>
            createAccountService.createUser(action).pipe(
                map(data => createAccountActions.createUserSuccess(data.response)),
                catchError(error =>
                    of(
                        createAccountActions.createUserFailure(
                            error.xhr.response
                        )
                    )
                )
            )
        )
    );
export {getSubscriptionPlansEpic, createAccountEpic};    