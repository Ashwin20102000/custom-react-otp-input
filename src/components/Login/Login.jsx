import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import OtpInput from '../OtpInput/OtpInput';
import  './login.css';
const Login = (props) => {
  const [number,setNumber] = React.useState("");
  const [otpShow,setOtpShow] = React.useState(false);
  const [otp,setOtp] = React.useState("");
  const onPhoneSubmit = (event) =>{
    event.preventDefault();
    if(number.length===10 && isFinite(number)){
      setOtpShow(true);
      props.loginSetup(number);
    }
  }
  return (
    <div style={{height:"19rem"}} className='d-flex p-5 rounded  align-items-center border'>
     {
      !otpShow?
      <Form onSubmit={onPhoneSubmit}>
        <Form.Group>
          <Form.Label>
            Phone Number
          </Form.Label>
          <InputGroup className='my-3'>
            <InputGroup.Text>
            🇮🇳 +91
            </InputGroup.Text>
          <Form.Control  
          placeholder="Enter Number"
          onChange={e=>{
            if(e.target.value.length>10){
              return;
            }
            setNumber(e.target.value?e.target.value:"")
          }}
          value={number}
          className='shadow-none noSpin' required  type='number'>
          </Form.Control>
          </InputGroup>
        </Form.Group>
          <Button className='mt-2  me-2' type='submit'>Login</Button>
          <Button variant='secondary-outline' className='mt-2'>Create Id</Button>
      <div className='my-2' id="recaptcha-container"></div>
      </Form>
      :
      <div className='d-flex flex-column'>
      <h1>Enter OTP</h1>
      
      {/* <div class="otp-input-fields">
        <input type="number" className="otp__digit otp__field__1" />
        <input type="number" className="otp__digit otp__field__2" />
        <input type="number" className="otp__digit otp__field__3" />
        <input type="number" className="otp__digit otp__field__4" />
        <input type="number" className="otp__digit otp__field__5" />
        <input type="number" /> 
        </div> */}
        <OtpInput
        length={6}
        onChangeOTP={()=>{}}
        />
      </div>
      }
    </div>
  )
}

export default Login