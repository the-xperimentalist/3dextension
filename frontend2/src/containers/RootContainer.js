import React from 'react'

import {useAuth} from '../contexts/AuthContext'
import {Wrapper} from '../components/Styles'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'

function RootContainer() {
    const {user} = useAuth()
    const [signInForm, setSignInForm] = React.useState(true)

    return (
        <Wrapper>
            {user ? (
                <Home />
            ) : signInForm ? (
                <Login setSignInForm={setSignInForm} />
            ) : (
                <SignUp setSignInForm={setSignInForm} />
            )}
        </Wrapper>
    )
}

export default RootContainer
