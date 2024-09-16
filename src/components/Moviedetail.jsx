import React, { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN } from "../utils/constant";
import { useParams } from "react-router-dom";
import Divider from "./Divider";
import MovieList from "./MovieList";

function Moviedetail() {
  const [movieData, setMovieData] = useState(null);
  const [castData, setCastData] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [recommendMovie, setRecommendMovie] = useState([]);
  const { id } = useParams();
  async function fetchRecommendMovie() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      API_OPTIONS
    );

    const result = await data.json();
    setRecommendMovie(result);
  }
  async function fetchSimilarMovie() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      API_OPTIONS
    );

    const result = await data.json();
    setSimilarMovie(result);
  }
  async function fetchData() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      API_OPTIONS
    );

    const result = await data.json();
    setMovieData(result);
  }

  async function fetchCastData() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      API_OPTIONS
    );

    const result = await data.json();
    setCastData(result);
  }

  useEffect(() => {
    fetchData();
    fetchCastData();
    fetchSimilarMovie();
    fetchRecommendMovie();
  }, [id]);
  const Duration = Number(movieData?.runtime / 60)
    .toFixed(2)
    .split(".");
  const writer = castData?.crew
    ?.filter((el) => el?.known_for_department === "Writing")
    ?.map((el) => el?.name)
    ?.join(", ");
  const director = castData.crew
    ?.filter((el) => el?.job === "Director")
    ?.map((el) => el?.name)
    ?.join(", ");

  return (
    <div className="text-white/90">
      <div className="w-full h-[320px] relative hidden md:block lg:block">
        <div className="w-full h-full">
          <img
            className="h-full w-full  object-cover"
            src={IMG_CDN + movieData?.backdrop_path}
            alt="banner"
          />
        </div>
        <div className="absolute w-full h-full bg-gradient-to-t from-neutral-900/80 to-transparent top-0"></div>
      </div>
      <div className="bg-neutral-700 p-[.5px] rounded-full"></div>
      <div className="container mx-auto px-3 py-16  md:py-0 flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="md:-mt-28 relative mx-auto md:mx-0 w-fit min-w-60">
          <img
            className="h-80 w-60  object-cover rounded"
            src={IMG_CDN + movieData?.poster_path}
            alt="poster"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            {movieData?.title || movieData?.name}
          </h2>
          <p className="text-neutral-400">{movieData?.tagline}</p>
          <Divider />

          <div className="text-blue-200/70 flex items-center gap-3">
            <p>Rating : {Number(movieData?.vote_average).toFixed(2)}+</p>
            <span>|</span>
            <p>Votes : {Number(movieData?.vote_count)}</p>
            <span>|</span>
            <p>Duration :{Duration[0] + "h " + Duration[1] + "m"} </p>
          </div>
          <Divider />

          <div className="text-white/70 ">
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p className="text-white/70">{movieData?.overview}</p>
            <Divider />

            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status : {movieData?.status}</p>
              <span>|</span>
              <p>
                Release Date : {movieData?.release_date || "Not Released Yet"}
              </p>
              <span>|</span>
              <p>
                Revenue :{" "}
                {Number(movieData?.revenue) === 0
                  ? "Not Available"
                  : "$ " +
                    (Number(movieData?.revenue) / 1000000).toFixed(2) +
                    " million"}
              </p>
            </div>
            <Divider />
          </div>
          <div>
            <p>
              <span className="text-white font-semibold">Director : </span>
              {director}
            </p>
            <Divider />
            <p>
              <span className="text-white font-semibold">Writer : </span>
              {writer || "Data not available "}
            </p>
          </div>
          <Divider />
          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
            {castData?.cast
              ?.filter((el) => el.profile_path)
              ?.map((cast, index) => {
                return (
                  <div key={index}>
                    <div>
                      <img
                        className="w-24 h-24 rounded-full object-cover object-left-top"
                        src={IMG_CDN + cast?.profile_path}
                        alt="profile"
                      />
                    </div>
                    <p className="font-bold text-center text-sm">
                      {cast?.name}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div>
        {similarMovie && (
          <MovieList title={"Similar Movies"} movies={similarMovie?.results} />
        )}
        <MovieList
          title={"Recommended Movies"}
          movies={recommendMovie?.results}
        />
      </div>
    </div>
  );
}

export default Moviedetail;
