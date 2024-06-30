import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Theater } from "../../../types/theater"
import CloseButton from "../../../components/button/close-button"
import Input from "../../../components/input/input"
import Swal from "sweetalert2"
import axios from "axios"
import { createTheater } from "../../../services/theaters"
import LoadingContext from "../../../context/loading-context"
import { MessageType, notifyMessage } from "../../../utility/commonFunc"
import UserContext from "../../../context/user-context"

function TheaterEditor() {
  const use_location = useLocation()
  const navigate = useNavigate()

  const [theater, setTheater] = useState<Theater | null>(
    use_location?.state?.theater ?? null
  )
  const [name, setName] = useState(theater?.name ? theater.name : "")
  const [location, setLocation] = useState(
    theater?.location ? theater.location : ""
  )
  const [mobileNumber, setMobileNumber] = useState(
    theater?.mobileNumber ? theater?.mobileNumber : ""
  )

  const theaterEndPoint = import.meta.env.VITE_THEATER_END_POINT
  const authToken = import.meta.env.VITE_AUTH
  const [, setLoading] = useContext(LoadingContext)
  const [user] = useContext(UserContext)

  const handleSaveTheater = async () => {
    setLoading(true)
    await createTheater({
      name,
      location,
      userId: user.id
    })
      .then((res) => {
        if (res.success) {
          notifyMessage(MessageType.Success, "Done.")
          handleReset()
          handleClose()
        } else {
          notifyMessage(
            MessageType.Error,
            "Connection refused: Unable to connect to the server. Please check your internet connection or try again later."
          )
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateTheater = async () => {
    const data = {
      name,
      location,
      mobileNumber
    }

    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        showConfirmButton: false
      })

      await axios.put(`${theaterEndPoint}/${theater?._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        }
      })

      Swal.close()
      Swal.fire({
        icon: "success",
        title: "Theater updated",
        showConfirmButton: false,
        timer: 1500
      })
      handleReset()
      handleClose()
    } catch (error: any) {
      Swal.close()
      Swal.fire({
        icon: "error",
        title: error.response.data.message
      })
      console.log(error)
    }
  }

  const handleReset = () => {
    setTheater(null)
    setName("")
    setLocation("")
    setMobileNumber("")
  }

  const handleClose = () => {
    navigate("/theaters")
  }

  return (
    <div className="m-5 flex justify-center relative">
      <form className="flex flex-col justify-center items-center bg-transparent-1 w-[80%] md:w-[70%] lg:w-[50%] p-8 rounded-lg relative">
        <CloseButton callBack={handleClose} />
        <h1 className="text-white mb-2">
          {theater ? "Update" : "Add"} Theater
        </h1>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"name"}
          label={"Name"}
          optional={false}
          value={name}
          callBack={(e: any) => {
            setName(e.target.value)
          }}
        />
        <Input
          type={"text"}
          name={"location"}
          placeholder={"location"}
          label={"Location"}
          optional={false}
          value={location}
          callBack={(e: any) => {
            setLocation(e.target.value)
          }}
        />
        {theater ? (
          <button
            type="button"
            className=" bg-yellow-500 py-1 px-4 text-white font-semibold"
            onClick={handleUpdateTheater}
          >
            Update
          </button>
        ) : (
          <button
            type="button"
            className=" bg-green-500 py-1 px-4 text-white font-semibold"
            onClick={handleSaveTheater}
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

export default TheaterEditor
