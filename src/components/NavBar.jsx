import React, { useState } from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function NavBar() {
const [active,setActive] = useState("dashboard")

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-0 w-100" >    
      <Container fluid style={{margin:"10px"}} >
        <div className="d-flex">
      <Navbar.Brand href="/dashboard" style={{fontSize:"25px",fontWeight:"600"}}>Productivity Calendar
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </div>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-end" >
            <Link className={active==="dashboard"?"nav-link active":"nav-link"} to="/dashboard" onClick={(()=>setActive("dashboard"))}>Dashboard</Link>
            <Link className={active==="tasks"?"nav-link active":"nav-link"} to="/today" onClick={(()=>setActive("tasks"))}>Tasks</Link>
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
