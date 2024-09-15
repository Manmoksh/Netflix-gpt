import { useSelector } from "react-redux";
import MovieList from "./MovieList";

function GptMovieSuggestion() {
  const gpt = useSelector((store) => store.gpt);

  const { movieResults, movieNames } = gpt;

  // if (!movieNames) return null;
  console.log(movieNames);
  return (
    <div className="bg-opacity-90 -4 m-4 bg-black text-white">
      <div>
        {movieNames?.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default GptMovieSuggestion;
