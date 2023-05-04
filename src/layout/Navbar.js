import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
    
  
<nav className="navbar navbar-expand-light navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand" to='/'>Hr application</Link>
    <Link className='btn btn-outline-light' to="/addCandidate">Add Candidate</Link>
    <Link className='btn btn-outline-light' to="/withName">ShowWithName</Link>
    <Link className='btn btn-outline-light' to="/withSkill">ShowWithSkill</Link>
    <Link className='btn btn-outline-light' to="/addSkill">AddSkill</Link>
  </div>
</nav>


    </div>
  )
}
