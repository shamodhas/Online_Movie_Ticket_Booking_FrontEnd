import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MovieCard from "../components/card/movie-card";
import Input from "../components/input/input";

export default function Movies() {
  const [name, setName] = useState("");
  const [director, setDirector] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [trailerLink, setTrailerLink] = useState("");
  const [image, setImage] = useState<any>(null);

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadAllMovies(1);
  }, []);

  const loadAllMovies = async (page: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/movie/all?size=4&page=" + page
      );
      setMovies(response.data.data);
      setTotalPages(response.data.pageCount);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Fail to load movies",
      });
      console.log(err);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    loadAllMovies(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    loadAllMovies(currentPage - 1);
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleSaveMovie = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("director", director);
    data.append("language", language);
    data.append("description", description);
    data.append("startDate", startDate);
    data.append("endDate", endDate);
    data.append("trailerLink", trailerLink);
    data.append("file", image);

    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showLoaderOnConfirm: true,
        showConfirmButton: false,
      });

      const response = await axios.post("http://localhost:8080/movie", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YjZhYjQ4NWMxZmE1NmViNzZkYTRkMSIsIm5hbWUiOiJ0ZXN0VHJlZSIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIiLCJtb2JpbGVOdW1iZXIiOiIwNzc4ODg4ODg4Iiwic3RhdHVzIjoiQWN0aXZlIiwicm9sZSI6IlRIRUFURVJfRU1QTE9ZRUUiLCJfX3YiOjB9LCJpYXQiOjE3MDY0NzAyODUsImV4cCI6MTcwNzA3NTA4NX0.5cpb5VPIQxIlcQ1iaYOTDV8qWcEgE8JqyyQS79K7l9Y",
        },
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Movie saved",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log(response.data);
    } catch (error: any) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <div className="m-5 flex justify-center">
        <form className="flex flex-col justify-center items-center bg-transparent-1 w-[80%] md:w-[70%] lg:w-[50%] p-8 rounded-lg">
          <h1 className="text-white mb-2">Add Movie</h1>
          <Input
            type={"text"}
            name={"movie_name"}
            placeholder={"name"}
            label={"Name"}
            optional={false}
            callBack={(e: any) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <div className="flex w-full gap-4">
            <Input
              type={"text"}
              name={"movie_director"}
              placeholder={"director"}
              label={"Director"}
              optional={false}
              callBack={(e: any) => {
                setDirector(e.target.value);
              }}
              value={director}
            />
            <Input
              type={"text"}
              name={"movie_language"}
              placeholder={"language"}
              label={"Language"}
              optional={false}
              callBack={(e: any) => {
                setLanguage(e.target.value);
              }}
              value={language}
            />
          </div>
          <Input
            type={"text"}
            name={"movie_description"}
            placeholder={"description"}
            label={"Description"}
            optional={false}
            callBack={(e: any) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
          <div className="flex w-full gap-4">
            <Input
              type={"date"}
              name={"movie_start_date"}
              placeholder={"start date"}
              label={"Start Date"}
              optional={false}
              callBack={(e: any) => {
                setStartDate(e.target.value);
              }}
              value={startDate}
            />
            <Input
              type={"date"}
              name={"movie_end_date"}
              placeholder={"end date"}
              label={"End Date"}
              optional={false}
              callBack={(e: any) => {
                setEndDate(e.target.value);
              }}
              value={endDate}
            />
          </div>
          <Input
            type={"text"}
            name={"movie_trailer_link"}
            placeholder={"trailer link"}
            label={"Trailer Link"}
            optional={false}
            callBack={(e: any) => {
              setTrailerLink(e.target.value);
            }}
            value={trailerLink}
          />
          <Input
            type={"file"}
            name={"movie_image"}
            placeholder={"image"}
            label={"image"}
            optional={false}
            callBack={handleImageChange}
          />
          <button
            type="button"
            className=" bg-green-500 py-1 px-4"
            onClick={handleSaveMovie}
          >
            Save
          </button>
        </form>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 m-5">
        {movies.map((movie: any, index) => {
          return (
            <MovieCard
              key={index}
              image={movie.imageUrl}
              name={movie.name}
              language={movie.language}
            />
          );
        })}
      </div>
      <div className="text-white flex justify-center items-center m-5">
        <button
          className="bg-transparent-1 py-1 px-5 w-fit disabled:bg-black"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 whitespace-nowrap">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="bg-transparent-1 py-1 px-5 w-fit disabled:bg-black"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
