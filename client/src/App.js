import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Poll from './components/Poll';


function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand mx-auto h1">Voting Dojo</span>
        </div>
      </nav>

      <div className="container mt-4">
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Form />} path="/polls/new" />
            <Route element={<Poll />} path="/polls/:id" />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
