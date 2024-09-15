import React from "react";
import { IMG_CDN } from "../utils/constant";

function MovieCard({ poster_path }) {
  if (!poster_path) return null;
  return (
    <div className="w-36  md:w-48 hover:scale-90  duration-500 cursor-pointer ">
      <img className="rounded-lg" src={IMG_CDN + poster_path} alt="movie" />
    </div>
  );
}

export default MovieCard;
