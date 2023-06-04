
import { useEffect } from "react";
import './App.css';
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import {Routes,Route} from "react-router-dom"

function App() {
  

  useEffect(() => {
    document.title = 'Productivity Calendar';
  }, []);

  return (
    <div className="App">
     <NavBar/>
     <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="/today" element={<Home/>}/>
      <Route path="*" element={<Dashboard/>}/>
     </Routes>
    </div>
  );
}

export default App;
