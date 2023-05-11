import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
function Task({id,task,status,handleCheckboxChange}) {
 
  const [checked,setChecked] = useState(status==="complete"?true:false)
  return (
    <>
    <InputGroup className="mb-3">
        <InputGroup.Checkbox onClick={()=>setChecked(prev =>!prev)} aria-label="Checkbox for following text input" onChange={(e)=>handleCheckboxChange(id,e)} checked={checked} />
        <Form.Control aria-label="Text input with checkbox" value={task} disabled  />
      </InputGroup>
      </>
      
  )
}

export default Task