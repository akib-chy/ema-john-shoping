import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../../images/google.svg";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const SignUp = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [siteError, setSiteError] = useState("");
  const [updateProfile] = useUpdateProfile(auth);
  const [signInWithGoogle, googleUsers, googleError, googleLoading] =
    useSignInWithGoogle(auth);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const navigate = useNavigate();
  const handleNameBlur = (event) => {
    setName(event.target.value);
  };
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordBluer = (event) => {
    setConfirmPassword(event.target.value);
  };

  if (user || googleUsers) {
    setTimeout(() => {
      navigate("/shop");
    }, 2000);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (password !== confirmPassword) {
      setSiteError("opps Password Not Match");
      return;
    }

    setSiteError("");
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
  };
  const handleSingInGoogle = () => {
    signInWithGoogle();
  };

  return (
    <div className="container box-shadow sizing mx-auto border p-4  mt-5 mb-5 position-relative">
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onBlur={handleNameBlur}
            className="py-2 shadow-none"
            required
            type="text"
            name="Name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your Full Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            className="py-2 shadow-none"
            required
            type="email"
          />
          <div className="position-relative">
            {(user || googleUsers) && (
              <div className="toast show position-absolute top-50 end-0 ">
                <div className="toast-header  border-bottom-0 border-info bg-danger text-light fw-bold">
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="px-4">
                      Please Check Your Email Address And Verified Your Email
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-close ms-auto btn-close-warning"
                    data-bs-dismiss="toast"
                  ></button>
                </div>
              </div>
            )}
          </div>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid a valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            className="py-2 shadow-none"
            required
            type="password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your password
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onBlur={handleConfirmPasswordBluer}
            className="py-2 shadow-none"
            required
            type="password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your Confirm Password
          </Form.Control.Feedback>
        </Form.Group>
        <p className="text-danger fw-bold">{siteError}</p>
        <p className="text-danger fw-bold">{error?.message}</p>
        <p className="text-danger fw-bold">{googleError?.message}</p>

        {(user || googleUsers) && (
          <div className="toast show position-absolute top-50 end-0 ">
            <div className="toast-header  border-bottom-0 border-info bg-success text-light fw-bold">
              <div className="d-flex align-items-center justify-content-center">
                <span className="px-4">Create Account SuccessFull</span>
              </div>
              <button
                type="button"
                className="btn-close ms-auto btn-close-warning"
                data-bs-dismiss="toast"
              ></button>
            </div>
          </div>
        )}
        {loading || (googleLoading && <p>Loading....</p>)}
        <button
          type="submit "
          className="w-100 rounded-0 login-btn-bg-color py-2 shadow-none"
        >
          Sign Up
        </button>

        <p className="text-center mt-1">
          Already have an account<span className="mx-1">?</span>
          <Link to="/login" className=" text-decoration-none text-warning">
            Login
          </Link>
        </p>
        <div className="content mt-4 mb-4">
          <p className="or">or</p>
        </div>
        <button
          onClick={handleSingInGoogle}
          className="btn w-100 border border-secondary py-3 mb-3 shadow-none"
        >
          <img className="img-fluid me-2" src={googleLogo} alt="" /> Continue
          with Google
        </button>
      </Form>
    </div>
  );
};

export default SignUp;
