import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { useNavigate, useParams} from 'react-router-dom';

export default function ShowWithName() {

    const [nameParam, setNameParam] = useState("");
    const [candidates, setCandidates] = useState({
        idCandidate:0,
        name: "",
        contactNumber: 0,
        dateOfBirth: "",
        email: "",
        skills:[]
    });

    const { id } = useParams();


    const navigate = useNavigate();
    const loadCandidates =async() => {
        const result =await axios.get(`http://localhost:8080/candidate/findByName/${nameParam}`);
        console.log(result.data);
        setCandidates(result.data);
    }

    const nameOnChange = (e) => {
        setNameParam(e.target.value)
    }

    const deleteCandidate = async (id) => {
        await axios.delete(`http://localhost:8080/candidate/delete/${id}`);
        navigate('/');
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        console.log(nameParam)
        loadCandidates(nameParam)
    }

    return (
        <div>
            <div className='container'>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="col-md-6 offset-md-3 border rounded p-3 mt-2 shadow">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={nameParam} onChange={(e) => nameOnChange(e)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
                <div className='card col-md-6 offset-md-3 border rounded p-3 mt-2 shadow'>
                    <div className='card-header'>
                        <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <b>Name:</b> {candidates.name}
                        </li>
                        <li className='list-group-item'>
                            <b>Contact number:</b>+381 {candidates.contactNumber}
                        </li>
                        <li className='list-group-item'>
                            <b>Date of birth:</b> {candidates.dateOfBirth}
                        </li>
                        <li className='list-group-item'>
                            <b>Email:</b> {candidates.email}
                        </li>
                        <li className='list-group-item'>
                            <b>Skills:</b>{
                        candidates.skills.slice(0, 1).map((skill) => { return (skill.name) })}
                        {candidates.skills.slice(1).map((skill) => { return (", " + skill.name) })}
                        </li>
                        </ul>
                   


                    {/* <Link className='btn btn-primary mx-2' to={`/delete/${c.candidateId}`} >Add skill</Link> */}
                    <button className='btn btn-danger mx-2' onClick={() => deleteCandidate(candidates.idCandidate)} >Delete</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
