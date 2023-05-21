import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const Poll = () => {
  const { id } = useParams();
  const [vote, setVote] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/vote/${id}`)
      .then(res => {
        setVote(res.data);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, [id, voted]);

  const updateVote = (e, option) => {
    e.preventDefault();
    const updatedVote = { ...vote };
    updatedVote[`vote${option}`] += 1;

    axios
      .put(`http://localhost:8000/api/vote/${id}`, updatedVote)
      .then(res => {
        setVote(updatedVote);
        setVoted(true);
      })
      .catch(err => console.log(err));
  };

  const { question, option1, vote1, option2, vote2, option3, vote3, option4, vote4 } = vote;

  const data = [
    { name: option1, value: vote1 },
    { name: option2, value: vote2 },
    option3 ? { name: option3, value: vote3 } : null,
    option4 ? { name: option4, value: vote4 } : null
  ];

  return (
    <div className="container mt-5">
      {loaded && voted && (
        <div className="row">
          <div className="col-md-6">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
          <div className="col-md-6">
            <div>
              <p>Thanks for voting! Here are the results...</p>
              <h3>{question}</h3>
              <p>
                {option1}: {vote1}
              </p>
              <p>
                {option2}: {vote2}
              </p>
              {option3 && (
                <p>
                  {option3}: {vote3}
                </p>
              )}
              {option4 && (
                <p>
                  {option4}: {vote4}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {loaded && !voted && (
        <div className="row">
          <div className="col-md-6">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </div>
          <div className="col-md-6">
            <div>
              <h3>{question}</h3>
              <div className="mb-3">
                <p>{option1}</p>
                <button className="btn btn-primary" onClick={(e) => updateVote(e, 1)}>Vote {option1}</button>
              </div>
              <div className="mb-3">
                <p>{option2}</p>
                <button className="btn btn-primary" onClick={(e) => updateVote(e, 2)}>Vote {option2}</button>
              </div>
              {option3 && (
                <div className="mb-3">
                  <p>{option3}</p>
                  <button className="btn btn-primary" onClick={(e) => updateVote(e, 3)}>Vote {option3}</button>
                </div>
              )}
              {option4 && (
                <div className="mb-3">
                  <p>{option4}</p>
                  <button className="btn btn-primary" onClick={(e) => updateVote(e, 4)}>Vote {option4}</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poll;
