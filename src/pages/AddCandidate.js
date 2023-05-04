import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function AddCandidate() {

    const navigate = useNavigate();
    

    const [candidate, setCandidate] = useState({
        name: "",
        contactNumber: 0,
        dateOfBirth: "",
        email: "",
        skills:[]
    })


    const [skillArr, setSkills] = useState([])
    const [skillrrr, setSkill] = useState([])

    useEffect(() => {
        loadSkills()
    }, [])


    useEffect(() => {
        setCandidate( prevValue=>({...prevValue,skills:[...skillrrr]}))
    }, [skillrrr])


    const loadSkills = async () => {
        const result = await axios.get("http://localhost:8080/skill/findAll")
        setSkills(result.data)
    }


    const { name, contactNumber, dateOfBirth, email, skills } = candidate;

    const onInputChange = (e) => {
        setCandidate({ ...candidate, [e.target.name]: e.target.value })
    }
    const onSkillChange = (e) => {
        setSkill(e.map((sk)=>{return {name:sk.value}} ))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/candidate/add", candidate);
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-3 mt-2 shadow '>
                    <h2 className='text-center'> Add user</h2>
                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className="mb-3">
                            <label htmlFor="FullName" className="form-label">Full name</label>
                            <input type={"text"} className="form-control" name='name'
                                placeholder='Enter your name' value={name} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Contact number" className="form-label">Contact number</label>
                            <input type="number" className="form-control" placeholder='Enter your contact number'
                                name='contactNumber' value={contactNumber} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Date of birth" className="form-label">Date of birth</label>
                            <input type="date" className="form-control"
                                name='dateOfBirth' value={dateOfBirth} onChange={(e) => onInputChange(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" name='email'
                                placeholder='Enter your email' value={email} onChange={(e) => onInputChange(e)} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-4">
                            <Select 
                                closeMenuOnSelect={false}
                                isMulti
                                options={skillArr.map((s)=>({label:s.name,value:s.name}))}
                                onChange={(e)=>onSkillChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link className="btn btn-danger" to={'/'} >Cancel</Link>

                    </form>
                </div>
            </div>
        </div>
    )
}
