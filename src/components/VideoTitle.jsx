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
      <h1 className="font-bold text-xl md:text-3xl">{title}</h1>
      <p className="hidden md:block text-base py-2 w-2/5 line-clamp-2 ">
        {overview}
      </p>
      <div className="mt-4">
        <button
          onClick={() => handlePlayVideo(id)}
          className="bg-white text-black md:py-2  py-1 px-2 md:px-6 md:text-lg text-sm rounded-lg  hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
        >
          <i className="fa-solid fa-play"></i> Play
        </button>
      </div>
      {playVideo && (
        <VideoPlay videoId={videoId} close={() => setPlayVideo(false)} />
      )}
    </div>
  );
}

export default VideoTitle;
