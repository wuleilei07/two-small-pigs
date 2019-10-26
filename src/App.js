import React from 'react';
import { Button } from 'reactstrap';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  function handleClicked(params) {
    prompt('helleo')

  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_self"
          rel="noopener noreferrer"
        >
          Learn webpack
        </a>
        <Button onClick={handleClicked}>bootstrap button</Button>
      </header>
    </div>
  );
}

export default App;
