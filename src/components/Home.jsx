import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css';
import DateModal from "./DateModal";
import axios from "axios";
import SideBar from "./SideBar";

function Home() {
  const [date, setDate] = useState(new Date());
  const todaysDate = new Date()
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
    "date":date
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
    "date":date===""?"":date,
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
      "date":date===""?"":date,
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
    "date":date===""?"":new Date(),
    "tasks":todaysTasks.filter((task)=>id!==task.id)
  }).then((response)=>{
    if(response.data.message==="success")
    {
      setTodaysTasks(response.data.data.tasks)

    }
    else
      setTasks([])
    // setDateModalIsOpen(true)
  })
  }
  else{
    axios.put("http://localhost:8000/update",{
      "date":date===""?"":date,
      "tasks":tasks.filter((task)=>id!==task.id)
    }).then((response)=>{
      if(response.data.message==="success")
      {
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){

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
      "date":date,
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

  console.log(dateClicked);
    axios.post("http://localhost:8000/find",{
      "date":dateClicked===""?"":dateClicked
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
        "date":new Date(),
        "tasks":todaysTasks
      }).then((response)=>{
         setTodaysTasks(response.data.data.tasks)
         if(todaysDate===date){
          console.log("worked date")
         setTasks(response.data.data.tasks)
        }
      })
    }
    else{
      axios.put("http://localhost:8000/update",{
      "date":date===""?"":date,
      "tasks":tasks
    }).then((response)=>{
      if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
        console.log(response)
       setTodaysTasks(response.data.data.tasks)
      }
     setTasks(response.data.data.tasks)
    })
    }
    
  }

 const handleAddDailyTaskClick = (date,taskName)=>{
  const currentTaskId = (todaysTasks.length<1)?1:parseInt(todaysTasks[todaysTasks.length-1].id)+1
    axios.post("http://localhost:8000/addDailyTask",{
      "date":date===""?"":date,
    "task": {"id":currentTaskId,"task":taskName,taskType:"daily",status:"incomplete"}
  }).then((response)=>{
    console.log(response)
    setTodaysTasks([...todaysTasks,response.data.data])
   
  })
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
const handleDailyDelete = (id,taskType)=>{
  console.log(id);
  console.log(taskType);
  if(taskType==="todays")
    {
      axios.put("http://localhost:8000/removeDailyTask",
      {
          "tasks":todaysTasks.filter((task)=>{
         if(task.id!==id && task.taskType!=="additional"){
          return task
          }
      })}
      ).then((response)=>{
        console.log(response)
        setTodaysTasks(todaysTasks.filter((task)=>task.id!==id))
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
          // console.log("worked date")
         setTasks(tasks.filter((task)=>task.id!==id))
        }
      })
    }
    else{
      axios.put("http://localhost:8000/removeDailyTask",
      {
        "tasks":tasks.filter((task)=>{
       if(task.id!==id && task.taskType!=="additional"){
        return task
        }
    })}
      ).then((response)=>{
        setTasks(tasks.filter((task)=>task.id!==id))
        if(todaysDate.toLocaleDateString()===date.toLocaleDateString()){
          setTodaysTasks(todaysTasks.filter((task)=>task.id!==id))
        }
      })
    }
    
  
}
  return (
    <>
    <div className="container-fluid d-flex p-0">
      <div className="sidebar">
        <SideBar
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
    </div>
    </>
  )
}

export default Home