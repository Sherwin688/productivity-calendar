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
  return (
    <>
  
      <Modal show={dateModalIsOpen} onHide={
        ()=>{
          setDateModalIsOpen(false)
        }}>
        <Modal.Header className="pt-2 pb-2 text-center w-100" closeButton>

          <Modal.Title className="w-100">{date.toLocaleDateString()}</Modal.Title>
          </Modal.Header>

  

        <Modal.Header >
          <Modal.Title> <p className="text-center">Daily Tasks</p> 
  
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
        {
        dailyTasks.length>0?
        datetasks.map((task)=>
        task.taskType==="daily"?
        <Task
        disableButtons="yes"
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
        disableButtons="no"
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