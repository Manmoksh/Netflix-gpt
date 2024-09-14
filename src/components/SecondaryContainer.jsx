import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector((store) => store.movie);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-52 z-20 relative pl-12">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
}

export default SecondaryContainer;
