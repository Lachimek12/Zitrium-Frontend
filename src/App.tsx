import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  interface UserData {
    name: string;
    email: string;
  }

  const [backendData, setBackendData] = useState<UserData>();

  const handleReceiveButton = async () => {
    try {
      const response = await fetch('http://localhost:3000/api');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setBackendData(result);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const [userData, setUserData] = useState({
    name: 'Jeff',
    email: 'xdd@wp.pl'
  });

  const handleSendButton = async () => {
    try {
      const response = await fetch('http://localhost:3000/api', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      // Handle success scenario
      console.log('Data sent successfully');
    } catch (error) {
        // Handle error scenario
        console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className='App-button-container'>
          <button className='App-button' onClick={handleReceiveButton}>Receive</button>
          <button className='App-button' onClick={handleSendButton}>Send</button>
        </div>

        <div>
          {(backendData == null) ? (
            <p>Loading...</p>
          ) : (
            <p>{backendData.name} {backendData.email}</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
