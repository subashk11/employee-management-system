import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Register.css";
import swal from "sweetalert";

const Register = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    emailId: "",
    dateOfBirth: "",
    designation: "",
    companyId: "0",
  };

  const [state, setState] = useState(initialState);
  const { firstName, lastName, emailId, dateOfBirth, designation, companyId } = state;

  const navigate = useNavigate();

  const [errors, setErrors] = useState({ email: "" }); // Initialize the email error message

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form fields
    if (!firstName || !lastName || !emailId || !dateOfBirth || !designation) {
      swal({
        title: "Error",
        text: "All fields are required. Please fill in all the fields.",
        icon: "error",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      setErrors({ email: "Invalid email format. Please enter a valid email address." });
      return;
    }

    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (!dateRegex.test(dateOfBirth)) {
      swal({
        title: "Error",
        text: "Invalid date format. Please enter the date in YYYY/MM/DD format.",
        icon: "error",
      });
      return;
    }

    axios
      .post("http://localhost:5000/users/createUser", {
        firstName,
        lastName,
        emailId,
        dateOfBirth,
        designation,
        companyId,
      })
      .then((response) => {
        if (response.data) {
          console.log("resdata", response.data);
        }

        setState(initialState); // Reset the form fields
        setErrors({ email: "" }); // Reset the email error message
        swal({
          title: "User created",
          text: "Successfully!",
          icon: "success",
        }).then(() => {
          navigate("/users");
        });
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        swal({
          title: "Error",
          text: "An error occurred while creating the user. Please try again later.",
          icon: "error",
        });
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setErrors({ ...errors, email: "" }); // Reset the email error message on input change
  };

  return (
    <div className="main">
      <h1>Create New User!</h1>
      <div className="buttons-container">
          <Link to="/users">
            <button className="back-button">
            <i className="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
            {"   "}
              Back
            </button>
          </Link>
        </div>
      <div className="register-user">
        <form className="form" onSubmit={handleSubmit}>
          <label className="lab">First Name</label>
          <input
            className="input-field"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleInputChange}
          />
          <br />
          <label className="lab">Last Name</label>
          <input
            className="input-field"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleInputChange}
          />
          <br />
          <label className="lab">Email</label>
          <input
            className="input-field"
            type="text"
            id="emailId"
            name="emailId"
            placeholder="Email"
            value={emailId}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>} {/* Display email error */}
          <br />
          <label className="lab">Date of Birth</label>
          <input
            className="input-field"
            type="text"
            id="dateOfBirth"
            name="dateOfBirth"
            placeholder="DOB (YYYY/MM/DD)"
            value={dateOfBirth}
            onChange={handleInputChange}
          />
          <br />
          <label className="lab">Designation</label>
          <input
            className="input-field"
            type="text"
            id="designation"
            name="designation"
            placeholder="Designation"
            value={designation}
            onChange={handleInputChange}
          />
          <br />
          <input className="submit-button" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Register;
