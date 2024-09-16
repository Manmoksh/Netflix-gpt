import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

function useMovieTrailer(id) {
  const dispatch = useDispatch();
  // const trailerVideo = useSelector((store) => store.movie.trailerVideo);

  async function getTrailer() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const result = await data.json();

    const filterData = result?.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filterData.length ? filterData[0] : result.results[0];

    dispatch(addTrailerVideo(trailer));
  }
  useEffect(() => {
    getTrailer();
  }, []);
}

export default useMovieTrailer;
