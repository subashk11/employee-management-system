import react, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/Users.css";

interface form {
  userId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  Active: string;
  designation: string;
  dateOfBirth: string;
  companyId: number;
}

const AddUserToCompany = () => {
  //Here the data is set to the data variable using the form interface
  const [data, setData] = useState<Array<form>>([]);

  const { id } = useParams();
  console.log("param id", id);
  const [
    userId,
    firstName,
    lastName,
    emailId,
    Active,
    designation,
    dateOfBirth,
    companyId,
  ] = data;

  //Method to get the api value from the server.
  const loadData = async () => {
    const responseData = await axios.get(
      `http://localhost:5000/companies/getAllUsers/${id}`
    );
    setData(responseData.data);
  };

  //This method is used to do changes that are not included inside the component.
  useEffect(() => {
    loadData();
  }, [id]);

  // detele operation
  const addUser = (tempId: string, firstName: string) => {
    if (
      window.confirm(`Are you sure that you want to add the ${firstName} ?`)
    ) {
      axios
        .put(`http://localhost:5000/companies/addUser`, {
          id,
          tempId,
        })
        .then((response) => {
          console.log("companyId", id, " userId ", tempId);
          console.log(response);
        });

      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div className="users-list">
      <div className="buttons-container">
        <Link to={`/companies/companyDetails/${id}`}>
          <button>
            <i className="fa fa-chevron-left fa-lg" aria-hidden="true">
              {" "}
              Back
            </i>
          </button>
        </Link>
      </div>
      <table align="center">
        <thead>
          <th>User Id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email Id</th>
          <th>Active</th>
          <th>Designation</th>
          <th>Date</th>
          <th>Company</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              //There should be unique Id that needs to used for mappping the data items
              <tr key={item.userId}>
                <td>{item.userId}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.emailId}</td>
                <td>{item.Active}</td>
                <td>{item.designation}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.companyId}</td>
                <td>
                  <button
                    className="actionbtn-e"
                    onClick={() => addUser(item.userId, item.firstName)}
                  >
                    Add User
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AddUserToCompany;
