
import './App.css';
import Dashboard from "./components/Dashboard";
// import Calendar from "./components/Calendar";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import {Routes,Route} from "react-router-dom"
// require('dotenv').config()

function App() {
  return (
    <div className="App">
     <NavBar/>
     <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="/today" element={<Home/>}/>
     </Routes>
    </div>
  );
}

export default App;
