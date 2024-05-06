import React, { useState, useEffect } from "react";
import "./SignIn.css";
function LogIn({ onClose }) {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function onSubmit() {
    let error = [];
    const user = localStorage.getItem("user");
    if (user.credential !== credential) {
      error.push("Credential is not correct.");
    }
    if (user.password !== password) {
      error.push("Password is not correct.");
    }
    if (error) {
      setErrors(error);
    } else {
      onClose();
    }
  }
  useEffect(() => {
    let error = [];
    if (credential.length === 0) {
      error.push("Please provide your credential.");
    }
    if (password.length === 0) {
      error.push("Please provide your password.");
    }
    setErrors(error);
  }, [credential, password]);
  return (
    <div className="sign-In-Outer">
      <div className="errors-handler-signin">
        {errors.length > 0 &&
          errors.map((error, idx) => <div key={idx}>* {error}</div>)}
      </div>
      <form className="sign-in-form" onSubmit={onSubmit}>
        <label>
          Username or Email
          <input
            required
            type="text"
            name="password"
            placeholder="Credential"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          ></input>
        </label>

        <label>
          Password
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
export default LogIn;
