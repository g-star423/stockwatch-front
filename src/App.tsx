import React, { ReactNode, useState } from 'react';
import './App.css';
import Header from './Components/Header'
import UserLogin from './Components/UserLogin';

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [loggedInUserID, setLoggedInUserID] = useState(0);


  return (
    <div>
      <Header loggedInUsername={loggedInUsername} loggedInUserID={loggedInUserID} />
      <UserLogin setLoggedInUsername={setLoggedInUsername} setLoggedInUserID={setLoggedInUserID} />
    </div>
  );
}

export default App;
