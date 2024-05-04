import LogIn from "./SignIn";
import React, { useState } from "react";
import { Modal } from "../Modal/Modal";

function LogInModal() {
  const [showModal, setShowModal] = useState(false);
  // const [demoUser, setDemoUser] = useState(false)
  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LogIn onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
export default LogInModal;
