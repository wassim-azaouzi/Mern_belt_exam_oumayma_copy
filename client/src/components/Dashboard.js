import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Dashboard = () => {
  const [votes, setVotes] = useState([]);
  const [topVotes, setTopVotes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/vote')
      .then(response => {
        const sortedVotes = response.data.sort((a, b) => {
          const voteA = a.vote1 + a.vote2 + a.vote3 + a.vote4;
          const voteB = b.vote1 + b.vote2 + b.vote3 + b.vote4;
          return voteB - voteA; // Sort in descending order
        });
        setTopVotes(sortedVotes.slice(0, 3));
        setVotes(sortedVotes);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const sortedRecentVotes = votes.slice(3).sort((a, b) => {
    return moment(b.createdAt).diff(moment(a.createdAt)); // Sort in descending order of createdAt
  });

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Link to="/polls/new">
          <button className="btn btn-primary">Create Your Own Poll</button>
        </Link>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="bg-light p-3 mb-3 border" style={{ height: '500px', overflowY: 'auto' }}>
            <h1>Top 3 Polls</h1>
            {topVotes.map((vote, index) => (
              <div key={index} className="bg-white p-3 mb-3 border">
                <Link to={`/polls/${vote._id}`}>
                  <p>{vote.question}</p>
                </Link>
                <p>
                  {vote.option1}: {vote.vote1}
                </p>
                <p>
                  {vote.option2}: {vote.vote2}
                </p>
                {vote.option3 && <p>{vote.option3}: {vote.vote3}</p>}
                {vote.option4 && <p>{vote.option4}: {vote.vote4}</p>}
                <p>({moment(vote.createdAt).fromNow()})</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-light p-3 mb-3 border" style={{ height: '500px', overflowY: 'auto' }}>
            <h1>Recent Polls</h1>
            {sortedRecentVotes.map((vote, index) => (
              <div key={index} className="bg-white p-3 mb-3 border">
                <Link to={`/polls/${vote._id}`}>
                  <p>{vote.question}</p>
                </Link>
                <p>
                  {vote.option1}: {vote.vote1}
                </p>
                <p>
                  {vote.option2}: {vote.vote2}
                </p>
                {vote.option3 && <p>{vote.option3}: {vote.vote3}</p>}
                {vote.option4 && <p>{vote.option4}: {vote.vote4}</p>}
                <p>({moment(vote.createdAt).fromNow()})</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
