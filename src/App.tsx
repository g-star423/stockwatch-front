import React, { ReactNode, useState } from 'react';
import './App.css';
import Header from './Components/Header'
import UserLogin from './Components/UserLogin';
import NewUser from './Components/NewUser';
import Holdings from './Components/Holdings';
import PlaidLinkComponent from './Components/Plaid';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [loggedInUserID, setLoggedInUserID] = useState(0);


  return (
    <div>
      <Header loggedInUsername={loggedInUsername} loggedInUserID={loggedInUserID} />
      <UserLogin setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} />
      <NewUser setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} />
      <Holdings loggedInUserID={loggedInUserID} />
      <PlaidLinkComponent />
    </div>
  );
}

export default App;
