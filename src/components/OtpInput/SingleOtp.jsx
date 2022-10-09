import React from 'react'
import usePrevious from '../../customHooks/usePrevious';
import "./otp.css"
const SingleOtp = (props) => {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = React.useRef(null);
  const prevFocus = usePrevious(!!focus);
  React.useLayoutEffect(() => {
    inputRef.current.style.width=20;
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input className='otp-input-fields' ref={inputRef} {...rest} />;
}

export default React.memo(SingleOtp);