import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllTheaters } from "../../../services/theaters";
import { toast } from "react-toastify";
import LoadingContext from "../../../context/loading-context";

export default function Theaters() {
    const [, setLoading] = useContext(LoadingContext)

  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getDataHandler(currentPage)
  }, [currentPage])

  const getDataHandler = async (page: number) => {
    setLoading(true)
    await getAllTheaters(page, 5)
      .then((res) => {
        if (res.success) {
          setTheaters(res.data ?? [])
          setTotalPages(res.pageCount ?? 0)
        } else {
          toast.error("Fail to load data")
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    getDataHandler(currentPage + 1)
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    getDataHandler(currentPage - 1)
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
              const id = index + 1;

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
