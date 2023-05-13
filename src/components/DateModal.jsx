import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Task from "./Task";
import axios from "axios";
import { formatDate } from "react-calendar/dist/cjs/shared/dateFormatter";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {v4 as uuid} from "uuid"; 

function DateModal({dateModalIsOpen,setDateModalIsOpen,datetasks,date}) {
  const [tasks,setTasks] = useState(datetasks)
  const [value,setValue] = useState("")
  const [addModalIsOpen,setAddModalIsOpen] = useState(false)

  console.log(datetasks[datetasks.length])
  const addAdditionalTask = (date,datetasks)=>{
    setTasks([...datetasks,{"id":parseInt(datetasks[datetasks.length-1].id)+1,"task":value,status:"incomplete","taskType":"additional"}])
    axios.put("http://localhost:8000/update",{
      "date":date===""?"":formatDate("en-GB",date),
      "tasks":[...datetasks,{"id":parseInt(datetasks[datetasks.length-1].id)+1,"task":value,status:"incomplete","taskType":"additional"}]
    }).then((response)=>{
      console.log(response);
      setValue("")
      setAddModalIsOpen(false)
      // setTasks([...datetasks,{"task":e.target.value,status:"incomplete","type":"additional"}])
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
    tasks.map((task)=>{
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
  console.log(tasks.length);
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
        <Button onClick={()=>addAdditionalTask(date,datetasks)} variant="primary">Add</Button></>
        :<div className="btn-container">
        <Button onClick={()=>setAddModalIsOpen(true)} variant="primary">Add Task</Button>
        </div>}
       
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default DateModal