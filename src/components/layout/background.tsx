
type BackgroundProps={
    videoSource:string
}

export default function Background({videoSource}:BackgroundProps) {
  return (
    <div>
      <video
        className="fixed w-[100%] h-[100%] object-cover z-[-10]"
        autoPlay
        loop
        muted
        preload="none"
      >
        <source src={videoSource} type="video/mp4" />
        <source src={videoSource} type="video/ogg" />
        not support Video
      </video>
      <div className="fixed w-[100%] h-[100%] bg-black z-[-1] opacity-[.5]"></div>
    </div>
  )
}
