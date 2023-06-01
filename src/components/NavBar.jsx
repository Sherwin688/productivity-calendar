import React from 'react'
import {Navbar,Nav,Container} from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/dashboard">Productivity Calendar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/today">Tasks</Link>
       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
