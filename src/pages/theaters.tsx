import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Theaters() {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const itemsPerPage = 2;
  const theaterEndPoint = import.meta.env.VITE_THEATER_END_POINT;

  useEffect(() => {
    loadAllTheaters(currentPage);
  }, []);

  const loadAllTheaters = async (page: number) => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.get(
        `${theaterEndPoint}/all?size=${itemsPerPage}&page=${page}`
      );

      Swal.close();
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
    loadAllTheaters(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    loadAllTheaters(currentPage - 1);
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
