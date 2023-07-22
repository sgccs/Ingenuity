import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';

import Problems from './pages/Problems';
import CodeView from './pages/CodeView';
import Submissionslist from './pages/Submissions';
import Viewsubmission from './pages/ViewSubmission';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Routes>
          <Route exact path='/problems' element={< Problems />}></Route>
          <Route exact path='/problem/:id' element={<CodeView/>}></Route>
          <Route exact path='/submissions/:id' element={<Submissionslist/>}></Route>
          <Route exact path='/Submission/:id' element={<Viewsubmission/>}></Route>
         </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
