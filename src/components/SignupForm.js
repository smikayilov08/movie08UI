import { useEffect, useState } from "react";
import "../css/SignupForm.css";
import React from "react";
import Modal from "react-modal";
function SignupForm(signUpcheck) {
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [checkModal2, setCheckModal2] = useState(false);
  useEffect(() => {
    if (signUpcheck.ids && checkModal2 === false) {
      setModalIsOpen2(true);
      setCheckModal2(true);
    }
  });
  const sendData = async (e) => {
    e.preventDefault();
    const request = {
      userName: document.getElementById("defaultForm-text").value,
      password: document.getElementById("defaultForm-pass").value,
      email: document.getElementById("defaultForm-email").value,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(request),
    };

    await fetch("http://localhost:8080/signup", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error("User already registered");
        }
        document.getElementById("alert2").style.display = "block";
        document.getElementById("alert1").style.display = "none";
      })
      .catch((err) => {
        console.log(err.message);
        document.getElementById("alert2").style.display = "none";
        document.getElementById("alert1").style.display = "block";
      });
  };
  function closeModal2() {
    setModalIsOpen2(false);
    window.location.reload();
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen2}
        onRequestClose={closeModal2}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.7)" } }}
        appElement={document.getElementById("root")}
        className="modalbody"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content" id="modalcontent">
            <div
              className="alert alert-success text-center"
              role="alert"
              id="alert2"
            >
              You have successfully signed up
            </div>
            <div
              id="alert1"
              className="alert alert-danger font-weight-bold text-center"
              role="alert"
            >
              Username and Email Already existed!
            </div>
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bolder text-light">
                Sign Up
              </h4>

              <button
                type="button"
                className="close btn-close btn-close-white btn-xl"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal2}
              ></button>
            </div>
            <form onSubmit={sendData}>
              <div className="modal-body  mx-5 signup" id="modal-body">
                <div className="md-form mb-4 ">
                  <i className="far fa-envelope text-light ">E-mail</i>
                  <input
                    type="email"
                    id="defaultForm-email"
                    className="form-control validate rounded-pill bg-transparent text-light"
                    required
                  />
                </div>
                <div className="md-form mb-4 ">
                  <i className="fas fa-user text-light ">Username</i>
                  <input
                    type="text"
                    id="defaultForm-text"
                    className="form-control validate rounded-pill bg-transparent text-light"
                    required
                  />
                </div>
                <div className="md-form mb-4 ">
                  <i className="fas fa-lock prefix grey-text text-light ">
                    Password
                  </i>
                  <input
                    type="password"
                    id="defaultForm-pass"
                    className="form-control validate rounded-pill bg-transparent text-light"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success btn-lg rounded-pill"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SignupForm;
