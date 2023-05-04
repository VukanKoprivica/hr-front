import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

  const [candidates, setCandidates] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    loadCandidates();
  }, [])

  const loadCandidates = async () => {
    const result = await axios.get("http://localhost:8080/candidate/findAll");
    setCandidates(result.data);
  }

  const deleteCandidate = async (id) => {
    await axios.delete(`http://localhost:8080/candidate/delete/${id}`);
    loadCandidates();
  }



  return (

    <div className='container'>
      <div className='py-5 '>


        <table className="table table-sm shadow">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">contactNumber</th>
              <th scope="col">dateOfBirth</th>
              <th scope="col">email</th>
              <th scope="col">skills</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              candidates.map((c, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{c.name}</td>
                    <td>+381 {c.contactNumber} </td>
                    <td>{c.dateOfBirth}</td>
                    <td>{c.email}</td>
                    <td>{c.skills.slice(0, 1).map((skill) => { return (skill.name) })}
                      {c.skills.slice(1).map((skill) => { return (", " + skill.name) })}</td>
                    <td>
                      <Link className='btn btn-primary mx-2' to={`/show/${c.idCandidate}`} >View</Link>
                      <button className='btn btn-danger mx-2' onClick={() => deleteCandidate(c.idCandidate)} >Delete</button>
                    </td>
                  </tr>);
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
