import React from 'react';
import axios from 'axios';
import Nav from './Nav.js';
import Login from './Login.js';
import CreateUser from './CreateUser.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    axios.post('http://localhost:8000/api/user/token/', {email: 'testemail@fake.com', password: 'testpassword'})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <Nav/>
        <Login />
      </div>
    )
  }

}

export default App;
