import { useContext, useRef, useState } from "react"
import Input from "../../../components/input/input"
import Swal from "sweetalert2"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { Movie } from "../../../types/movie"
import CloseButton from "../../../components/button/close-button"
import UserContext from "../../../context/user-context"
import LoadingContext from "../../../context/loading-context"
import { createMovie } from "../../../services/movie"
import { MessageType, notifyMessage } from "../../../utility/commonFunc"

function MovieEditor() {
  const location = useLocation()
  const navigate = useNavigate()
  const [user] = useContext(UserContext)
  const [, setLoading] = useContext(LoadingContext)

  const [movie, setMovie] = useState<any | null>(location?.state?.movie ?? null)

  const [title, setTitle] = useState(movie ? movie.title : "")
  const [description, setDescription] = useState(movie ? movie.description : "")
  const [releaseDate, setReleaseDate] = useState(movie ? movie.releaseDate : "")
  const [director, setDirector] = useState(movie ? movie.director : "")
  const [status, setStatus] = useState(movie ? movie.status : "")
  const [image, setImage] = useState<any>(null)

  const fileInputRef = useRef(null)

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0]
    setImage(imageFile)
  }

  const handleSaveMovie = async () => {
    console.log(image)
    const data = new FormData()
    data.append("userId", user.id)
    data.append("title", title) //
    data.append("description", description)
    data.append("releaseDate", releaseDate) //
    data.append("director", director) //
    data.append("status", status) //
    data.append("file", image)
    
    setLoading(true)
    await createMovie(data)
      .then((res) => {
        if (res.success) {
           notifyMessage(
             MessageType.Success,
             "Done."
           )
            handleReset()
            handleClose()
        }else {
          notifyMessage(
            MessageType.Error,
            "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
          )
        }
      })
      .finally(() => {
        setLoading(false)
      })
    // }
  }

  const handleUpdateMovie = async () => {
    // const data = {
    //   name,
    //   director,
    //   language,
    //   description,
    //   startDate: startDate.toString(),
    //   endDate: endDate.toString(),
    //   trailerLink
    // }
    // try {
    //   Swal.fire({
    //     title: "Loading...",
    //     allowOutsideClick: false,
    //     showConfirmButton: false
    //   })
    //   await axios.put(`${movieEndPoint}/${movie?._id}`, data, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${authToken}`
    //     }
    //   })
    //   Swal.fire({
    //     icon: "success",
    //     title: "Movie updated",
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   handleReset()
    //   handleClose()
    // } catch (error: any) {
    //   Swal.fire({
    //     icon: "error",
    //     title: error.response?.data?.message || "Failed to update movie"
    //   })
    //   console.error(error)
    // }
  }

  const handleReset = () => {
    setMovie(null)
    setTitle("")
    setDescription("")
    setReleaseDate("")
    setDirector("")
    setStatus("")
    setImage(null)

    if (fileInputRef.current) {
      // @ts-ignore
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    navigate("/my-movies", {
      state: { currentPage: location?.state?.currentPage ?? 1 }
    })
  }

  return (
    <div className="m-5 flex justify-center relative">
      <form className="flex flex-col justify-center items-center bg-transparent-1 w-[80%] md:w-[70%] lg:w-[50%] p-8 rounded-lg relative">
        <CloseButton callBack={handleClose} />
        <h1 className="text-white mb-2">{movie ? "Update" : "Add"} Movie</h1>
        <Input
          type={"text"}
          name={"title"}
          placeholder={"title"}
          label={"Title"}
          optional={false}
          callBack={(e: any) => {
            setTitle(e.target.value)
          }}
          value={title}
        />
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Input
            type={"text"}
            name={"director"}
            placeholder={"director"}
            label={"Director"}
            optional={false}
            callBack={(e: any) => {
              setDirector(e.target.value)
            }}
            value={director}
          />
          {/* <Input
            type={"text"}
            name={"status"}
            placeholder={"status"}
            label={"Status"}
            optional={false}
            callBack={(e: any) => {
              setStatus(e.target.value)
            }}
            value={status}
          /> */}
          <select
            name={"status"}
            value={status}
            onChange={(e: any) => {
              setStatus(e.target.value)
            }}
          >
            <option value="">Select Status</option>
            <option value="upcoming">Select upcoming</option>
            <option value="nowShowing">Select nowShowing</option>
            <option value="past">Select past</option>
          </select>
        </div>
        <Input
          type={"text"}
          name={"description"}
          placeholder={"description"}
          label={"Description"}
          optional={false}
          callBack={(e: any) => {
            setDescription(e.target.value)
          }}
          value={description}
        />
        <div className="flex flex-col md:flex-row w-full gap-4">
          <Input
            type={"date"}
            name={"releaseDate"}
            placeholder={"release date"}
            label={"Release Date"}
            optional={false}
            callBack={(e: any) => {
              setReleaseDate(e.target.value)
            }}
            value={releaseDate?.toString().split("T")[0]}
          />
          <Input
            type={"text"}
            name={"description"}
            placeholder={"description"}
            label={"Description"}
            optional={false}
            callBack={(e: any) => {
              setDescription(e.target.value)
            }}
            value={description}
          />
        </div>

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
            name="file"
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
  )
}

export default MovieEditor
