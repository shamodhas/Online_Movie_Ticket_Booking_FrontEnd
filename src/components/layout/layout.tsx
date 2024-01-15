import Header from "./header";
import Footer from "./footer";

type PageLayoutProps = {
  children: any;
};

export default function PageLayout(props: PageLayoutProps) {
  return (
    <div className="w-[100%] h-[100%]">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
