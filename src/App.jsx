import './App.css'
import Login from './components/Login/Login'
import React from 'react';
function App() {
  const INDIA_CODE = "+91";
  const loginSetup = async(phoneNumber) =>{
      // your code goes here
  }
  const onOtpSubmit = async(otp) => {
      // your logic goes here
  }
  return (
    <div className="App">
      <Login 
      loginSetup={loginSetup}
      onOtpSubmit={onOtpSubmit}
      />
    </div>
  )
}

export default App
