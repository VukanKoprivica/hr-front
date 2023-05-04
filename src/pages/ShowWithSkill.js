import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom';

export default function ShowWithSkill() {

    const [skillName, setSkillName] = useState('');
    const [candidates, setCandidates] = useState([]);

    const { id } = useParams();


    const navigate = useNavigate();
    const loadCandidates =async() => {
        const result =await axios.get(`http://localhost:8080/candidate/search/${skillName}`);
        console.log(result.data);
        setCandidates(result.data);
    }

    const nameOnChange = (e) => {
        setSkillName(e.target.value)
    }

    const deleteCandidate = async (id) => {
        await axios.delete(`http://localhost:8080/candidate/delete/${id}`);
        navigate('/');
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        loadCandidates(skillName)
    }

    return (
        <div>
            <div className='container '>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="offset-md-2 col-md-8 mt-2 p-4">
                    <label htmlFor="Skill" className="form-label">Skill</label>
                    <input type="text" className="form-control" value={skillName} onChange={(e) => nameOnChange(e)} required />
                </div>
                <button type="submit" className="btn btn-primary p-2">Submit</button>
            </form>
            
                <div className='container'>
                <table className="table table-sm shadow ">
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
                    <td>{c.contactNumber} </td>
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
                
                <Link className='btn btn-primary mx-2' to={`/`} >Finish</Link>
            </div>
        </div>
    )
}
