import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const initialState = {
  companyName: "",
  address: "",
  latitude: "",
  longitude: "",
};

const RegisterCompany = () => {
  const apiKey = "9de26b6e2a664d209cf8704ea3fb45cd";
  const [state, setState] = useState(initialState);

  const { companyName, address, latitude, longitude } = state;

  const navigate = useNavigate();

  const {id}= useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit button is clicked!");
    const { latitude, longitude } = await geocodeAddress(address);
    console.log("This is the address: ", address);
    if (latitude && longitude) {
      if (id) {
        axios
          .put(`http://localhost:5000/companies/editCompany/${id}`, {
            companyName,
            address,
            latitude,
            longitude,
          })
          .then((response) => {
            if (response.data) {
              console.log("resdata after updating the values", response.data);
            }
            setState(initialState);
            navigate(`/companies/companyDetails/${id}`);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      } else {
        axios
          .post("http://localhost:5000/companies/createCompany", {
            companyName,
            address,
            latitude,
            longitude,
          })
          .then((response) => {
            if (response.data) {
              console.log("resdata after creating a company", response.data);
            }
            setState(initialState);
            navigate(`/companies`);
          })
          .catch((error) => {
            console.error("An error occurred:", error);
          });
      }
    }
  };

  // This api call gives the latitude and longitude of the provided address.
  const geocodeAddress = async (address: string) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${
          address
        }&key=${apiKey}`
      );
      const { results } = response.data;
      console.log("This is result ", results[0].geometry.lat);
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        console.log('lat and log result ',lat,lng);
        console.log('example result ',`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          address
        )}&key=${apiKey}`);
        return { latitude: lat, longitude: lng };
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    return {};
  };

  // Function to handle the input changes in the form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("These are the lat and long values =", latitude, longitude);
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //function to set the details of the user if this is to edit the user.
  useEffect(()=>{
    console.log("useState is executed ! ",id);
    if(id){
        axios.get(`http://localhost:5000/companies/get/${id}`).then((res)=>{
            const data = res.data;
            console.log(data);
            setState({ ...res.data[0] });
        });
    }
  },[id])

  return (
    <div>
      <h1>This is the RegisterCompany page</h1>
      <Link to={`/companies/companyDetails/${id}`}>
        <button>
           Back to List
          <i className="fas fa-home fa-lg"></i>
        </button>
      </Link>
      <div className="register-user">
      <form className="form" onSubmit={handleSubmit} action="#">
        <label className="lab">Company Name</label>
        <input
          className="input-field"
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Company Name"
          value={companyName}
          onChange={handleInputChange}
        />
        <br />
        <label className="lab">Address</label>
        <input
          className="input-field"
          type="textArea"
          id="address"
          name="address"
          placeholder="Address"
          value={address}
          onChange={handleInputChange}
        />
        <input className="submit-button" type="submit" value="Submit" />
      </form>
      </div>
    </div>
  );
};

export default RegisterCompany;
