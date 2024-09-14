import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        //success
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  }
  return (
    <div className="absolute  px-8 y-2 bg-gradient-to-b from-black z-10 flex justify-between w-screen">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && (
        <div className="flex p-2">
          <img
            className="w-12 h-12 "
            src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCXfE7SB58j4afPD54nAb_PTXPl42LAIYtsg&s"
            alt="user-icon"
          />
          <p>{user.displayName}</p>
          <button onClick={handleSignOut} className="font-bold text-white mt-2">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
