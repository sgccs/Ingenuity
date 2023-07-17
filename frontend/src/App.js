import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';

import Problems from './pages/Problems';
import CodeView from './pages/CodeView';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Routes>
          <Route exact path='/problems' element={< Problems />}></Route>
          <Route exact path='/problem/:id' element={<CodeView/>}></Route>
         </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
