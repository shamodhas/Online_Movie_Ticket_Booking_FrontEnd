import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Theater } from "../../types/theater";
import { Hall } from "../../types/hall";
import EditIcon from "../../assets/icons/edit";
import DeleteIcon from "../../assets/icons/delete";
import Input from "../../components/input/input";

function Halls() {
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState<
    Theater | null | undefined
  >(null);
  const [hall, setHall] = useState<Hall | null | undefined>(null);
  const [halls, setHalls] = useState([]);
  const [hallNumber, setHallNumber] = useState("");

  const theaterEndPoint = import.meta.env.VITE_THEATER_END_POINT;
  const hallEndPoint = import.meta.env.VITE_HALL_END_POINT;
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YjZhYjQ4NWMxZmE1NmViNzZkYTRkMSIsIm5hbWUiOiJ0ZXN0VHJlZSIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIiLCJtb2JpbGVOdW1iZXIiOiIwNzc4ODg4ODg4Iiwic3RhdHVzIjoiQWN0aXZlIiwicm9sZSI6IlRIRUFURVJfRU1QTE9ZRUUiLCJfX3YiOjB9LCJpYXQiOjE3MDY0NzAyODUsImV4cCI6MTcwNzA3NTA4NX0.5cpb5VPIQxIlcQ1iaYOTDV8qWcEgE8JqyyQS79K7l9Y";

  useEffect(() => {
    const loadMyAllTheaters = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await axios.get(`${theaterEndPoint}/my`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        Swal.close();
        setTheaters(response.data.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to load theaters",
        });
        console.error(err);
      }
    };
    loadMyAllTheaters();
  }, []);

  const handleTheaterChange = (event: any) => {
    const selectedTheaterId = event.target.value;

    const theater: Theater | null | undefined = theaters.find(
      (theater: Theater) => theater._id === selectedTheaterId
    );
    setSelectedTheater(theater);

    if (theater) {
      loadHalls(selectedTheaterId);
    } else {
      setHalls([]);
    }
  };

  const loadHalls = async (theaterId: string) => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.get(`${hallEndPoint}/theater/${theaterId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      Swal.close();
      setHalls(response.data.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to load halls",
      });
      console.error(err);
    }
  };

  const handleSaveHall = async () => {
    if (selectedTheater && selectedTheater._id) {
      const data = {
        hallNumber,
        theater: selectedTheater._id,
      };

      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        await axios.post(hallEndPoint, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        Swal.close();
        Swal.fire({
          icon: "success",
          title: "Hall saved",
          showConfirmButton: false,
          timer: 1500,
        });
        loadHalls(selectedTheater._id);
        handleReset();
      } catch (error: any) {
        Swal.close();
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
        });
        console.log(error.response.data.message);
      }
    }
  };

  const handleUpdateHall = () => {};

  const handleReset = () => {};

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="w-11/12 lg:w-1/2 bg-transparent-1  m-4 p-8 rounded-lg">
          <label className="block text-white text-xs mb-1">
            Select theater
          </label>
          <select
            onChange={handleTheaterChange}
            className="w-full rounded-lg p-1"
          >
            <option value="default">Select Theater</option>
            {theaters?.map((theater: Theater, index: number) => {
              return (
                <option key={index} value={theater._id}>
                  {theater.name + " - " + theater.location}
                </option>
              );
            })}
          </select>
          <div className="mt-5 flex flex-col justify-center text-center w-full text-white">
            <label className="text-2xl font-bold m-2">
              {selectedTheater?.name}
            </label>
            <label className="text-base font-semibold">
              {selectedTheater?.location}
            </label>
            <label className="text-base font-semibold">
              {selectedTheater?.mobileNumber}
            </label>
          </div>
        </div>
        {selectedTheater && (
          <div className="w-11/12 lg:w-1/2 bg-transparent-1  m-4 p-8 rounded-lg">
            <form className="flex flex-col justify-center items-center">
              <h1 className="text-white mb-2">
                {hall ? "Update" : "Add"} Hall
              </h1>
              <Input
                type={"text"}
                name={"hallNumber"}
                placeholder={"hall number"}
                label={"Hall Number"}
                optional={false}
                callBack={(e: any) => {
                  setHallNumber(e.target.value);
                }}
              />
              {hall ? (
                <button
                  type="button"
                  className=" bg-green-500 py-1 px-4 text-white font-semibold"
                  onClick={handleUpdateHall}
                >
                  Update
                </button>
              ) : (
                <button
                  type="button"
                  className=" bg-green-500 py-1 px-4 text-white font-semibold"
                  onClick={handleSaveHall}
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
        )}
      </div>

      {halls.length > 0 && (
        <div className="bg-transparent-1 mx-8 mb-8 p-8 w-11/12  rounded-lg">
          <table className="w-full">
            <thead className="bg-transparent-1 text-lg text-black">
              <tr>
                <th>ID</th>
                <th>Hall Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {halls?.map((hall: Hall, index: number) => {
                return (
                  <tr
                    className="text-center text-base border-b animate animate-tada"
                    key={hall._id}
                  >
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{hall.hallNumber}</td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <button className="bg-transparent-1 rounded-xl w-[35px] h-[35px] hover:bg-yellow-600 p-2">
                          <EditIcon color="white" />
                        </button>
                      </div>
                    </td>
                    <td className="py-2">
                      <div className="flex justify-center">
                        <button className="bg-transparent-1 rounded-xl w-[35px] h-[35px] hover:bg-red-600 p-2">
                          <DeleteIcon color="white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Halls;
