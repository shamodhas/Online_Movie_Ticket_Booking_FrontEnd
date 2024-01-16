import Header from "./header";
import Footer from "./footer";
import Background from "./background";
import VideoSource from "./../../assets/vidios/video.mp4";

type PageLayoutProps = {
  children: any;
};

export default function PageLayout(props: PageLayoutProps) {
  return (
    <div className="w-[100%] h-[100%]">
      <Background videoSource={VideoSource} />
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
