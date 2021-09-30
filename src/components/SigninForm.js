import "../css/SigninForm.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
function SigninForm(check) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkModal, setCheckModal] = useState(false);
  useEffect(() => {
    if (check.id && checkModal === false) {
      setModalIsOpen(true);
      setCheckModal(true);
    }
  });
  const getUser = async () => {
    const request = {
      name: document.getElementById("defaultForm-email").value,
      password: document.getElementById("defaultForm-pass").value,
    };
    const requestOptions = {
      method: "Post",
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
      body: JSON.stringify(request),
    };
    await fetch("http://localhost:8080/login", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error("User Not Found");
        }
        response.json().then((result) => {
          localStorage.setItem("token", result.jwt);
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err.message);
        document.getElementById("alert").style.display = "block";
      });
  };
  function closeModal() {
    setModalIsOpen(false);
    window.location.reload();
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{ overlay: { background: "rgba(0, 0, 0, 0.7)" } }}
        appElement={document.getElementById("root")}
        className="modalbody"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div
              id="alert"
              className="alert alert-danger font-weight-bold text-center"
              role="alert"
            >
              User Not Found!
            </div>
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bolder text-light">
                Sign in
              </h4>

              <button
                type="button"
                className="close btn-close btn-close-white btn-xl"
                data-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body  mx-5 signin">
              <div className="md-form mb-5 ">
                <i className="fas fa-user text-light ">Username</i>
                <input
                  type="email"
                  id="defaultForm-email"
                  className="form-control validate rounded-pill bg-transparent text-light"
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
                />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-success btn-lg rounded-pill"
                onClick={getUser}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default SigninForm;
