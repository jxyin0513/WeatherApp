import React from "react";
import LogInModal from "./Auth/SignInModal";
import SignUpModal from "./Auth/SignUpModal";

import "./Navigation.css";

function Navigation() {
  const user = localStorage.getItem("user");

  function SignOut(e) {
    localStorage.removeItem("user");
  }
  return (
    <header>
      <div className="header">
        <div>The Weather Channel</div>
        {!user && (
          <div>
            <LogInModal />
            <SignUpModal />
          </div>
        )}
        {user && (
          <div>
            <button onClick={SignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Navigation;
