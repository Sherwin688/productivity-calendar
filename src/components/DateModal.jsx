import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Task from "./Task";

function DateModal({dateModalIsOpen,setDateModalIsOpen,datetasks}) {
  const [tasks,setTasks] = useState(datetasks)


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
      setTasks(tasks)
    })
  }
  console.log(tasks.length);
  return (
    <>
  
      <Modal show={dateModalIsOpen} onHide={()=>setDateModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {tasks.length>0?tasks.map((task)=><Task handleCheckboxChange={handleCheckboxChange} key={task.id} id={task.id} task={task.task} status={task.status}/>):"No Tasks for the day"}
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default DateModal