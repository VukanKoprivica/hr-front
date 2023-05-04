import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ShowCandidate() {

    const [skillParam, setParam] = useState("")
    const [candidates, setCandidates] = useState({
        idCandidate: 0,
        name: "",
        contactNumber: 0,
        dateOfBirth: "",
        email: "",
        skills: []
    });

    useEffect(() => {
        loadCandidate();
    }, [])

    const { id } = useParams();


    const navigate = useNavigate();

    const loadCandidate = async () => {
        const result = await axios.get(`http://localhost:8080/candidate/find/${id}`);
        setCandidates(result.data);
    }

    const deleteCandidate = async (id) => {
        await axios.delete(`http://localhost:8080/candidate/delete/${id}`);
        navigate('/');
    }
    const deleteSkill = async (skill) => {
        await axios.delete(`http://localhost:8080/candidate/delete/${id}/${skill}`);
        loadCandidate();
    }
    const nameOnChange=(e)=>{
        setParam(e.target.value);
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8080/candidate/update/${id}/${skillParam}`)
        loadCandidate();
        setParam("")
    }

    return (
        <div>
            <div className='container'>
                <div className='card col-md-6 offset-md-3 border rounded p-3 mt-2 shadow'>
                    <div className='card-header'>
                        <h5 className="card-title">{candidates.name}</h5>
                    </div>
                    <div className='card-body'>
                        <ul className='list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>Contact number:</b>+381 {candidates.contactNumber}
                            </li>
                            <li className='list-group-item'>
                                <b>Date of birth:</b> {candidates.dateOfBirth}
                            </li>
                            <li className='list-group-item'>
                                <b>Email:</b> {candidates.email}
                            </li>

                            <div className='card-body'>

                                <b>Skills:</b>{
                                    candidates.skills.map((skill) => {
                                        return (
                                            <li key={skill.idSkill}>{skill.name}<button className='btn btn-close' onClick={() => deleteSkill(skill.name)} ></button></li>
                                        )
                                    })}

                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className="col-md-6 offset-md-3 border rounded p-3 mt-2 shadow">
                                    <input type="text" className="form-control" placeholder=
                                    'Imput name of skill to add' 
                                    value={skillParam} onChange={(e) => nameOnChange(e)} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary ">Add skill</button>
                                </form>

                            </div>
                        </ul>




                        <Link className='btn btn-primary mx-2' to={`/`} >Finish</Link>

                        <button className='btn btn-danger mx-2' onClick={() => deleteCandidate(candidates.idCandidate)} >Delete</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
