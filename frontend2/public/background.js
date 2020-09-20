/*global chrome*/
const apiURL = "http://localhost:8000"

async function client(
    endpoint,
    {data, token, stringify = true, headers: customHeaders, ...customConfig} = {},
) {
    const config = {
        method: data ? 'POST' : 'GET',
        body: data ?  stringify ? JSON.stringify(data) : data : undefined,
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method === "addModel") {
        // const data = await client('accounts/current_user', {token})
        // sendResponse({data})
        const {webDomain, imgURL, modelFile, imageName, token} = request.message
        const formData = new FormData()
        formData.append('web_domain', webDomain)
        formData.append('image_url', imgURL)
        formData.append('model_file', modelFile)
        formData.append('image_name', imageName)
        client('imageto3d/', {data: formData, token, stringify: false})
            .then(() => {
                sendResponse(true)
            })
            .catch(() => {
                sendResponse(false)
            })
        return true;
    } else if (request.method === "getToken") {
        const requestData = JSON.parse(request.message)
        // const data = await client("token-auth/", {data: requestData})
        client("token-auth/", {data: requestData})
            .then(data => {
                sendResponse(data)
            })
        return true;
    } else if (request.method === "registerUser") {
        client('accounts/users/', {data: request.message})
            .then(data => {
                console.log(data)
                sendResponse(data)
            })
        return true;
    }
    return true;
})
