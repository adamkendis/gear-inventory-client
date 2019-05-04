import React from 'react';
import axios from 'axios';

import CreateUser from './CreateUser.js';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      newUser: false,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/user/token/', this.state)
      .then(res => {
        console.log(res);
        localStorage.setItem('auth_token', res.data.token);
      })
      .then(() => {
        let token = localStorage.getItem('auth_token');
        console.log(token);
      })
  }

  render() {
    let { newUser } = this.state;
    
    if (!newUser) {
      return (
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Login</legend>
            <p>
              <label htmlFor='email'>Email</label>
              <input
                type='text' id='email'
                onChange={e => this.setState({email: e.target.value})} />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input
                type='text' id='password'
                onChange={e => this.setState({password: e.target.value})} />
            </p>
            <p>
              <button type='submit'>Login</button>
            <p>
              <a href="# " onClick={() => {this.setState({newUser: true})}}>Create New Account</a>
            </p>
            </p>
  
          </fieldset>
        </form>
      )
    } else {
      return <CreateUser />
    }
  }
}

export default Login;