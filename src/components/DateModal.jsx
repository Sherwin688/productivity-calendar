import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Task from "./Task";

function DateModal({dateModalIsOpen,setDateModalIsOpen,datetasks}) {
  const testtasks = [
    {"id":"1",
  "task":"Do this"},
  {"id":"2",
  "task":"Do this2"},
  {"id":"3",
  "task":"Do this3"},
  ]
  const [tasks,setTasks] = useState(datetasks.tasks)
  console.log(tasks)
  return (
    <>
      <Modal show={dateModalIsOpen} onHide={()=>setDateModalIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {tasks.map((task)=><Task key={task.id} task={task.task} status={task.status}/>)}
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default DateModal