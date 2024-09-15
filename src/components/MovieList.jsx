import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ title, movies }) {
  return (
    <div className="px-6 text-white">
      <h1 className="text-lg md:text-3xl py-4 font-medium">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex gap-8 ">
          {movies?.map((movie) => (
            <MovieCard poster_path={movie.poster_path} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieList;
