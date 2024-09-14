import React from "react";
import GptSearchBar from "./GptSearchBar";
import { BANNER } from "../utils/constant";
import GptMovieSuggestion from "./GptMovieSuggestion";

function GptSearch() {
  return (
    <div className="">
      <div className="absolute -z-40">
        <img src={BANNER} alt="banner" />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
}

export default GptSearch;
