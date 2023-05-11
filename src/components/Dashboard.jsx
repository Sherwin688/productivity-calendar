import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css';
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import DateModal from "./DateModal";
import datetasks from "../dateTasks";

function Dashboard() {
  const [value, setValue] = useState(new Date());
  const [dateModalIsOpen,setDateModalIsOpen] = useState(false)
  const [tasks,setTasks] = useState([])


  const handleDayClick = (val)=>{
    let date = formatDate("ne",val)
    setValue(date);
    setTasks(datetasks.filter(datetask=> datetask.date===date)[0])
    setDateModalIsOpen(true)
    
  }

  return (
    <>
    <div className="container-fluid d-flex p-0">
      <div className="sidebar">test2</div>
      <div className="main-content">
        {
        dateModalIsOpen && 
        <DateModal datetasks={tasks} 
        dateModalIsOpen={dateModalIsOpen} 
        setDateModalIsOpen={setDateModalIsOpen}/>
        }
        <Calendar value={value} onClickDay={handleDayClick}/></div>
    </div>
    </>
  )
}

export default Dashboard