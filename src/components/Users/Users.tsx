import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../styles/Users.css';
import swal from 'sweetalert'; 
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

const Users = () => {
  //Here the data is set to the data variable using the form interface
  const [data, setData] = useState<Array<form>>([]);

  //Method to get the api value from the server.
  const loadData = async () => {
    try {
      const responseData = await axios.get("http://localhost:5000/users");
      setData(responseData.data);
    } catch (error) {
      // You can show an error swal or perform any other error handling actions here
      swal({
        title: "Error",
        text: "An error occurred while loading data. Please try again later.",
        icon: "error",
      });
    }
  };

  //This method is used to do changes that are not included inside the component.
  useEffect(() => {
    loadData();
  }, []);

    // detele operation
    const deleteUser = (id: string,firstName:string) => {
      if (window.confirm(`Are you sure that you want to delete that ${firstName} ?`)) {
        axios.delete(`http://localhost:5000/users/deleteUser/${id}`);
        swal({  
          title: `Account deleted : ${firstName}`,  
          text: "Success",  
          icon: "error",  
        })
        setTimeout(() => loadData(), 500);
      }
    };
  return (
    <div className="users-list">
      <div className="buttons-container">
      <Link to="/">
          <button>
            Home
         <i className=" fas fa-home fa-lg"></i>
          </button>
        </Link>
        <Link to="/users/createUser">
        <button>
          create
          <i className="fas fa-user-plus fa-lg"></i>
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
                  <Link to={`/users/editUser/${item.userId}`}>
                    <button className="actionbtn-e">
                      <i className="fa fa-edit icon-e"></i>
                    </button>
                  </Link>
                  <br />
                  <Link to={`/users/deleteUser/${item.userId}`}>
                    <button
                      onClick={() => deleteUser(item.userId, item.firstName)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </Link>
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

export default Users;
