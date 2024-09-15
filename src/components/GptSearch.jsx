import GptSearchBar from "./GptSearchBar";
import { BANNER } from "../utils/constant";
import GptMovieSuggestion from "./GptMovieSuggestion";

function GptSearch() {
  return (
    <div>
      <div className="fixed -z-10">
        <img src={BANNER} alt="banner" />
      </div>

      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  );
}

export default GptSearch;
