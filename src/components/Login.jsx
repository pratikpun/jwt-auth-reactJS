import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import ValidationServiceHelpers from "../services/validation.serviceHelpers";

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [message, setMessage] = useState(``);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const onChangeUsername = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };
  const onChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage(``);
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._error.length === 0) {
      const login = await AuthService.login(username, password);
      if (localStorage.getItem("user")) {
        navigate("/profile");
      } else {
        console.dir("login");
        setMessage(login.error);
        setLoading(false);
      }
    } else {
      setLoading(false);
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

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[ValidationServiceHelpers.required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[ValidationServiceHelpers.required]}
            />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              type="submit"
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
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
export default Login;
