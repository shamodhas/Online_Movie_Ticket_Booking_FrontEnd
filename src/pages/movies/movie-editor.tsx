import { useRef, useState } from "react";
import Input from "../../components/input/input";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Movie } from "../../types/movie";
import CloseButton from "../../components/button/close-button";

function MovieEditor() {
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(
    location?.state?.movie ?? null
  );

  const [name, setName] = useState(movie ? movie.name : "");
  const [director, setDirector] = useState(movie ? movie.director : "");
  const [language, setLanguage] = useState(movie ? movie.language : "");
  const [description, setDescription] = useState(
    movie ? movie.description : ""
  );
  const [startDate, setStartDate] = useState(movie ? movie.startDate : "");
  const [endDate, setEndDate] = useState(movie ? movie.endDate : "");
  const [trailerLink, setTrailerLink] = useState(
    movie ? movie.trailerLink : ""
  );
  const [image, setImage] = useState<any>(null);

  const fileInputRef = useRef(null);
  const movieEndPoint = import.meta.env.VITE_MOVIE_END_POINT;
  const authToken = import.meta.env.VITE_AUTH;

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  const handleSaveMovie = async () => {
    const data = new FormData();
    data.append("name", name);
    data.append("director", director);
    data.append("language", language);
    data.append("description", description);
    data.append("startDate", startDate.toString());
    data.append("endDate", endDate.toString());
    data.append("trailerLink", trailerLink);
    data.append("file", image);

    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      await axios.post(movieEndPoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      Swal.close();
      Swal.fire({
        icon: "success",
        title: "Movie saved",
        showConfirmButton: false,
        timer: 1500,
      });
      handleReset();
    } catch (error: any) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
      console.log(error);
    }
  };

  const handleUpdateMovie = async () => {
    const data = {
      name,
      director,
      language,
      description,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      trailerLink,
    };

    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      await axios.put(`${movieEndPoint}/${movie?._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Movie updated",
        showConfirmButton: false,
        timer: 1500,
      });
      handleReset();
      handleClose();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Failed to update movie",
      });

      console.error(error);
    }
  };

  const handleReset = () => {
    setMovie(null);
    setName("");
    setDirector("");
    setLanguage("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setTrailerLink("");
    setImage(null);

    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    navigate("/my-movies", {
      state: { currentPage: location?.state?.currentPage ?? 1 },
    });
  };

  return (
    <div className="m-5 flex justify-center relative">
      <form className="flex flex-col justify-center items-center bg-transparent-1 w-[80%] md:w-[70%] lg:w-[50%] p-8 rounded-lg relative">
        <CloseButton callBack={handleClose} />
        <h1 className="text-white mb-2">{movie ? "Update" : "Add"} Movie</h1>
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
        <div className="flex flex-col md:flex-row w-full gap-4">
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
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Input
            type={"date"}
            name={"movie_start_date"}
            placeholder={"start date"}
            label={"Start Date"}
            optional={false}
            callBack={(e: any) => {
              setStartDate(e.target.value);
            }}
            value={startDate?.toString().split("T")[0]}
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
            value={endDate?.toString().split("T")[0]}
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

        <div className={"w-full"}>
          <label
            htmlFor="movie_image"
            className="block text-white text-xs mb-1"
          >
            Image{" "}
            <span className="text-red-600">
              {movie ? "You can't update image" : "*"}
            </span>
          </label>
          <input
            disabled={movie ? true : false}
            type="file"
            id="movie_image"
            placeholder="image"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>
        {movie ? (
          <button
            type="button"
            className=" bg-green-500 py-1 px-4 text-white font-semibold"
            onClick={handleUpdateMovie}
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            className=" bg-green-500 py-1 px-4 text-white font-semibold"
            onClick={handleSaveMovie}
          >
            Save
          </button>
        )}
        <button
          type="button"
          className=" bg-red-500 py-1 px-4 mt-2 text-white"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default MovieEditor;
