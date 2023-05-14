import { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import ValidationServiceHelpers from "../services/validation.serviceHelpers";

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [message, setMessage] = useState(``);
  const [successful, setSuccessful] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage(``);
    setSuccessful(false);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      const register = await AuthService.register(username, email, password);
      if (register.message) {
        setMessage(register.message);
        setSuccessful(true);
      } else {
        setMessage(register.error);
        setSuccessful(false);
      }
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  className="form-control"
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[
                    ValidationServiceHelpers.required,
                    ValidationServiceHelpers.validUsername,
                  ]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[
                    ValidationServiceHelpers.required,
                    ValidationServiceHelpers.validEmail,
                  ]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[
                    ValidationServiceHelpers.required,
                    ValidationServiceHelpers.validPassword,
                  ]}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? `alert alert-success` : `alert alert-danger`
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
