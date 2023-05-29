import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css';
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import DateModal from "./DateModal";
import axios from "axios";
import SideBar from "./SideBar";

function Home() {
  const [date, setDate] = useState(new Date());
  const todaysDate = formatDate("en-GB",new Date())
  const [dateModalIsOpen,setDateModalIsOpen] = useState(false)
  const [tasks,setTasks] = useState([])
  const [todaysTasks,setTodaysTasks] = useState([])
  const [progress,setProgress] = useState()
  
  

useEffect(()=>{
  getProgressBarPercentage(todaysTasks)
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[todaysTasks])
useEffect(() => {
  axios.post("http://localhost:8000/find",
  {
    "date":formatDate("en-GB",date)
  }
  ).then((response)=>
  {
    if(response.data.message==="success")
    {
      setTasks(response.data.data.tasks)
      setTodaysTasks(response.data.data.tasks)
      getProgressBarPercentage(response.data.data.tasks)
    }
      

    else
      setTasks([])
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

const handleEdit = (date,id,value,taskType="normal")=>{
  console.log(date)
  if(taskType==="todays"){
    axios.put("http://localhost:8000/update",{
    "date":date===""?"":formatDate("en-GB",date),
    "tasks":todaysTasks.map((task)=>{
      if(task.id===id){
        task.task = value
      }
      return task
    })
  }).then((response)=>{
    if(response.data.message==="success")
    {
      setTodaysTasks(response.data.data.tasks)

    }
    else
      setTasks([])
  })
  }
  else{
    axios.put("http://localhost:8000/update",{
      "date":date===""?"":formatDate("en-GB",date),
      "tasks":tasks.map((task)=>{
        if(task.id===id){
          task.task=value
        }
        return task
      })
    }).then((response)=>{
      if(response.data.message==="success")
      {
        if(todaysDate===formatDate("en-GB",date)){
          console.log("worked")
         setTodaysTasks(response.data.data.tasks)
        }
        setTasks(response.data.data.tasks)
  
      }
      else
      setTasks([])
      setDateModalIsOpen(true)
  })
}
}
const deleteTask = (date,id,taskType="normal")=>{
  if(taskType==="todays"){
    axios.put("http://localhost:8000/update",{
    "date":date===""?"":formatDate("en-GB",date),
    "tasks":todaysTasks.filter((task)=>id!==task.id)
  }).then((response)=>{
    if(response.data.message==="success")
    {
      setTodaysTasks(response.data.data.tasks)

    }
    else
      setTasks([])
    setDateModalIsOpen(true)
  })
  }
  else{
    axios.put("http://localhost:8000/update",{
      "date":date===""?"":formatDate("en-GB",date),
      "tasks":tasks.filter((task)=>id!==task.id)
    }).then((response)=>{
      if(response.data.message==="success")
      {
        if(todaysDate===formatDate("en-GB",date)){
          console.log("worked")
         setTodaysTasks(response.data.data.tasks)
        }
        setTasks(response.data.data.tasks)
  
      }
      else
      setTasks([])
      setDateModalIsOpen(true)
  })
}
}

const getProgressBarPercentage = (t=tasks)=>{
    let count = 0;
    t.forEach(task => {
      if(task.status==="complete")
      count++;
    });
    let progressBarPercentage = parseFloat((count/(t.length))*100)
    setProgress(progressBarPercentage)
  }
  const addAdditionalTask = (date,value)=>{
    const currentTaskId = (tasks.length<1)?1:parseInt(tasks[tasks.length-1].id)+1

    axios.put("http://localhost:8000/update",{
      "date":date==="" ? "" : formatDate("en-GB",date),
      "tasks":[...tasks,{"id":currentTaskId,"task":value,status:"incomplete","taskType":"additional"}]
    }).then((response)=>{
      console.log(response);
      setTasks(response.data.data.tasks)

      if(date.getDate()===new Date().getDate()){
        setTodaysTasks(response.data.data.tasks)
      }
    })
  }
const findTask = (dateClicked)=>{
    axios.post("http://localhost:8000/find",{
      "date":dateClicked===""?"":formatDate("en-GB",dateClicked)
    }).then((response)=>{
      if(response.data.message==="success")
      {
        setTasks(response.data.data.tasks)

      }
      else
        setTasks([])
      setDateModalIsOpen(true)
    })
  }
 
const handleDayClick = (dateClicked)=>{
    setDate(dateClicked);
    findTask(dateClicked)
    
  }

const updateTask = (date,taskType="normal")=>{
    if(taskType==="todays")
    {
      axios.put("http://localhost:8000/update",{
        "date":formatDate("en-GB",new Date()),
        "tasks":todaysTasks
      }).then((response)=>{
         setTodaysTasks(response.data.data.tasks)
         if(todaysDate===formatDate("en-GB",date)){
          console.log("worked date")
         setTasks(response.data.data.tasks)
        }
      })
    }
    else{
      axios.put("http://localhost:8000/update",{
      "date":date===""?"":formatDate("en-GB",date),
      "tasks":tasks
    }).then((response)=>{
      if(todaysDate===formatDate("en-GB",date)){
        console.log(response)
       setTodaysTasks(response.data.data.tasks)
      }
     setTasks(response.data.data.tasks)
    })
    }
    
  }




const handleDelete=(id,taskType="normal")=>{
    if(taskType==="todays"){
      console.log(id)
      setTodaysTasks(todaysTasks.filter((task)=>task.id!==id))
      const today = new Date()
 deleteTask(today,id,"todays")

    }
  
else{
  setTasks(tasks.filter((task)=>task.id!==id))
   deleteTask(date,id)

}

}
const handleCheckboxChange = (id,e,taskType)=>{
     
    if(taskType==="todays"){
      setTodaysTasks(todaysTasks.map((task)=>{
       
        if(task.id===id){
          if(e.target.checked){
            task.status="complete"
          }
          else{
            task.status="incomplete"
          }
        }
        return task
      }))
      const today = new Date()
  updateTask(today,"todays")

    }
  
else{
  setTasks(tasks.map((task)=>{
       
    if(task.id===id){
      if(e.target.checked){
        task.status="complete"
      }
      else{
        task.status="incomplete"
      }
    }
    return task
  }))
  updateTask(date)

}
      
   
      
     
    }

  return (
    <>
    <div className="container-fluid d-flex p-0">
      <div className="sidebar">
        <SideBar
        date={date}
        setDateModalIsOpen={setDateModalIsOpen}
        progress={progress}
        handleCheckboxChange={handleCheckboxChange}
        datetasks={todaysTasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        />
      </div>
      <div className="main-content">
        {
        dateModalIsOpen && 
        <DateModal
        findTask={findTask}
        addAdditionalTask={addAdditionalTask}
        handleCheckboxChange={handleCheckboxChange}
        date={date}
        datetasks={tasks} 
        dateModalIsOpen={dateModalIsOpen}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        setDateModalIsOpen={setDateModalIsOpen}/>
        
        }
        <Calendar showNeighboringMonth={false} value={date} onClickDay={(val)=>handleDayClick(val)}/></div>
    </div>
    </>
  )
}

export default Home