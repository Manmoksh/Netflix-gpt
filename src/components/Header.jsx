import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANG, USER_AVATAR } from "../utils/constant";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLang } from "../utils/configSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
  function handleGptSearch() {
    dispatch(toggleGptSearch());
  }
  function handlelangChange(e) {
    dispatch(changeLang(e.target.value));
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
    <div className="absolute  px-8 py-4  bg-gradient-to-b from-black z-10 flex justify-between w-screen">
      <img className="w-44" src={LOGO} alt="logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              onChange={handlelangChange}
              className="p-2 m-2  bg-gray-900 text-white"
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 bg-purple-600 text-white rounded-lg mx-4 my-2"
            onClick={handleGptSearch}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img className="w-12 h-12 " src={USER_AVATAR} alt="user-icon" />
          <button onClick={handleSignOut} className="font-bold text-white mt-2">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
