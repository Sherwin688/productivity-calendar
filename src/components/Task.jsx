import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
function Task({id,task,status,handleCheckboxChange}) {
 


  return (
    <>
    <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" 
        onChange={(e)=>handleCheckboxChange(id,e)} 
        checked={status==="complete"?true:false} />
        <Form.Control aria-label="Text input with checkbox" value={task} disabled  />
      </InputGroup>
      </>
      
  )
}

export default Task