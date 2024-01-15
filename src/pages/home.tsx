import { useState } from "react";
import MainImage from "./../assets/images/home-image.png";
import Demo from "./../assets/images/pexels-ambady-kolazhikkaran-14487990.jpg";
import MovieCard from "../components/movie-card";

export default function Home() {
  const [isAuth] = useState(false);

  return (
    <div className="text-white font-bold p-5">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
        <div className="flex justify-center">
          <div className="mt-0 lg:mt-[10%]">
            <h1 className="font-bold text-7xl w-fit">You Can Book</h1>
            <h1 className="font-bold text-7xl w-fit">Movie Now</h1>
            <p className="text-md font-medium text-gray-400 mt-8">
              See what movies are available, <br />
              reserve a seat at the place you want, <br />
              and everything from one place
            </p>
            <div className="mt-8 flex justify-between gap-2">
              <button className="bg-transparent-1 border border-[#BDC3C7] hover:bg-[#BDC3C7] font-bold">
                All Movies
              </button>
              <button className="bg-transparent-1 border border-[#BDC3C7] hover:bg-[#BDC3C7] font-bold">
                {isAuth ? "Book Now" : "Sign in first"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img src={MainImage} alt="main image" />
        </div>
      </div>
      <div className="mt-8 text-black lg:text-white">
        <h1>Latest movies</h1>
        <div className="grid grid-cols-5 gap-4">
          <MovieCard image={Demo} name="Leo" lang="Tamil"/>
          <MovieCard image={Demo} name="Leo" lang="Tamil"/>
          <MovieCard image={Demo} name="Leo" lang="Tamil"/>
          <MovieCard image={Demo} name="Leo" lang="Tamil"/>
          <MovieCard image={Demo} name="Leo" lang="Tamil"/>

        </div>
      </div>
    </div>
  );
}
