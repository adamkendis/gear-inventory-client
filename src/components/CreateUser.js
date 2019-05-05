import React from 'react';
import { Form, Message } from 'semantic-ui-react';
import axios from 'axios';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      passwordMismatch: false,
      createFailed: false,
      successLogin: false,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let {name, email, password, confirmedPassword} = this.state;
    if (password === confirmedPassword) {
      axios.post('http://localhost:8000/api/user/create/', {name, email, password})
        .then(res => {
          console.log(res);
          this.setState({successLogin: true, passwordMismatch: false, createFailed: false});
          axios.post('http://localhost:8000/api/user/token/', {email, password})
            .then(res => {
              console.log(res);
              localStorage.setItem('auth_token', res.data.token);
            })
            .then(() => {
              let token = localStorage.getItem('auth_token');
              console.log(token);
            })
            .catch(err => {
              console.log(err);
              this.setState({badLogin: true})
            })
        })
        .catch(err => {
          console.log(err);
          this.setState({createFailed: true, passwordMismatch: false})
        })
    } else {
      this.setState({passwordMismatch: true, createFailed: false});
    }
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} success={this.state.successLogin} warning={this.state.passwordMismatch} error={this.state.createFailed}>
        <Form.Input 
          label='Email' 
          type='email' 
          placeholder='Email Address'
          onChange={e => this.setState({email: e.target.value})} />
        <Form.Input 
          label='Username' 
          type='text' 
          placeholder='Username'
          onChange={e => this.setState({name: e.target.value})} />
        <Form.Input 
          label='Password' 
          type='password' 
          placeholder='Password'
          onChange={e => this.setState({password: e.target.value})} />
        <Form.Input 
          label='Confirm Password' 
          type='password' 
          placeholder='Confirm Password'
          onChange={e => this.setState({confirmedPassword: e.target.value})} />
          <Message error header="Error creating account" content="Please try again" />
          <Message warning header="Please confirm password" content="Passwords don't match" />
          <Message success header="Success" content="Account created! Signing in..." />
        <Form.Button content="Create account" />
        <a href='# ' onClick={() => this.props.createNewAccount()}>Already have an account? Log in</a>
      </Form>
    )
  }

}

export default CreateUser;