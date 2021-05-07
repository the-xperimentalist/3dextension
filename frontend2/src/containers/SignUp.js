import * as React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";

/** Presentation */
import ErrorMessage from "../components/ErrorMessage";

/** Custom Hooks */
import useErrorHandler from "../contexts/ErrorHandler";

/** Context */
import { useAuth } from "../contexts/AuthContext";

/** Utils */
import { validateSignUpForm } from "../utils/helpers";
import { Header } from "../components/Styles";

function SignUp({setSignInForm}) {
  const {register} = useAuth()
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { error, showError } = useErrorHandler(null);

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        if (validateSignUpForm(email, password, confirmPassword, showError)) {
          register({username: email, password: password});
        }
      }}
    >
      <Header>Sign up</Header>
      <br />
      <FormGroup>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="john@mail.com"
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormGroup>
      <Button type="submit" block={true}>
        Sign Up
      </Button>
      <Button type="button" block={true} onClick={() => setSignInForm(true)}>
        Sign In
      </Button>
      <br />
      {error && <ErrorMessage errorMessage={error} />}
    </Form>
  );
}

export default SignUp;
