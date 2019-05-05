import React from 'react';
import axios from 'axios';
// import Nav from './Nav.js';
import LoginScreen from './LoginScreen.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
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

  loggedIn = () => {
    this.setState({loggedIn: true});
  }

  render() {
    let { loggedIn } = this.state;

    return (
      <div className="main" >
        {
          !loggedIn ? 
            <LoginScreen loggedIn={this.loggedIn}/> :
            <div>Logged in!</div>
        }
      </div>
    )
  }
}

export default App;
