import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Task from "./Task";
import axios from "axios";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DateModal({dateModalIsOpen,setDateModalIsOpen,datetasks,date}) {
  const [tasks,setTasks] = useState(datetasks)
  const [value,setValue] = useState("")
  const [addModalIsOpen,setAddModalIsOpen] = useState(false)

  const addAdditionalTask = (date,datetasks,e)=>{
    const currentTaskId = (datetasks.length<1)?1:parseInt(datetasks[datetasks.length-1].id)+1

    axios.put("http://localhost:8000/update",{
      "date":date===""?"":formatDate("en-GB",date),
      "tasks":[...datetasks,{"id":currentTaskId,"task":value,status:"incomplete","taskType":"additional"}]
    }).then((response)=>{
      console.log(response);
      setValue("")
      setTasks(response.data.data.tasks)
      setAddModalIsOpen(false)
    })
  }
const updateTask = (date,datetasks)=>{
  axios.put("http://localhost:8000/update",{
    "date":date===""?"":formatDate("en-GB",date),
    "tasks":datetasks
  }).then((response)=>{
    console.log("task updated");
  })
}
  const handleCheckboxChange = (id,e)=>{
    tasks.forEach((task)=>{
      if(task.id===id){
        if(e.target.checked){
          task.status="complete"
        }
        else{
          task.status="incomplete"
        }
      }

      
    })
    setTasks(tasks)
      updateTask(date,tasks)
  }
  return (
    <>
  
      <Modal show={dateModalIsOpen} onHide={()=>setDateModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {tasks.length>0?tasks.map((task)=>task.taskType==="daily"?<Task handleCheckboxChange={handleCheckboxChange} key={task.id} id={task.id} task={task.task} status={task.status}/>:""):"No Tasks for the day"}
        </Modal.Body>
        <Modal.Header>
          <Modal.Title>Additional Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {tasks.length>0?tasks.map((task)=>task.taskType==="additional"?<Task handleCheckboxChange={handleCheckboxChange} key={task.id} id={task.id} task={task.task} status={task.status}/>:""):"No Tasks for the day"}
        {addModalIsOpen?
        <><Form.Control value={value} onChange={(e)=>setValue(e.target.value)} type="text" placeholder="Enter Task" className="mb-2" />
        <Button onClick={()=>addAdditionalTask(date,tasks)} variant="primary">Add</Button></>
        :<div className="btn-container">
        <Button onClick={()=>setAddModalIsOpen(true)} variant="primary">Add Task</Button>
        </div>}
       
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default DateModal