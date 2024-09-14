import React from "react";
import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackGround";
import VideoTitle from "./VideoTitle";

function MainContainer() {
  const movies = useSelector((store) => store.movie?.nowPlayingMovies);
  if (!movies) return;
  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;
  return (
    <div>
      <VideoTitle title={title} overview={overview} />
      <VideoBackGround id={id} />
    </div>
  );
}

export default MainContainer;
