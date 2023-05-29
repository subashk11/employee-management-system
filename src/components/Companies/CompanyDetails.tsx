import React, { useEffect, useState } from "react";
import { Link, useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/CompanyDetails.css";
import CompanyUsersList from "./CompanyUsersList";
import swal from 'sweetalert';
import CompanyMap from './CompanyMap';


const initialState = {
  companyId: "",
  companyName: "",
  address: "",
  latitude: 0,
  longitude: 0 ,
};

const CompanyDetails = () => {
  const [state, setState] = useState(initialState);
  const [showUsers, setShowUsers] = useState(false); // Track if Users component should be shown
  const { id } = useParams();

  const { companyId, companyName, address, latitude, longitude } = state;

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/companies/get/${id}`).then((resp) => {
      setState({ ...resp.data[0] });
      console.log("This is the response of the data ",resp);
    });
  }, [id]);

  const deleteCompany = (id:string,name:string)=>{
    axios.delete(`http://localhost:5000/companies/deleteCompany/${id}`);
    swal({  
      title: `company deleted : ${name}`,  
      text: "Success",  
      icon: "error",  
    }).then(() => {
      navigate("/companies");
    });
  }
        
  return (
    <div className="company-details-main">
      <div className="buttons-container">
        <Link to={`/companies`}>
          <button>Back</button>
        </Link>
        <Link to={`/companies/addUser/${companyId}`}>
          <button>Add Users</button>
        </Link>
      </div>
      <div className="company-details-container">
        <div className="left-tile">
          <h1>Company Details</h1>
          <Link to={`/companies/editCompany/${companyId}`}>
            <button className="actionbtn-e">
              <i className="fa fa-edit icon-e"></i>
              Edit
            </button>
          </Link>
            <button className="actionbtn-e"  onClick={() => deleteCompany(companyId,companyName)}>
              <i className="fas fa-trash-alt"></i>
              Delete
            </button>
          <div className="company-details">
            <h4>Name     : {companyName}</h4>
            <p><b>Address : </b>{address}</p>
            <p><b>Latitude :</b> {latitude}</p>
            <p><b>Longitude :</b> {longitude}</p>
          </div>
        </div>
        <div className="right-tile">
          <h1>Sample Text</h1>
          <p>This is a sample text in the right tile.</p>
          <CompanyMap  latitude={latitude} longitude={longitude} />
        </div>
      </div>
      <CompanyUsersList companyId={companyId} />
    </div>
  );
};

export default CompanyDetails;
