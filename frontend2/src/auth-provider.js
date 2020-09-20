/*global chrome*/
import {parseJwt} from "./utils/helpers";

const localStorageKey = '__auth_provider_token__'

async function getToken() {
    let token = null
    chrome.storage.sync.get([localStorageKey], function(result) {
      token = result[localStorageKey]
    });
    return token
}

function handleUserResponse({token}) {
    chrome.storage.sync.set({[localStorageKey]: token}, function() {
      console.log('Value is set to empty value');
    });
    return parseJwt(token)
}

function login(form) {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.runtime.sendMessage({method: "getToken", message: JSON.stringify(form)}, function (response) {
            resolve(handleUserResponse(response))
            })
        })
    })
}

function register(form) {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.runtime.sendMessage({method: "registerUser", message: form}, function (response) {
            resolve(handleUserResponse(response))
            })
        })
    })
}

async function logout() {
    chrome.storage.sync.set({[localStorageKey]: ''}, function() {
      console.log('Value is set to empty value');
    });
}

// const authURL = process.env.REACT_APP_AUTH_URL || 'http://localhost:8000'

async function client(endpoint, data) {
    const config = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return window.fetch(`/${endpoint}`, config).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export {getToken, login, register, logout, localStorageKey}
