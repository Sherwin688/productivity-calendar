import React from 'react'
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function DailyTaskModal({date,setAddDailyTaskIsOpen,addDailyTaskIsOpen,handleAddDailyTaskClick}) {
    const [value,setValue] = useState("")

    const handleAddDaily = ()=>{
        handleAddDailyTaskClick(date,value)
        setAddDailyTaskIsOpen(false)
    }
    return (
        <> 
          <Modal show={addDailyTaskIsOpen} onHide={()=>setAddDailyTaskIsOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Daily Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Task</Form.Label>
                  <Form.Control
                  onChange={(e)=>setValue(e.target.value)}
                  value={value}
                    type="text"
                    placeholder="Eg. Exercise"
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={()=>handleAddDaily(value)}>
                Add Daily Task
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}
