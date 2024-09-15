import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { model } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice";

function GptSearchBar() {
  const langkey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  //search movie in tmdb
  async function searchMovie(movie) {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const result = await data.json();
    return result.results;
  }
  function handleSearch() {
    aiRun();
  }

  async function aiRun() {
    const gptQuery =
      "Act as a movie recommendation system and suggest some movies for queries:" +
      searchText.current.value +
      ". only give me names of 5 movies,comma seperated like the exaple result given ahead.Examle result:Gadar, Sholay , 3 idiots ,Koi mil gaya ,Hunters";
    const result = await model.generateContent(gptQuery);
    const response = result.response;
    const text = response.text();

    const gptMovies = text.split(", ");

    const promiseArray = gptMovies.map((movie) => searchMovie(movie));
    //[promise,p,p,p,p,]

    const tmdbResults = await Promise.all(promiseArray);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  }

  // button event trigger to consume gemini Api

  return (
    <div className="pt-[40%] md:pt-[10%]  flex justify-center">
      <form
        className=" w-[80%] md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          onClick={handleSearch}
          className="py-2 px-4 bg-red-700 text-white rounded-lg col-span-3 m-4"
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
