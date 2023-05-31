import react, { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert'; 

const initialState = {
    firstName: "",
    lastName: "",
    emailId: "",
    dateOfBirth: "",
    designation: "",
    companyId: "",
  };

const EditUser = () => {

    const navigate = useNavigate();

  //This is used to store the current state and next state 
  const [state, setState] = useState(initialState);
  const { firstName, lastName, emailId, dateOfBirth, designation, companyId } =
    state;
    const user = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/get/${user.id}`).then((resp) =>{
             setState({ ...resp.data[0] });
            });
    },[user.id])

  const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };


  //function to handle the changes in the form.

  const handleChanges = () =>{
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

    axios.put(`http://localhost:5000/users/updateProfile/${user.id}`,{
        firstName,
        lastName,
        emailId,
        dateOfBirth,
        designation,
        companyId
    }).then(res =>{
        console.log("profile is updated successfully ",res);
    })

    swal({  
      title: "Updated Successfully",  
      text: "Successfully!",  
      icon: "success",  
    }).then(() => {
      navigate("/users");
    });
    
  }
  return (
    <div className="main">
      <h1>Edit Users !</h1>
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
      <form className="form" onSubmit={handleChanges} action="#">
        <label className="lab">First Name</label>
        <input
          className="input-field"
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleInputChange}
        /><br/>
        <label className="lab">Last Name</label>
        <input
          className="input-field"
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleInputChange}
        /><br/>
        <label className="lab">Email</label>
        <input
          className="input-field"
          type="email"
          id="emailId"
          name="emailId"
          placeholder="Email"
          value={emailId}
          onChange={handleInputChange}
        /><br/>
        <label className="lab">Date of Birth</label>
        <input
          className="input-field"
          type="text"
          id="dateOfBirth"
          name="dateOfBirth"
          placeholder="DOB"
          value={dateOfBirth}
          onChange={handleInputChange}
        /><br/>
        <label className="lab">Designation</label>
        <input
          className="input-field"
          type="text"
          id="designation"
          name="designation"
          placeholder="Designation"
          value={designation}
          onChange={handleInputChange}
        /><br/>
        <input  className="submit-button" type="submit" value="Submit" />
      </form>
    </div>
    </div>
  );
};

export default EditUser;
