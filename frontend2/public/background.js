const apiURL = "http://localhost:8000"

async function client(
    endpoint,
    {data, token, headers: customHeaders, ...customConfig} = {},
) {
    const config = {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data): undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }

    return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            // await logout()
            window.location.assign(window.location)
            return Promise.reject({message: 'Please re-authenticate.'})
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    console.log('here inside onmesage listener')
    const localStorageKey = '__auth_provider_token__'
    const token = window.localStorage.getItem(localStorageKey)
    if (request.method === "getCurrentUser" && token) {
        const data = await client('accounts/current_user', {token})
        sendResponse({data})
        return true;
    } else if (request.method === "getToken") {
        const requestData = JSON.parse(request.message)
        const data = await client("token-auth/", {data: requestData})
        console.log(data)
        sendResponse({data})
        return true;
    }
})
