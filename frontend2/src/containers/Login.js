import * as React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

/** Presentation */
import ErrorMessage from "../components/ErrorMessage";

/** Custom Hooks */
import useErrorHandler from "../contexts/ErrorHandler";

/** Context */
import { useAuth } from "../contexts/AuthContext";

/** Utils */
import { validateLoginForm } from "../utils/helpers";
import { Header } from "../components/Styles";

function Login({setSignInForm}) {
  const {login} = useAuth()
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const { error, showError } = useErrorHandler(null);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (validateLoginForm(userEmail, userPassword, showError)) {
          login({username: userEmail, password: userPassword});
        }
      }}
    >
      <Header>Sign in</Header>
      <br />
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={userEmail}
          placeholder="john@mail.com"
          onChange={e => setUserEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="password"
          value={userPassword}
          placeholder="Password"
          onChange={e => setUserPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" block={true}>
        Sign In
      </Button>
      <Button type="button" block={true} onClick={() => setSignInForm(false)}>
        Sign Up
      </Button>
      <br />
      {error && <ErrorMessage errorMessage={error} />}
    </Form>
  );
}

export default Login;
