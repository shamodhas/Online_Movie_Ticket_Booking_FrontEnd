import { Route, Routes } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/layout/layout";
import Home from "./pages/home";
import VideoSource from "./assets/vidios/video.mp4";

function App() {
  return (
    <div>
      <div className="h">
        <video
          className="absolute w-[100%] h-[100%] object-cover z-[-10]"
          autoPlay
          loop
          muted
          preload="none"
        >
          <source src={VideoSource} type="video/mp4" />
          <source src={VideoSource} type="video/ogg" />
          not support Video
        </video>
        <div className="absolute w-[100%] h-[100%] bg-black z-[-5] opacity-[.5]"></div>
      </div>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PageLayout>
    </div>
  );
}

export default App;
