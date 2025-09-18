import Header from "./header"
import Footer from "./footer"
import Background from "./background"
import VideoSource from "./../../assets/video/video.mp4"

type PageLayoutProps = {
  children: any
}

export default function PageLayout(props: PageLayoutProps) {
  return (
    <div className="w-[100%] h-[100%]">
      <Background videoSource={VideoSource} />
      <Header />
      <div className="pt-[50px]">
        <div className="mt-[10px]">{props.children}</div>
      </div>
      <Footer />
    </div>
  )
}
