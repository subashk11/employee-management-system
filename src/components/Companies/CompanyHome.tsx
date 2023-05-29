import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../styles/CompanyHome.css';

interface form{
    companyId:number,
    companyName:string,
    address:string,
    latitude:number,
    longitude:number
  }

const CompanyHome = () => {
  const [companies, setCompanies] = useState<Array<form>>([]);


  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>Company List</h1>
      <div className="buttons-container">
        <Link to="/">
          <button>
            Home
          <i className="fas fa-home fa-lg"></i>
          </button>
        </Link>
        <Link to="/companies/createCompany">
          <button>
            create
            <i className="fas fa-user-plus fa-lg"></i>
          </button>
        </Link>
        </div>
      <div className="tile-container">
        {companies.map((company) => (
          <Link to={`/companies/companyDetails/${company.companyId}`} key={company.companyId}>
            <div className="tile">
              <h2>{company.companyName}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyHome;