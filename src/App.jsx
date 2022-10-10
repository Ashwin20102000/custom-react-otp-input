import './App.css'
import Login from './components/Login/Login'
import firebaseConfig from './firebase/firebase';
import * as firebase from 'firebase/app';
import {getAuth, onAuthStateChanged, PhoneAuthProvider, RecaptchaVerifier,  signInWithCredential, signInWithPhoneNumber} from 'firebase/auth';
import React from 'react';
function App() {
  const [user,setUser] = React.useState(false);
  const INDIA_CODE = "+91 ";
  const app = firebase.initializeApp(firebaseConfig);
  const auth = getAuth();
  var recaptchaVerifier,provider,confirmationResult;  
  onAuthStateChanged(auth,(user) => {
    if (user) {
      setUser(user);
    }
  });
  React.useEffect(()=>{
    recaptchaVerifier = new RecaptchaVerifier( "recaptcha-container", {
       size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          // this.onSignInSubmit();
        },
        defaultCountry: "IN",
    },auth);
  },[])
  
  const loginSetup = async(phoneNumber) =>{
    const number = INDIA_CODE+phoneNumber;
    const appVerifier = recaptchaVerifier;
    provider = new PhoneAuthProvider();
    signInWithPhoneNumber (auth,number,appVerifier).then((res)=>{
      window.confirmationResult=res
      console.log('first',window.confirmationResult,number);
    }).catch(err=>console.log('err', err))
  }
  
  const onOtpSubmit = (otp) => {
    console.log('otp', otp)
    PhoneAuthProvider.credential(window.confirmationResult.verificationId,otp);
    window.confirmationResult.confirm(otp)
    // then((confirmationResult) => {
    //     console.log(confirmationResult);
    //     console.log("success");
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
  //   provider.then((verifyId)=>PhoneAuthProvider
  //   .credential(verifyId,otp))
  //   .then((phoneCredential)=>signInWithCredential(phoneCredential)) 
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
