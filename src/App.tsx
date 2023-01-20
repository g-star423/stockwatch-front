import React, { ReactNode, useState } from 'react';
import './App.css';
import Header from './Components/Header'
import UserLogin from './Components/UserLogin';
import NewUser from './Components/NewUser';
import Holdings from './Components/Holdings';
import PlaidLinkComponent from './Components/Plaid';
import AddRequest from './Components/AddRequest';
import Requests from './Components/Requests';
import { Button, Space } from 'antd';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState<string | undefined>();
  const [loggedInUserID, setLoggedInUserID] = useState<number | undefined>();
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

  function logout() {
    setLogin(false)
    setSignup(false)
    setLoggedInUserID(undefined)
    setLoggedInUsername(undefined)
  }


  return (
    <div>
      <Header loggedInUsername={loggedInUsername} loggedInUserID={loggedInUserID} logout={logout} />
      {!login && !signup && !loggedInUserID ? <h2 className='welcome'>Welcome to Stockwatch - please log in or sign up.</h2> : null}
      {!login && !signup && !loggedInUserID ?
        <div id="login-div"><Button className='landing-button' type='primary' onClick={() => setLogin(true)}>LOG IN</Button>
          <Button className='landing-button' type='primary' onClick={() => setSignup(true)}>SIGN UP</Button></div>
        : null}
      {login ? <UserLogin setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} setLogin={setLogin} /> : null}
      {signup ? <NewUser setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} setSignup={setSignup} /> : null}
      {loggedInUsername ? <Holdings loggedInUserID={loggedInUserID} /> : null}
      {loggedInUsername ? <PlaidLinkComponent loggedInUserID={loggedInUserID} /> : null}
      <AddRequest loggedInUserID={loggedInUserID}></AddRequest>
      <Requests></Requests>
    </div>
  );
}

export default App;
