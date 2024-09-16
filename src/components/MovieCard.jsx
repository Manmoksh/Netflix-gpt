import React from "react";
import { IMG_CDN } from "../utils/constant";
import { Link } from "react-router-dom";

function MovieCard({ poster_path, id, title }) {
  if (!poster_path) return null;
  return (
    <Link to={"/movie/" + id}>
      <div className="w-36  md:w-48 hover:scale-90  duration-500 cursor-pointer relative overflow-hidden">
        {poster_path ? (
          <img className="rounded-xl" src={IMG_CDN + poster_path} alt="movie" />
        ) : (
          <div className="bg-neutral-800 h-full w-full flex justify-center items-center">
            No image found
          </div>
        )}
        <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-4 rounded-b-xl">
          <h1 className="text-ellipsis line-clamp-1 text-lg font-semibold">
            {title || ""}
          </h1>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
