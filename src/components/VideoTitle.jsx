import React, { useState } from "react";
import VideoPlay from "./VideoPlay";

function VideoTitle({ title, overview, id }) {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState("");
  function handlePlayVideo(data) {
    // useMovieTrailer(data.id);
    setVideoId(data);
    setPlayVideo(true);
  }
  return (
    <div className="pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="font-bold text-xl md:text-6xl">{title}</h1>
      <p className="hidden md:block text-lg py-6 w-1/4 text-ellipsis">
        {overview}
      </p>
      <div className="mt-4">
        <button
          onClick={() => handlePlayVideo(id)}
          className="bg-white text-black md:py-4  py-1 px-2 md:px-12 md:text-xl text-sm rounded-lg  hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
        >
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 bg-opacity-50 text-white p-4  px-12 text-xl rounded-lg hover:bg-opacity-80 duration-300  transition-opacity">
          <i className="fa-solid fa-circle-info mr-1"></i>More Info
        </button>
      </div>
      {playVideo && (
        <VideoPlay videoId={videoId} close={() => setPlayVideo(false)} />
      )}
    </div>
  );
}

export default VideoTitle;
