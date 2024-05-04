import SignUp from "./SignUp";
import React, { useState } from "react";
import { Modal } from "../Modal/Modal";

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);
  // const [demoUser, setDemoUser] = useState(false)
  return (
    <>
      <button onClick={() => setShowModal(true)}>Sign Up</button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUp onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}
export default SignUpModal;
