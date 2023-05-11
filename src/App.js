import './App.css';
import Calendar from "./components/Calendar";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/NavBar";
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
     <NavBar/>
     <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="calendar" element={<Calendar/>}/>
     </Routes>
    </div>
  );
}

export default App;
