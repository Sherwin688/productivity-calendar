import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css';
import DateModal from "./DateModal";
import axios from "axios";
import SideBar from "./SideBar";
// const BASE_URL = process.env.REACT_APP_BASE_URL
import {BASE_URL} from "../services/helper"

function Home() {
  const [date, setDate] = useState(new Date());
  const todaysDate = new Date()
  const [dateModalIsOpen,setDateModalIsOpen] = useState(false)
  const [tasks,setTasks] = useState([])
  const [todaysTasks,setTodaysTasks] = useState([])
  const [progress,setProgress] = useState()
  const [spinner, setSpinner] = useState(false);    

  
  

useEffect(()=>{
  setSpinner(true)
  getProgressBarPercentage(todaysTasks)
  setSpinner(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
},[todaysTasks])
useEffect(() => {
  setSpinner(true)
  
  axios.post(`${BASE_URL}/find`,
  {
    "date":new Date(date).setHours(0,0,0,0)
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
  setSpinner(false)
  setDateModalIsOpen(true)
    
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


const handleEdit = (date,id,value,taskType="normal")=>{
  setSpinner(true)

  if(taskType==="todays"){
    axios.put(`${BASE_URL}/update`,{
    "date":new Date(date).setHours(0,0,0,0)===""?"":new Date(date).setHours(0,0,0,0),
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
  setSpinner(false)

  })
  }
  else{
    axios.put(`${BASE_URL}/update`,{
      "date":new Date(date).setHours(0,0,0,0)===""?"":new Date(date).setHours(0,0,0,0),
      "tasks":tasks.map((task)=>{
        if(task.id===id){
          task.task=value
        }
        return task
      })
    }).then((response)=>{
      if(response.data.message==="success")
      {
       
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
         setTodaysTasks(response.data.data.tasks)
        }
        setTasks(response.data.data.tasks)
  
      }
      else
      setTasks([])
      setDateModalIsOpen(true)
  setSpinner(false)
      
  })
}
}
const deleteTask = (date,id,taskType="normal")=>{
  setSpinner(true)

  if(taskType==="todays"){
    axios.put(`${BASE_URL}/update`,{
    "date":new Date(date).setHours(0,0,0,0)===""?"":new Date(date).setHours(0,0,0,0),
    "tasks":todaysTasks.filter((task)=>id!==task.id)
  }).then((response)=>{
    if(response.data.message==="success")
    {
      setTodaysTasks(response.data.data.tasks)

    }
    else
      setTasks([])

  setSpinner(false)

    // setDateModalIsOpen(true)
  })
  }
  else{
    
    axios.put(`${BASE_URL}/update`,{
      "date":new Date(date).setHours(0,0,0,0)===""?"":new Date(date).setHours(0,0,0,0),
      "tasks":tasks.filter((task)=>id!==task.id)
    }).then((response)=>{
      if(response.data.message==="success")
      {
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){

         setTodaysTasks(response.data.data.tasks)
        }
        setTasks(response.data.data.tasks)
  
      }
      else
      setTasks([])
      setDateModalIsOpen(true)
  setSpinner(false)

  })
}
}

const getProgressBarPercentage = (t=tasks)=>{
  setSpinner(true)

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

    axios.put(`${BASE_URL}/update`,{
      "date":new Date(date).setHours(0,0,0,0),
      "tasks":[...tasks,{"id":currentTaskId,"task":value,status:"incomplete","taskType":"additional"}]
    }).then((response)=>{
      setTasks(response.data.data.tasks)

      if(date.getDate()===new Date().getDate()){
        setTodaysTasks(response.data.data.tasks)
      }
  setSpinner(false)

    })
  }
const findTask = (dateClicked)=>{
  setSpinner(true)

    axios.post(`${BASE_URL}/find`,{
      "date":dateClicked===""?"":dateClicked
    }).then((response)=>{
      if(response.data.message==="success")
      {
        setTasks(response.data.data.tasks)
        setDateModalIsOpen(true)

      }
      else
        setTasks([])
      setSpinner(false)
      setDateModalIsOpen(true)

    })
  }
 
const handleDayClick = (dateClicked)=>{
    setDate(dateClicked);
    findTask(dateClicked)
    
  }

const updateTask = (date,taskType="normal")=>{
  setSpinner(true)

    if(taskType==="todays")
    {
      axios.put(`${BASE_URL}/update`,{
        "date":new Date(date).setHours(0,0,0,0),
        "tasks":todaysTasks
      }).then((response)=>{
         setTodaysTasks(response.data.data.tasks)
         if(todaysDate===date){
         setTasks(response.data.data.tasks)
        }
  setSpinner(false)

      })
    }
    else{
      axios.put(`${BASE_URL}/update`,{
      "date":new Date(date).setHours(0,0,0,0)===""?"":new Date(date).setHours(0,0,0,0),
      "tasks":tasks
    }).then((response)=>{
      if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
       setTodaysTasks(response.data.data.tasks)
      }
     setTasks(response.data.data.tasks)
  setSpinner(false)

    })
    }
    
  }

 const handleAddDailyTaskClick = (date,taskName)=>{
  setSpinner(true)

  const currentTaskId = (todaysTasks.length<1)?1:parseInt(todaysTasks[todaysTasks.length-1].id)+1
    axios.post(`${BASE_URL}/addDailyTask`,{
      "date":date===""?"":new Date(date).setHours(0,0,0,0),
    "task": {"id":currentTaskId,"task":taskName,taskType:"daily",status:"incomplete"}
  }).then((response)=>{
    setTodaysTasks([...todaysTasks,response.data.data])
  setSpinner(false)
   
  })
}


const handleDelete=(id,taskType="normal")=>{
  setSpinner(true)

    if(taskType==="todays"){
      setTodaysTasks(todaysTasks.filter((task)=>task.id!==id))
      const today = new Date()
 deleteTask(today,id,"todays")
 setSpinner(false)

    }
  
else{
  setTasks(tasks.filter((task)=>task.id!==id))
   deleteTask(date,id)
   setSpinner(false)

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

    const handleDailyEdit = (id,value,taskType)=>{
  setSpinner(true)

       todaysTasks.map((task)=>{
        if(task.id===id){
          task.task = value
        }
        return task
      })
      if(taskType==="todays")
        {
          axios.put(`${BASE_URL}/updateDailyTask`,
          {
            "date":new Date().setHours(0,0,0,0),
            "tasks":todaysTasks.filter((task)=>task.taskType==="daily")
            }
          ).then((response)=>{
            setTodaysTasks(todaysTasks.map((task)=>{
              if(task.id===id){
                task.task = value
              }
              return task
            }))
            if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
             setTasks(tasks.map((task)=>{
              if(task.id===id){
                task.task = value
              }
              return task
            }))
            }
  setSpinner(false)

          })
        }
        else{
          axios.put(`${BASE_URL}/updateDailyTask`,
          {
            "tasks":todaysTasks.filter((task)=>task.taskType==="daily")}
          ).then((response)=>{
            setTasks(tasks.map((task)=>{
              if(task.id===id){
                task.task = value
              }
              return task
            }))
            if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
              setTodaysTasks(todaysTasks.map((task)=>{
                if(task.id===id){
                  task.task = value
                }
                return task
              }))
            }
  setSpinner(false)

          })
        }
        
      
    }
const handleDailyDelete = (id,taskType)=>{
  setSpinner(true)

  if(taskType==="todays")
    {
      axios.put(`${BASE_URL}/removeDailyTask`,
      {
        "date":new Date().setHours(0,0,0,0),
          "tasks":todaysTasks.filter((task)=>{
         if(task.id!==id && task.taskType!=="additional"){
          return true
          }
          else
          return false
      })}
      ).then((response)=>{
     
        setTodaysTasks(todaysTasks.filter((task)=>task.id!==id))
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
         setTasks(tasks.filter((task)=>task.id!==id))
        }
  setSpinner(false)

      })
    }
    else{
      axios.put(`${BASE_URL}/removeDailyTask`,
      {
        "tasks":tasks.filter((task)=>{
       if(task.id!==id && task.taskType!=="additional"){
        return true
        }
        else{
          return false
        }
    })}
      ).then((response)=>{
        setTasks(tasks.filter((task)=>task.id!==id))
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
          setTodaysTasks(todaysTasks.filter((task)=>task.id!==id))
        }
  setSpinner(false)

      })
    }
    
  
}
  return (
    
   
    <>
     {spinner?<div className="loader-container">
      <div className="spinner"></div>
    </div>:
    <div className="container-fluid d-flex p-0">
      <div className="sidebar">
        <SideBar
        spinner={spinner}
        findTask={findTask}
        tasks={tasks}
        dateModalIsOpen={dateModalIsOpen}
        addAdditionalTask={addAdditionalTask}
        handleDailyEdit={handleDailyEdit}
        handleDailyDelete={handleDailyDelete}
        handleAddDailyTaskClick={handleAddDailyTaskClick}
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
        spinner={spinner}
        handleDailyDelete={handleDailyDelete}
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
    </div>}
    </>
  )
}

export default Home