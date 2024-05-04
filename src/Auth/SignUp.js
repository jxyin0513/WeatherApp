import React, { useState } from "react";
import "./SignUp.css";
function SignUp({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function onSubmit() {
    const user = {
      username,
      email,
      password,
    };
    localStorage.setItem("user", user);
    onClose();
  }
  return (
    <div className="sign-Up-Outer">
      <form className="sign-up" onSubmit={onSubmit}>
        <label>
          Username:
          <input
            required
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>

        <label>
          Email:
          <input
            required
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>

        <label>
          Password:
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>

        <label>
          Confirm Password:
          <input
            required
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
export default SignUp;
