import { Button } from "react-bootstrap";
import React, {   useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {AiFillSave,AiFillDelete,AiOutlineEdit} from "react-icons/ai"
function Task({handleDailyEdit,enableDailyDelete=false,disableButtons,handleDailyDelete,realTaskType,date,handleEdit,handleDelete,id,task,status,handleCheckboxChange,taskType="normal"}) {
  
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

const handleDynamicEdit = ()=>{
  if(enableDailyDelete){
    handleDailyEdit(id,editValue,taskType)
    setEditable(false)

  }
  else{
    handleEdit(date,id,editValue,taskType)
    setEditable(false)
  }

}
React.useEffect(() => {
  setEditValue(task)
}, [task])
var customStyles;
if(task.length>50){
  customStyles = {
    resize:"none",
    height:(task.length/30*25)<40?"60px":task.length/30*25+"px"
  }
}
else{
  customStyles = {
    resize:"none",
    height:"32px"
  }
}

  return (
    <>
    <InputGroup className="mb-3">
        <InputGroup.Checkbox aria-label="Checkbox for following text input" 
        onChange={(e)=>handleCheckboxChange(id,e,taskType)} 
        checked={status==="complete"?true:false}/>
        
        <Form.Control as="textarea" style={customStyles}
        onChange={(e)=>setEditValue(e.target.value)} value={editValue} disabled={editable?false:true}/>
        
       

        {editable?
        <Button 
        onClick={()=>{
          handleDynamicEdit()
        }}
        >
          <AiFillSave/>
        </Button>
        :<>
        {disableButtons==="no" && <Button variant="light" onClick={()=>setEditable(true)}><AiOutlineEdit/></Button>}
        {disableButtons==="no" && <Button variant="danger" onClick={()=>handleTypeDelete()}><AiFillDelete/></Button>}
        </>}
      </InputGroup>
      </>
      
  )
}

export default Task