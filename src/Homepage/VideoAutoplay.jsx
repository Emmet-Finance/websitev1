import React, { useRef, useEffect } from 'react';
import Video from '../assets/img/bg-video_1.mp4';

export default function VideoAutoplay() {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch(error => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
        <video
          playsInline
          loop
          muted
          alt="All the devices"
          src={Video}
          ref={videoEl}
        />
  );
}
