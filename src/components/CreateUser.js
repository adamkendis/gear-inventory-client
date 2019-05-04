import React from 'react';
import axios from 'axios';

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      userCreated: false,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let {name, email, password, confirmedPassword} = this.state;
    if (password === confirmedPassword) {
      axios.post('http://localhost:8000/api/user/create/', {name, email, password})
        .then(res => {
          console.log(res);
          // localStorage.setItem('auth_token', res.data.token);
        })
        // .then(() => {
        //   let token = localStorage.getItem('auth_token');
        //   console.log(token);
        // })
        .catch(err => {
          // console.log(err);
        })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Create User</legend>
          <p>
            <label htmlFor='username'>Username</label>
            <input
              type='text' id='username'
              onChange={e => this.setState({name: e.target.value})} />
          </p>
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
            <label htmlFor="password">Confirm Password</label>
            <input
              type='text' id='confirmed-password'
              onChange={e => this.setState({confirmedPassword: e.target.value})} />
          </p>
          <p>
            <button type='submit'>Create User</button>
          </p>

        </fieldset>
      </form>
    )
  }

}

export default CreateUser;