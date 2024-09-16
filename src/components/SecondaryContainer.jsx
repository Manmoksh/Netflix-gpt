import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const movies = useSelector((store) => store.movie);

  return (
    movies.trendingMovies && (
      <div className="bg-black">
        <div className="mt-0 md:-mt-52 z-20 relative pl-4  md:pl-12">
          <MovieList title={"Trending"} movies={movies.trendingMovies} />
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"On The Air"} movies={movies.onTheAir} />
          <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
        </div>
      </div>
    )
  );
}

export default SecondaryContainer;
