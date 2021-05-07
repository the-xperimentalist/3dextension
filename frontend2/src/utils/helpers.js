import validator from "validator";
import { DEFAULT_USER_AUTH } from "./constants";

/** Handle form validation for the login form
 * @param email - user's auth email
 * @param password - user's auth password
 * @param setError - function that handles updating error state value
 */
export const validateLoginForm = (
  email,
  password,
  setError
) => {
  // Check for undefined or empty input fields
  if (!email || !password) {
    setError("Please enter a valid email and password.");
    return false;
  }

  // Validate email
  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }

  return true;
};

export const validateSignUpForm = (email, password, confirmPassword, setError) => {
    // Check for undefined or empty input fields
  if (!email || !password || !confirmPassword) {
    setError("Please enter a valid email and password.");
    return false;
  }

  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address")
    return false
  }

  if (password !== confirmPassword) {
    setError("Password and confirm Password doesn't match")
    return false
  }

  return true
}

/** Return user auth from local storage value */
export const getStoredUserAuth = () => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

/**
 * API Request handler
 * @param url - api endpoint
 * @param method - http method
 * @param bodyParams - body parameters of request
 */

export const apiRequest = async (
  url,
  method,
  bodyParams
) => {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined
  });

  return await response.json();
};

export function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return {
        ...JSON.parse(jsonPayload),
        token,
    };
}
