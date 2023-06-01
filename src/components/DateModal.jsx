import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Task from "./Task";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DateModal({handleDailyDelete,date,handleDelete,handleEdit,dateModalIsOpen,setDateModalIsOpen,datetasks,handleCheckboxChange,addAdditionalTask}) {
  const [value,setValue] = useState("")
  const [addModalIsOpen,setAddModalIsOpen] = useState(false)

  const dailyTasks = datetasks.filter((task)=>task.taskType==="daily")
  const additionalTasks = datetasks.filter((task)=>task.taskType==="additional")
  const handleAddAdditional = ()=>{
    addAdditionalTask(date,value)
    setValue("")
    setAddModalIsOpen(false)


  }
// console.log(date)
  return (
    <>
  
      <Modal show={dateModalIsOpen} onHide={
        ()=>{
          setDateModalIsOpen(false)
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
        dailyTasks.length>0?
        datetasks.map((task)=>
        task.taskType==="daily"?
        <Task
        handleDailyDelete={handleDailyDelete}
        realTaskType={task.taskType}
        date={date}
        taskType="normal"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCheckboxChange={handleCheckboxChange}
        key={task.id}
        id={task.id}
        task={task.task}
        status={task.status}/>
        :
        "")
        :"No Daily Tasks"}
        </Modal.Body>
        <Modal.Header>
          <Modal.Title>Additional Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {datetasks.length>0?
        additionalTasks.map((task)=>task.taskType==="additional"?
        <Task
        handleDailyDelete={handleDailyDelete}
        realTaskType={task.taskType}
        date={date}
        taskType="normal"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleCheckboxChange={handleCheckboxChange}
         key={task.id}
         id={task.id}
         task={task.task}
         status={task.status}/>
        :"")
        :"No Additional Tasks for the day"}
        {addModalIsOpen?
        <>
        <Form.Control 
        value={value} 
        onChange={(e)=>setValue(e.target.value)} 
        type="text" 
        placeholder="Enter Task" className="mb-2" />
        <Button 
        onClick={()=>handleAddAdditional(date,datetasks)} 
        variant="primary">Add</Button>
        </>
        :
        <div className="btn-container">
        <Button onClick={()=>setAddModalIsOpen(true)} variant="primary">Add Task</Button>
        </div>}
       
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default DateModal