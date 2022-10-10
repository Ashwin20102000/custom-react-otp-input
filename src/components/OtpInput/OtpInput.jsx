import React from 'react'
import SingleOtp from './SingleOtp';
import "./otp.css"

const OtpInput = (
  {
    length,
    Input,
    autoFocus,
    disabled,
    onChangeOTP,
    inputClassName,
    inputStyle,
    ...rest
  }
) => {

 
  const [activeInput, setActiveInput] = React.useState(0);
  const [otpValues, setOTPValues] = React.useState(Array(length).fill(''));

  // Helper to return OTP from inputs
  const handleOtpChange = React.useCallback(
    (otp) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP],
  );

  // Helper to return value with the right type: 'text' or'
  const getRightValue = React.useCallback(
    (str) => {
      let changedValue = str;

      if (!Input || !changedValue) {
        return changedValue;
      }

      retur(changedValue) >= 0 ? changedValue : '';
    },
    [Input],
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = React.useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues],
  );

  // Focus `inputIndex` input
  const focusInput = React.useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length],
  );

  const focusPrevInput = React.useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = React.useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = React.useCallback(
    (index) => () => {
      focusInput(index);
    },
    [focusInput],
  );

  // Handle onChange value for each input
  const handleOnChange = React.useCallback(
    (e) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue],
  );

  // Handle onBlur input
  const onBlur = React.useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = React.useCallback(
    (e) => {
      const pressedKey = e.key;

      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default: {
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }

          break;
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues],
  );

  const handleOnPaste = React.useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('');
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
        handleOtpChange(updatedOTPValues);
      }
    },
    [activeInput, getRightValue, length, otpValues],
  );


  return (
     <div className='otp-input-fields' {...rest}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <SingleOtp
           key={`SingleInput-${index}`}
            focus={activeInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={autoFocus}
            onFocus={handleOnFocus(index)}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={onBlur}
            onPaste={handleOnPaste}
            style={inputStyle}
            className={inputClassName}
            disabled={disabled}
          />
        ))}
    </div>
  )
}

export default React.memo(OtpInput);