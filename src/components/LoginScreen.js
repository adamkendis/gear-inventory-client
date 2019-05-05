import React from 'react';
import Login from './Login.js';
import CreateUser from './CreateUser.js'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isNewUser: false,
    };
  }

  createNewAccount = () => {
    let { isNewUser } = this.state;
    this.setState({isNewUser: !isNewUser});
  }

  render() {
    let { isNewUser } = this.state;
    let { loggedIn } = this.props;

    return (
      <div className="login-screen">
        <div className="login-wrapper">
          { !isNewUser ? 
              <Login createNewAccount={this.createNewAccount} loggedIn={loggedIn}/> : 
              <CreateUser createNewAccount={this.createNewAccount} loggedIn={loggedIn}/> }
        </div>
      </div>
    )
  }
}

export default LoginScreen;