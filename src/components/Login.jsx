import React, { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Header from "./Header";
import { checkvalidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BANNER } from "../utils/constant";

function Login() {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  function handleButtonClick() {
    //validate form data
    const msg = checkvalidData(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    //create a new user/sign in

    if (!isSignInForm) {
      //Sign Up

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          }).then(() => {
            const { uid, email, displayName } = auth.currentUser;
            dispatch(
              addUser({ uid: uid, email: email, displayName: displayName })
            );
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg("Email already in use");
        });
    } else {
      //Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          //signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg("Invalid Email/Password");
        });
    }
  }
  function toggleSignIn() {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div
        className="h-screen w-full fixed"
        style={{ backgroundImage: `url(${BANNER})` }}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-[80%] md:w-3/12 p-4  md:p-12 bg-black bg-opacity-80 absolute mt-24  mx-auto left-0 right-0 text-white"
        >
          <h1 className="font-bold text-xl md:text-3xl py-1 md:py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-1 md:my-2 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="p-4 my-1 md:my-2 w-full bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-1 md:my-2  w-full bg-gray-700"
          />
          <p className="text-red-500 font-bold text-lg p-2">{errorMsg}</p>
          <button
            className="p-4 my-2 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          {isSignInForm && (
            <div className="flex justify-center">
              <details>
                <summary className="text-red-700">Mock Login</summary>
                <p>Email:test@test.com</p>
                <p>Password:Test@1234</p>
              </details>
            </div>
          )}
          <p onClick={toggleSignIn} className="py-2 cursor-pointer">
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already Sign Up? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
