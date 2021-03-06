import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Shipping = () => {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [toast, setToast] = useState("");

  const handlePhonelBlur = (event) => {
    setPhone(event.target.value);
  };
  const handleNamelBlur = (event) => {
    setName(event.target.value);
  };
  const handleAddressBlur = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (form.checkValidity() === true) {
      setToast(
        <div className="toast show position-absolute top-50 end-0 ">
          <div className="toast-header  border-bottom-0 border-info bg-success text-light fw-bold">
            <div className="d-flex align-items-center justify-content-center">
              <span className="px-4">Shipping Add SuccessFull</span>
            </div>
            <button
              type="button"
              className="btn-close ms-auto btn-close-warning"
              data-bs-dismiss="toast"
            ></button>
          </div>
        </div>
      );
      setTimeout(() => {
        navigate("/inventory");
      }, 2000);
    }
    const information = { phone, name, address };
    console.log(information);

    setValidated(true);
  };
  return (
    <div className="container box-shadow sizing mx-auto border p-4  mt-5 mb-5 position-relative">
      <h2 className="text-center mb-4">Shipping Information</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onBlur={handleNamelBlur}
            className="py-2 shadow-none"
            required
            type="text"
            name="name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a Name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={user?.email}
            disabled
            className="py-2 shadow-none"
            required
            type="email"
            name="Email "
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            onBlur={handleAddressBlur}
            className="py-2 shadow-none"
            required
            type="text"
            name="Address"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your Address
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            onBlur={handlePhonelBlur}
            className="py-2 shadow-none"
            required
            type="tel"
            name="Phone Number"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide your Phone Number
          </Form.Control.Feedback>
        </Form.Group>
        {toast}
        <button
          type="submit "
          className="w-100 rounded-0 login-btn-bg-color py-2 shadow-none"
        >
          Add Shipping
        </button>
      </Form>
    </div>
  );
};

export default Shipping;
