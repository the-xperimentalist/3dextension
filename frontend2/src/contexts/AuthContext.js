/*global chrome*/
import React from 'react'

import * as auth from '../auth-provider'
import {useAsync} from "../utils/hooks";
import {client} from "../utils/api-client";
import {FullPageSpinner, FullPageErrorFallback} from '../components/lib'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

async function bootstrapAppData() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      console.log('inside tab')
      chrome.runtime.sendMessage({method: "getCurrentUser"}, response => {
        console.log('here inside react')
        user = response.data.user
      })
    })
  }
  return user
}

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData]
  )

  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData]
  )

  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const value = React.useMemo(() => ({user, login, logout, register}), [
    login,
    logout,
    register,
    user,
  ])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {AuthProvider, useAuth, useClient}
