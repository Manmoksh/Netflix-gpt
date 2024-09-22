import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

function VideoPlay({ videoId, close }) {
  useMovieTrailer(videoId);

  const trailer = useSelector((store) => store.movie.trailerVideo);

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center ">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button onClick={close} className="absolute right-0 -top-10 text-3xl ">
          <i className="fa-solid fa-x"></i>
        </button>
        {trailer ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&loop=1`}
          ></iframe>
        ) : (
          <h1 className=" w-full h-full flex justify-center items-center">
            Sorry video not Avilable
          </h1>
        )}
      </div>
    </section>
  );
}

export default VideoPlay;
