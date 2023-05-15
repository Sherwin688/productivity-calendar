import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css';
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import DateModal from "./DateModal";
import axios from "axios";
import SideBar from "./SideBar";

function Dashboard() {
  const [value, setValue] = useState("");
  const [dateModalIsOpen,setDateModalIsOpen] = useState(false)
  const [tasks,setTasks] = useState([])


  useEffect(() => {
    if (tasks.length > 0) {
      setDateModalIsOpen(true);
    }
  }, [tasks]);


  const findTask = (date)=>{
    axios.post("http://localhost:8000/find",{
      "date":date===""?"":formatDate("en-GB",date)
    }).then((response)=>{
      console.log(response.data.message)

      if(response.data.message==="success"){

        setTasks(response.data.data.tasks)
      }
      else{
        setTasks([])

      }
      setDateModalIsOpen(true)
     

    })
  }
 
  const handleDayClick = (val)=>{
    setValue(val);
    findTask(val)
    
  }


  return (
    <>
    <div className="container-fluid d-flex p-0">
      <div className="sidebar">
        <SideBar/>
      </div>
      <div className="main-content">
        {
        dateModalIsOpen && 
        <DateModal
        date={value}
        datetasks={tasks} 
        dateModalIsOpen={dateModalIsOpen} 
        setDateModalIsOpen={setDateModalIsOpen}/>
        }
        <Calendar value={value} onClickDay={(val)=>handleDayClick(val)}/></div>
    </div>
    </>
  )
}

export default Dashboard