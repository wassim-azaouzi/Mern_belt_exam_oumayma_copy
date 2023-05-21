import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteButton = (props) => {
    const { projectId } = props;
    const navigate= useNavigate();
    
    const deleteProject = e => {
        axios.delete('http://localhost:8000/api/project/' + projectId, {withCredentials:true})
            .then(res=>{
            })
            .catch(err=>{
                if (err.response.status===401){
                    navigate("/");
                }
            })
    }
    return (
        <button onClick={deleteProject}>
            Delete Project
        </button>
    )
}
export default DeleteButton;