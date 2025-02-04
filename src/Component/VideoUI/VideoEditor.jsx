import React, { useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const VideoEditor = () => {
  const videoRef = useRef(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
      setEndTime(videoRef.current.duration);
    }
  };

  const handleTrimChange = (event) => {
    const [start, end] = event.target.value.split(',').map(Number);
    setStartTime(start);
    setEndTime(end);
  };

  const playTrimmedVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
      const interval = setInterval(() => {
        if (videoRef.current.currentTime >= endTime) {
          videoRef.current.pause();
          clearInterval(interval);
        }
      }, 500);
    }
  };

  return (
    <>
    <div class="container mt-4">
        <h1 class="text-center">Video Cropping Tool</h1>
        <div class="card">
          <div class="card-body">
            <div class="row">
              {/* <!-- Left Column - Video --> */}
              <div class="col-md-6">
                <video
                  ref={videoRef}
                  controls
                  onLoadedMetadata={handleLoadedMetadata}
                  class="w-100 mb-3"
                >
                  <source src="animatedvideo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* <!-- Right Column - Controls --> */}
              <div class="col-md-6">
                <input
                  type="range"
                  class="form-range"
                  min="0"
                  max={videoDuration}
                  step="0.1"
                  onChange={(e) => setStartTime(Number(e.target.value))}
                />
                <input
                  type="range"
                  class="form-range mt-2"
                  min="0"
                  max={videoDuration}
                  step="0.1"
                  onChange={(e) => setEndTime(Number(e.target.value))}
                />
                <div class="d-flex justify-content-between mt-3">
                  <button class="btn btn-primary" onClick={playTrimmedVideo}>
                    Play Cropped Video
                  </button>
                </div>
                <div class="mt-4 p-3 border rounded">
                  <h5>Selected Clip Details:</h5>
                  <p>Start Time: {startTime.toFixed(2)}s</p>
                  <p>End Time: {endTime.toFixed(2)}s</p>
                  <p>Duration: {(endTime - startTime).toFixed(2)}s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default VideoEditor;