import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function MyTheaters() {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 2;
  const theaterEndPoint = import.meta.env.VITE_THEATER_END_POINT;
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YjZhYjQ4NWMxZmE1NmViNzZkYTRkMSIsIm5hbWUiOiJ0ZXN0VHJlZSIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIiLCJtb2JpbGVOdW1iZXIiOiIwNzc4ODg4ODg4Iiwic3RhdHVzIjoiQWN0aXZlIiwicm9sZSI6IlRIRUFURVJfRU1QTE9ZRUUiLCJfX3YiOjB9LCJpYXQiOjE3MDY0NzAyODUsImV4cCI6MTcwNzA3NTA4NX0.5cpb5VPIQxIlcQ1iaYOTDV8qWcEgE8JqyyQS79K7l9Y";

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
    loadAllMyTheaters(currentPage);
  }, []);

  const loadAllMyTheaters = async (page: number) => {
    try {
      const response = await axios.get(
        `${theaterEndPoint}/my?size=${2}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setTheaters(response.data.data);
      setTotalPages(response.data.pageCount);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Fail to load theaters",
      });
      console.log(err);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    loadAllMyTheaters(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    loadAllMyTheaters(currentPage - 1);
  };
  return (
    <div className="w-full h-full ">
      <div className="bg-transparent-1 m-8 rounded-lg p-8">
        <table className="w-full">
          <thead className="bg-transparent-1 text-lg text-black">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {theaters?.map((theater: any, index) => {
              const id = (currentPage - 1) * itemsPerPage + index + 1;

              return (
                <tr
                  className="text-center text-base border-b animate animate-tada"
                  key={index}
                >
                  <td className="py-2">{id}</td>
                  <td className="py-2">{theater.name}</td>
                  <td className="py-2">{theater.location}</td>
                  <td className="py-2">{theater.mobileNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
      </div>
    </div>
  );
}

export default MyTheaters;
