import React, { ReactNode, useState } from 'react';
import './App.css';
import Header from './Components/Header'
import UserLogin from './Components/UserLogin';
import NewUser from './Components/NewUser';
import Holdings from './Components/Holdings';
import PlaidLinkComponent from './Components/Plaid';
import AddRequest from './Components/AddRequest';
import Requests from './Components/Requests';
import ViewToggle from './Components/ViewToggle';
import { Button, Space } from 'antd';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState<string | undefined>();
  const [loggedInUserID, setLoggedInUserID] = useState<number | undefined>();
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [view, setView] = useState('') // this will determine whether the user is in the "holdings" view or the "requests" view

  function logout() {
    setLogin(false)
    setSignup(false)
    setLoggedInUserID(undefined)
    setLoggedInUsername(undefined)
    setView('')
  }


  return (
    <div>
      <Header loggedInUsername={loggedInUsername} loggedInUserID={loggedInUserID} logout={logout} />
      {loggedInUsername ? <ViewToggle setView={setView} /> : null}
      {!login && !signup && !loggedInUserID ? <h2 className='welcome'>Welcome to Stockwatch - please log in or sign up.</h2> : null}
      {!login && !signup && !loggedInUserID ?
        <div id="login-div"><Button className='landing-button' type='primary' onClick={() => setLogin(true)}>LOG IN</Button>
          <Button className='landing-button' type='primary' onClick={() => setSignup(true)}>SIGN UP</Button></div>
        : null}
      {login ? <UserLogin setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} setLogin={setLogin} setView={setView} /> : null}
      {signup ? <NewUser setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} setSignup={setSignup} setView={setView} /> : null}
      {view === 'holdings' ? <Holdings loggedInUserID={loggedInUserID} /> : null}
      {view === 'holdings' ? <PlaidLinkComponent loggedInUserID={loggedInUserID} /> : null}
      {view === 'requests' ? <Requests loggedInUserID={loggedInUserID} /> : null}
      <div className='button-div'>
        <h3>DEV NOTE: Please do not input your bank account information. Please select any bank from Plaid's sandbox, username = "user_good", password = "pass_good". 1234 for any other confirmations.</h3>
      </div>
    </div>
  );
}

export default App;
