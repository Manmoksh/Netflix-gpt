import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constant";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        //success
      })
      .catch((error) => {
        //unsucess
        navigate("/error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        //user is sign out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute  px-8 y-2 bg-gradient-to-t from-black z-10 flex justify-between w-screen">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12 " src={USER_AVATAR} alt="user-icon" />
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
