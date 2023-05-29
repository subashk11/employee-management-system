import react from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import office from "../Resources/office-building.png";
import users from "../Resources/man.png";

const Home = () => {
  return (
    <div className="home-container">
      <h4 className="home-title">Click Here to View Details</h4>
      <Link to="/users">
        <button className="button">
          <img src={users} alt="users" className="button-icon" />
          Users
        </button>
      </Link>
      <Link to="/companies">
        <button className="button">
          <img src={office} alt="Companies" className="button-icon" />
          Companies
        </button>
      </Link>
    </div>
  );
};

export default Home;
