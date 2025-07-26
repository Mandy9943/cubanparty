"use client";
import { useState } from "react";

const VIDEO_URL = "/assets/video.mp4"; // Cambia por tu video

const Video = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative aspect-[970/583] w-[970px]  flex items-center justify-center bg-[#0c0f22] overflow-hidden rounded-xl shadow-lg"
      style={{
        backgroundImage: 'url("/assets/img3.jpg")', // Cambia por tu imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-10" /> */}

      {/* Video o botón de play */}
      {!playing ? (
        <button
          className="z-20 flex items-center justify-center w-20 h-20 rounded-full bg-pink-500 hover:bg-pink-600 transition-all shadow-lg focus:outline-none"
          onClick={() => setPlaying(true)}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="none" />
            <polygon points="15,12 30,20 15,28" fill="#fff" />
          </svg>
        </button>
      ) : (
        <video
          className="z-20 w-full h-full object-cover rounded-xl"
          src={VIDEO_URL}
          controls
          autoPlay
        />
      )}

      {/* Decorativo: borde inferior */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-pink-500" />
    </div>
  );
};

export default Video;
