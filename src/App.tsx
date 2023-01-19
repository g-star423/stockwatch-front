import React, { ReactNode, useState } from 'react';
import './App.css';
import Header from './Components/Header'
import UserLogin from './Components/UserLogin';
import NewUser from './Components/NewUser';
import Holdings from './Components/Holdings';
import PlaidLinkComponent from './Components/Plaid';
import { Button, Space } from 'antd';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState<string | undefined>();
  const [loggedInUserID, setLoggedInUserID] = useState<number | undefined>();
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)


  return (
    <div>
      <Header loggedInUsername={loggedInUsername} loggedInUserID={loggedInUserID} />
      {!login && !signup && !loggedInUserID ? <h4>Welcome to Stockwatch - please log in or sign up.</h4> : null}
      {!login && !signup && !loggedInUserID ? <Space><Button className='landing-button' type='primary' onClick={() => setLogin(true)}>LOG IN</Button></Space> : null}
      {!login && !signup && !loggedInUserID ? <Button className='landing-button' type='primary' onClick={() => setSignup(true)}>SIGN UP</Button> : null}
      {login ? <UserLogin setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} setLogin={setLogin} /> : null}
      {signup ? <NewUser setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} setSignup={setSignup} /> : null}
      {loggedInUsername ? <Holdings loggedInUserID={loggedInUserID} /> : null}
      {loggedInUsername ? <PlaidLinkComponent loggedInUserID={loggedInUserID} /> : null}
    </div>
  );
}

export default App;
