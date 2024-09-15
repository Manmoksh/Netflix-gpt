import GptSearchBar from "./GptSearchBar";
import { BANNER } from "../utils/constant";
import GptMovieSuggestion from "./GptMovieSuggestion";

function GptSearch() {
  return (
    <>
      <div
        className="min-h-screen w-full  "
        style={{ backgroundImage: `url(${BANNER})` }}
      >
        <div className="">
          <GptSearchBar />
          <GptMovieSuggestion />
        </div>
      </div>
    </>
  );
}

export default GptSearch;
