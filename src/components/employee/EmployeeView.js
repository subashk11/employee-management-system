import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaEye, FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const EmployeeView = () => {
    const [employee, setEmployee] = useState([]); // Create a state variable to store the employee data

    useEffect(() => {
        loadEmployees();
    }, []) // Create a useEffect hook to load the employee data when the component is loaded

    const loadEmployees = async () => {
        const response = await axios.get('http://localhost:8080/employees',{
            validateStatus:()=> {
                return true;
            },
        })

        if(response.status === 302){
            setEmployee(response.data) // Set the employee data in the state variable

        }
    } // Create a function to load the employee data

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:8080/employees/delete/${id}`);
    loadEmployees();
  } // Create a function to delete the employee data
  return (
    <div className="container">
      <h1>Employee View</h1>
      <table className="table table-bordered table-hover">
        <thead>
          <tr className="text-center">
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email Id</th>
            <th>Department</th>
            <th colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee &&
            employee.map((emp, index) => (
              <tr key={index} className="text-center">
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  {" "}
                  <Link to={`/edit/${emp.id}`} className="btn btn-warning">
                    <FaPencilAlt /> 
                  </Link>{" "}
                </td>
                <td>
                  {" "}
                  <button className="btn btn-danger" onClick={() => deleteEmployee(emp.id)}>
                    <FaTrash /> 
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeView