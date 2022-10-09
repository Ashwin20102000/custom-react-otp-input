import React from 'react'
import SingleOtp from './SingleOtp';
const OtpInput = (
  {
    length,
    isNumberInput,
    autoFocus,
    disabled,
    onChangeOTP,
    inputClassName,
    inputStyle,
    ...rest
  }
) => {

  const [activeInput, setActiveInput] = React.useState(0);
  const [otpValues, setOTPValues] = React.useState(Array(length).fill(""));

      const focusInput = React.useCallback(
  (inputIndex) => {
    const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
    setActiveInput(selectedIndex);
  },
  [length]
  );

  const focusPrevInput = React.useCallback(() => {
  focusInput(activeInput - 1);
}, [activeInput, focusInput]);


  const handleOnFocus = React.useCallback( (index) => () => {
    focusInput(index);
    },
    [focusInput]
  );

    const getRightValue = React.useCallback(
    (str) => {
      let changedValue = str;

      if (!isNumberInput || !changedValue) {
        return changedValue;
      }

      return Number(changedValue) >= 0 ? changedValue : '';
      },
      [isNumberInput],
    );

    const handleOtpChange = React.useCallback(
    (otp) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
    );

  const focusNextInput = React.useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

    const changeCodeAtFocus = React.useCallback(
    (str) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || "";
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
    );
    

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
            if (pressedKey.match(/^[^0-9]$/)) {
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
      }
    },
    [activeInput, getRightValue, length, otpValues]
  );

  const onBlur = React.useCallback(() => {
  setActiveInput(-1);
  }, []);
  const handleOnChange = React.useCallback((e) => {
    const val = getRightValue(e.currentTarget.value);
    if (!val) {
      e.preventDefault();
      return;
    }
    changeCodeAtFocus(val);
    focusNextInput();
  },
  [changeCodeAtFocus, focusNextInput, getRightValue]
  );


  return (
     <div {...rest}>
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

export default OtpInput