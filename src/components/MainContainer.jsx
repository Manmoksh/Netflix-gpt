import React from "react";
import { useSelector } from "react-redux";
import VideoBackGround from "./VideoBackGround";
import VideoTitle from "./VideoTitle";

function MainContainer() {
  const movies = useSelector((store) => store.movie?.indianMovies);
  if (!movies) return;
  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;
  return (
    <section className="w-full h-full">
      <div className="md:pt-0 pt-[30%] bg-black overflow-hidden">
        <VideoTitle title={title} overview={overview} id={id} />
        <VideoBackGround id={id} />
      </div>
    </section>
  );
}

export default MainContainer;
