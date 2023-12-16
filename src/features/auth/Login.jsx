import React, { useState } from "react";
import "./login.css";
import SliderLogin from "./SliderLogin";
import SingIn from "./forms/SingIn";
import SingUp from "./forms/SingUp";

const Login2 = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);
  const [loginData, setLoginData] = useState({});

  const handleToggleClick = () => {
    setSignUpMode(!isSignUpMode);
  };
  const loginMode = (email, password) => {
    setFirstLogin(true);
    setLoginData({
      email: email,
      password: password,
    });
    setSignUpMode(false);
    // console.log(email+" "+password);

  };
  return (
    <main className={isSignUpMode ? "sign-up-mode" : ""}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <SingIn
              handleToggleClick={handleToggleClick}
              firstLogin={firstLogin}
              loginData={loginData}
            />
            <SingUp handleToggleClick={handleToggleClick} login={loginMode} />
          </div>
          <SliderLogin />
        </div>
      </div>
    </main>
  );
};
export default Login2;
