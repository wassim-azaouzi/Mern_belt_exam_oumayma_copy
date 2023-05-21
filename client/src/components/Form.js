import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = (props) => {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [vote1, setVote1] = useState(0);
    const [vote2, setVote2] = useState(0);
    const [vote3, setVote3] = useState(0);
    const [vote4, setVote4] = useState(0);
    const [errors, setErrors] = useState([]); 
    const [dupErrors, setDupErrors] = useState([]); 
    const navigate = useNavigate();


    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/vote', {question, option1, vote1, option2, vote2, option3, vote3, option4, vote4})
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch(err=>{
                console.log(err);
                if (err.response.data.code === 11000) {
                    const errorMessage = "Question Already Exists ";
                    setDupErrors(errorMessage);
                    console.log("DupErrors", dupErrors);
                } else if (err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
            })               

    }
    return (
        <div className="d-flex justify-content-center">
          <form onSubmit={onSubmitHandler} style={{ maxWidth: "400px" }}>
            {dupErrors?
              <div className="alert alert-danger" role="alert">
                {dupErrors}
              </div>: null
            }
    
            <p>
              <label>Question:</label><br />
              <input type="text" name="question" onChange={(e) => setQuestion(e.target.value)} required />
              {errors && errors.question && (
                <div className="alert alert-danger" role="alert">
                  {errors.question.message}
                </div>
              )}
            </p>
    
            <p>
              <label>Option 1: *</label><br />
              <input type="text" name="option1" onChange={(e) => setOption1(e.target.value)} required />
              {errors && errors.option1 && (
                <div className="alert alert-danger" role="alert">
                  {errors.option1.message}
                </div>
              )}
            </p>
    
            <p>
              <label>Option 2: *</label><br />
              <input type="text" name="option2" onChange={(e) => setOption2(e.target.value)} required />
              {errors && errors.option2 && (
                <div className="alert alert-danger" role="alert">
                  {errors.option2.message}
                </div>
              )}
            </p>
    
            <p>
              <label>Option 3: </label><br />
              <input type="text" name="option3" onChange={(e) => setOption3(e.target.value)} />
            </p>
    
            <p>
              <label>Option 4: </label><br />
              <input type="text" name="option4" onChange={(e) => setOption4(e.target.value)} />
            </p>
    
            <input type="submit" className="btn btn-primary" />
          </form>
        </div>
      );
    };
    
    export default Form;