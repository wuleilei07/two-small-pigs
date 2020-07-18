import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/Smile.png'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

function Index() {
  function handleClicked(params) {
    // this.props.history.location('/login')
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="welcome">Welcome To Two-Small-Pigs</h1>
        <Link to="/login">
          <Button onClick={handleClicked}>Login First</Button>
        </Link>
      </header>
    </div>
  )
}

export default Index
