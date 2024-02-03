import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Theaters() {
  const [theaters, setTheaters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadAllTheaters(currentPage);
  }, []);

  const loadAllTheaters = async (page: number) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/theater/all?size=2&page=" + page
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

  return (
    <div className="w-full h-full text-white">
      <div className="bg-transparent-1 m-8 rounded-lg p-12">
        <table className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {theaters?.map((theater: any, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{theater.name}</td>
                  <td>{theater.location}</td>
                  <td>{theater.mobileNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
