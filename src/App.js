import './App.css';
import EmployeeView from './components/employee/EmployeeView';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar from './components/common/Navbar.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './components/common/HomeView';
import CreateEmployee from './components/employee/CreateEmployee';
import EditEmployee from './components/employee/EditEmployee';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element = {<HomeView/>} />
          <Route path="/view" element={<EmployeeView/>} />
          <Route path="/create" element={<CreateEmployee/>} />
          <Route path="/edit/:id" element={<EditEmployee/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
