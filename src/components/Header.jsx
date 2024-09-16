import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
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
    <nav className="absolute  px-8 py-2 md:py-4  bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between w-screen ">
      <Link to="/browse">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      </Link>
      {user && (
        <div className="flex p-2 justify-between items-center">
          {showGptSearch && (
            <select
              onChange={handlelangChange}
              className="p-2 m-2  bg-gray-900 text-white rounded-lg"
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
          <img
            className="hidden md:inline-block  w-12 h-12 "
            src={USER_AVATAR}
            alt="user-icon"
          />
          <button
            onClick={handleSignOut}
            className="text-xs md:text-base md:font-bold text-white md:mt-2"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default Header;
