
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users/Users';
import Register from './components/Users/Register';
import EditUser from './components/Users/EditUser';
import RegisterCompany from './components/Companies/RegisterCompany';
import CompanyHome from './components/Companies/CompanyHome';
import CompanyDetails from './components/Companies/CompanyDetails';
import AddUserToCompany from './components/Companies/AddUserToCompany';

function App() {
  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/users' element={<Users/>}></Route>
          <Route path='/users/createUser' element={<Register/>}></Route>
          <Route path='/users/editUser/:id' element={<EditUser/>}></Route>
          <Route path='/users/deleteUser/:id' element={<Users/>}></Route>

          <Route path='/companies' element={<CompanyHome/>}></Route>
          <Route path='/companies/createCompany' element={<RegisterCompany/>}></Route>
          <Route path='/companies/editCompany/:id' element={<RegisterCompany/>}></Route>
          <Route path='/companies/companyDetails/:id' element={<CompanyDetails/>}></Route>
          <Route path='/companies/addUser/:id' element={<AddUserToCompany/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
