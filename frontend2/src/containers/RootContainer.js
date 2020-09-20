import React from 'react'

import {useAuth} from '../contexts/AuthContext'
import {Wrapper} from '../components/Styles'
import Login from './Login'
import SignUp from './SignUp'

function RootContainer() {
    const {user} = useAuth()
    console.log(user)
    const [signInForm, setSignInForm] = React.useState(true)

    return (
        <Wrapper>
            {user ? <span>Logged in</span> : signInForm ? (
                <Login setSignInForm={setSignInForm} />
            ) : (
                <SignUp setSignInForm={setSignInForm} />
            )}
        </Wrapper>
    )
}

export default RootContainer
