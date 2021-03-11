import {request} from "https";
import JwtDecode from "jwt-decode";

export const apiMiddleware = (store) => (next) => (action) => {
  action.headers = {
    "Content-Type": "application/json",
  };
  next(action);
};
