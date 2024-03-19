import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: ""
    }); // Create a state variable to store the employee data

    const { firstName, lastName, email, department } = employee;
    const { id } = useParams();

    const navigate = useNavigate();
    //get the id from the url
    useEffect(() => {
        loadEmployee();
    }, []) // Create a useEffect hook to load the employee data when the component is loaded

    const loadEmployee = async () => {
        const response = await axios.get(`http://localhost:8080/employees/employee/${id}`);
        setEmployee(response.data) // Set the employee data in the state variable
    } // Create a function to load the employee data

    const saveEmployee = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    const editEmployee = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/employees/update/${id}`, employee);
        navigate('/view');
    }
  return (
    <div className="d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-header">
          <h1>Create Employee</h1>
        </div>
        <div className="card-body py-5">
          <form>
            <div className="form-group py-3">
              <label>First Name</label>
              <input type="text" className="form-control" placeholder="Enter First Name" value={firstName} name='firstName' onChange={(e) =>saveEmployee(e)}/>
            </div>
            <div className="form-group py-3">
              <label>Last Name</label>
              <input type="text" className="form-control" placeholder="Enter Last Name" value={lastName} name='lastName' onChange={(e) =>saveEmployee(e)}/>
            </div>
            <div className="form-group py-3">
              <label>Email</label>
              <input type="email" className="form-control" placeholder="Enter Email" value={email} name='email' onChange={(e) =>saveEmployee(e)}/>
            </div>
            <div className="form-group py-3">
              <label>Department</label>
              <input type="text" className="form-control" placeholder="Enter Department" value={department} name='department' onChange={(e) =>saveEmployee(e)}/>
            </div>
           <div className='d-flex justify-content-between'> 
              <button type="submit" className="btn btn-primary" onClick={(e) => editEmployee(e)}>
              Create Employee
              </button>
              <Link to='/view' type="submit" className="btn btn-warning">
              Cancel
              </Link>
           </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee