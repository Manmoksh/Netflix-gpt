import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center bg-neutral-600 bg-opacity-35 text-neutral-400 m-2 md:p-4">
      <div className="flex items-center justify-center gap-4">
        <Link to="/">About</Link>
      </div>
      <p className="text-sm md:mt-2 ">
        &copy;Developed By <span className="text-white">Manmoksh</span>
      </p>
    </footer>
  );
}

export default Footer;
