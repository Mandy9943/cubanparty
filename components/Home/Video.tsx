"use client";
import Image from "next/image";
import { useState } from "react";

const VIDEO_URL = "/assets/video.mp4"; // Cambia por tu video

const Video = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative aspect-[970/583] w-[970px] flex items-center justify-center  overflow-hidden shadow-2xl"
      style={{
        backgroundImage: 'url("/assets/img3.jpg")', // Cambia por tu imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay oscuro para mejor contraste */}
      <div className="absolute inset-0 bg-black/40 bg-opacity-40 z-10" />

      {/* Video o botón de play */}
      {!playing ? (
        <button
          className="cursor-pointer z-20 flex items-center justify-center w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-color1 hover:bg-black transition-all shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/50"
          onClick={() => setPlaying(true)}
        >
          <Image
            src="/assets/play.png"
            alt="Play Video"
            width={35}
            height={35}
            className="ml-1 w-[20px] sm:w-[35px] "
          />
        </button>
      ) : (
        <video
          className="z-20 w-full h-full object-cover"
          src={VIDEO_URL}
          controls
          autoPlay
        />
      )}
    </div>
  );
};

export default Video;
