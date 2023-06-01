import { Button } from "react-bootstrap";
import React, {   useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {AiFillSave,AiFillDelete,AiOutlineEdit} from "react-icons/ai"
function Task({handleDailyDelete,realTaskType,date,handleEdit,handleDelete,id,task,status,handleCheckboxChange,taskType="normal"}) {
  
const [editable,setEditable] = useState(false)
const [editValue,setEditValue] = useState(task)


const handleTypeDelete = ()=>{
  if(realTaskType==="daily"){
    handleDailyDelete(id,"todays")
  }
  else if(realTaskType==="additional"){
    handleDelete(id,taskType)
  }
}
React.useEffect(() => {
  setEditValue(task)
}, [task])
  return (
    <>
    <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" 
        onChange={(e)=>handleCheckboxChange(id,e,taskType)} 
        checked={status==="complete"?true:false}/>
        
        <Form.Control aria-label="Text input with checkbox" 
        onChange={(e)=>setEditValue(e.target.value)} value={editValue} disabled={editable?false:true}/>
       

        {editable?
        <Button 
        onClick={()=>{
          handleEdit(date,id,editValue,taskType)
          setEditable(false)
        }}
        >
          <AiFillSave/>
        </Button>
        :<>
        <Button variant="light" onClick={()=>setEditable(true)}><AiOutlineEdit/></Button>
        <Button variant="danger" onClick={()=>handleTypeDelete()}><AiFillDelete/></Button>
        </>}
      </InputGroup>
      </>
      
  )
}

export default Task