import React, { useState } from "react";
import "./SignIn.css";
function LogIn({ onClose }) {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit() {
    const user = {
      credential,
      password,
    };
    localStorage.setItem("user", user);
    onClose();
  }

  return (
    <div className="sign-In-Outer">
      <form className="sign-in-form" onSubmit={onSubmit}>
        <label>
          Username or Email
          <input
            required
            type="text"
            name="password"
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
