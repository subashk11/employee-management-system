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
}

const CompanyUsersList = ({ companyId }: { companyId: string | undefined }) => {
  //Here the data is set to the data variable using the form interface
  const [data, setData] = useState<Array<form>>([]);
  var [status, setStatus] = useState("True" || "False");

  const [
    userId,
    firstName,
    lastName,
    emailId,
    Active,
    designation,
    dateOfBirth,
  ] = data;

  //Method to get the api value from the server.
  const loadData = async () => {
    const responseData = await axios.get(
      `http://localhost:5000/companies/getUsers/${companyId}`
    );
    setData(responseData.data);
  };

  //This method is used to do changes that are not included inside the component.
  useEffect(() => {
    if (companyId) {
      loadData();
    }
  }, [companyId]);

  //update status to Deactive
  const DeactivateUser = (id: string) => {
    axios
      .put(`http://localhost:5000/companies/inActivateUser/${id}`, Active)
      .catch((error) => console.log(error.response.data));
    setStatus((status) => "False");
    setTimeout(() => loadData(), 50);
  };

  //update status to Active
  const ActivateUser = (id: string) => {
    axios
      .put(`http://localhost:5000/companies/activateUser/${id}`, status)

      .catch((error) => console.log(error.response.data));
    setStatus((status) => "True");
    setTimeout(() => loadData(), 50);
  };

  // detele operation
  const removeUser = (id: string, firstName: string) => {
    if (
      window.confirm(`Are you sure that you want to Remove that ${firstName} ?`)
    ) {
      axios.put(`http://localhost:5000/companies/removeUser`,{id}).then((response) => {
        console.log("removed the user ",response);
      });

      setTimeout(() => loadData(), 50);
    }
  };
  return (
    <div className="users-list">
      <table align="center">
        <thead>
          <th>User Id</th>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Email Id</th>
          <th>Active</th>
          <th>Designation</th>
          <th>Date</th>
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
                <td>
                  <Link to={`/users/editUser/${item.userId}`}>
                    <button className="actionbtn-e">
                    <i className='far fa-edit'></i>
                    </button>
                  </Link>
                  <br />
                  
                    <button
                      onClick={() => removeUser(item.userId, item.firstName)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  
                  <br />
                  <button
                    className="btnn btn-deactived"
                    onClick={() => DeactivateUser(item.userId)}
                  >
                    Deactivate
                  </button>
                  <button
                    className="btnn btn-actived"
                    onClick={() => ActivateUser(item.userId)}
                  >
                    Activate
                  </button>
                  <br />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyUsersList;
