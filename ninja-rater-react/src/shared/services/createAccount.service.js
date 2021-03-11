import {ajax} from "rxjs/ajax";

export class createAccountService {
    constructor () { }

    static getSubscriptionPlans(action) {
        debugger;
        const source$ = ajax.get(
            "http://localhost:5000/getProducts",
            action.payload,
            action.headers
        );
        return source$;
    }
    static createUser(action) {
        const source$ = ajax.post(
            "http://localhost:5000/newJackalopeUser",
            action.payload,
            action.headers
        );
        return source$;
    }
}


