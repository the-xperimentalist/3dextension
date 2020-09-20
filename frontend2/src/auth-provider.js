/*global chrome*/
const localStorageKey = '__auth_provider_token__'

async function getToken() {
    return window.localStorage.getItem(localStorageKey)
}

function handleUserResponse({token}) {
    window.localStorage.setItem(localStorageKey, token)
}

function login(form) {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.runtime.sendMessage({method: "getToken", message: JSON.stringify(form)}, response => {
            console.log('here inside getToken react', response)
            resolve(handleUserResponse(response.data))
            })
        })
    })
}

function register({username, password}) {
    return client('accounts/users/', {username, password}).then(handleUserResponse)
}

async function logout() {
    window.localStorage.removeItem(localStorageKey)
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
