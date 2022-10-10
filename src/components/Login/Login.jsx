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
      <div className='my-2' id="recaptcha-container"></div>
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
      </Form>
      :
      <div className='d-flex flex-column '>
      <h1>Enter OTP</h1>
        <OtpInput
        autoFocus
        length={6}
        onChangeOTP={(otp) => setOtp(otp)}
        />
        <Button onClick={()=>{props.onOtpSubmit(otp)} }>Submit</Button>
      </div>
      }
    </div>
  )
}

export default Login