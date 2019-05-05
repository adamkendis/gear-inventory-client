import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import axios from 'axios';

import CreateUser from './CreateUser.js';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      newUser: false,
      badLogin: false,
      successLogin: false,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let { loggedIn } = this.props;
    let { email, password } = this.state
    axios.post('http://localhost:8000/api/user/token/', {email, password})
      .then(res => {
        console.log(res);
        localStorage.setItem('auth_token', res.data.token);
      })
      .then(() => {
        let token = localStorage.getItem('auth_token');
        this.setState({successLogin: true, badLogin: false});
        loggedIn();
        console.log(token);
      })
      .catch(err => {
        console.log(err);
        this.setState({badLogin: true})
      })
  }

  render() {
    let { email, newUser, badLogin, successLogin } = this.state;

    
    if (!newUser) {
      return (
        <div>
          <Form onSubmit={this.onSubmit} success={successLogin} warning={badLogin}>
            <Form.Input 
              label='Email' 
              type='email' 
              placeholder='Email Address'
              onChange={e => this.setState({email: e.target.value})} />
            <Form.Input 
              label='Password' 
              type='password' 
              placeholder='Password'
              onChange={e => this.setState({password: e.target.value})} />
            <Message success header="Logged in!" content="Successfully logged in." />
            <Message warning header="Try again" content="Incorrect email or password" />
            <Form.Button>Login</Form.Button>
            <a href='# ' onClick={() => this.props.createNewAccount()}>Create new account</a>
          </Form>
        </div>
      )
    } else {
      return <CreateUser email={email}/>
    }
  }
}

export default Login;