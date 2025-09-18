import { useState } from "react"
import fallbackImage from "../../assets/images/background.jpg"

export default function Background() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const videoURL =
    "https://firebasestorage.googleapis.com/v0/b/hyper-tech-425e4.firebasestorage.app/o/movie-booking-system-images%2Fvideo.mp4?alt=media&token=2bc0d775-a37b-47b0-8e4e-c7ab4619c9b9"

  return (
    <div className="relative w-full h-full">
      {/* Video */}
      <video
        className={`fixed w-full h-full object-cover z-[-10] ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-700`}
        autoPlay
        loop
        muted
        preload="auto"
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      >
        <source src={videoURL} type="video/mp4" />
        <source src={videoURL} type="video/ogg" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback image */}
      {!isVideoLoaded && (
        <div className="fixed w-full h-full z-[-10]">
          <img
            src={fallbackImage}
            alt="Loading video..."
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="fixed w-full h-full bg-black z-[-1] opacity-50"></div>
    </div>
  )
}
