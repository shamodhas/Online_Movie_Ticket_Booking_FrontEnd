import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EditIcon from "../../assets/icons/edit";
import DeleteIcon from "../../assets/icons/delete";

function MyTheaters() {
  const navigate = useNavigate();
  const location = useLocation();

  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(
    location?.state?.currentPage ?? 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 2;
  const theaterEndPoint = import.meta.env.VITE_THEATER_END_POINT;
  const authToken = import.meta.env.VITE_AUTH;

  useEffect(() => {
    loadAllMyTheaters(currentPage);
  }, []);

  const loadAllMyTheaters = async (page: number) => {
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.get(
        `${theaterEndPoint}/my?size=${2}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      Swal.close();
      setTheaters(response.data.data);
      setTotalPages(response.data.pageCount);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to load theaters",
      });
      console.error(err);
      navigate("/login");
    }
  };

  const handleDeleteTheater = async (theater: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this theater!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await axios.delete(`${theaterEndPoint}/${theater._id}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          return "Deleted successfully";
        } catch (error: any) {
          Swal.showValidationMessage(
            `Request failed: ${error.response.data.message}`
          );
          console.error(error);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", result.value, "success");
        loadAllMyTheaters(currentPage);
      }
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    loadAllMyTheaters(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    loadAllMyTheaters(currentPage - 1);
  };

  const handleGoAddTheater = () => {
    navigate("/theater-editor", {
      state: { currentPage },
    });
  };

  const handleGoAddHalls = () => {
    navigate("/theater-halls", {
      state: { currentPage },
    });
  };

  const handleEditTheater = (theater: any) => {
    navigate("/theater-editor", {
      state: { theater, currentPage },
    });
  };

  return (
    <div className="w-full h-full ">
      <div className="flex justify-center items-center mt-5 text-white gap-4">
        <button
          onClick={handleGoAddTheater}
          className="bg-transparent-1 font-bold text-xl py-1 px-5 w-fit hover:text-black hover:bg-white"
        >
          Add New Movie
        </button>
        <button
          onClick={handleGoAddHalls}
          className="bg-transparent-1 font-bold text-xl py-1 px-5 w-fit hover:text-black hover:bg-white"
        >
          Halls
        </button>
      </div>
      <div className="bg-transparent-1 m-8 rounded-lg p-8">
        <table className="w-full">
          <thead className="bg-transparent-1 text-lg text-black">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Edit</th>
              <th>Delete</th>
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
                  <td className="py-2">
                    <div className="flex justify-center">
                      <button
                        className="bg-transparent-1 rounded-xl w-[35px] h-[35px] hover:bg-yellow-600 p-2"
                        onClick={() => {
                          handleEditTheater(theater);
                        }}
                      >
                        <EditIcon color="white" />
                      </button>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex justify-center">
                      <button
                        className="bg-transparent-1 rounded-xl w-[35px] h-[35px] hover:bg-red-600 p-2"
                        onClick={() => {
                          handleDeleteTheater(theater);
                        }}
                      >
                        <DeleteIcon color="white" />
                      </button>
                    </div>
                  </td>
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
