import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddSkill() {

    const [skill, setParam] = useState({ name: "" })
    const [skillArr, setSkills] = useState([])



    useEffect(() => {
        loadSkills()
    }, [])

    const { name } = skill;


    const navigate = useNavigate();

    const loadSkills = async () => {
        const result = await axios.get('http://localhost:8080/skill/findAll');
        setSkills(result.data);
    }


    /* const deleteSkill = async (skill) => {
        await axios.delete(`http://localhost:8080/candidate/delete/${id}/${skill}`);
        loadCandidate();
    }
    */
    const nameOnChange = (e) => {
        setParam({ ...skill, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/skill/add', skill)
        loadSkills();
    }

    return (
        <div className='container'>
            <div className='offset-md-2 col-md-8 mt-2 p-5' >


                <table className="table table-sm shadow">
                    <thead >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {
                            skillArr.map((c, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{c.name}</td>
                                    </tr>);
                            })}
                    </tbody>
                </table>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3 ">
                        <input type="text" className="form-control" placeholder=
                            'Imput name of skill to add'
                            name='name' value={name} onChange={(e) => nameOnChange(e)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Add skill</button>
                </form>
            </div>
        </div>

    )
}
