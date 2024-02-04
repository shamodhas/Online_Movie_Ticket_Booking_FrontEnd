import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Theater } from "../../types/theater";
import CloseButton from "../../components/button/close-button";

function TheaterEditor() {
  const location = useLocation();
  const navigate = useNavigate();

  const [theater, setTheater] = useState<Theater | null>(
    location?.state?.theater ?? null
  );

  const handleSaveTheater = () => {};

  const handleUpdateTheater = () => {};

  const handleReset = () => {
    setTheater(null);
  };

  const handleClose = () => {
    navigate("/my-theaters", {
      state: { currentPage: location?.state?.currentPage ?? 1 },
    });
  };

  return (
    <div className="m-5 flex justify-center relative">
      <form className="flex flex-col justify-center items-center bg-transparent-1 w-[80%] md:w-[70%] lg:w-[50%] p-8 rounded-lg relative">
        <CloseButton
          className={
            "absolute top-[-5px] right-[-5px] hover:w-[30px] hover:right-[-7px] hover:h-[30px] hover:top-[-7px] hover:text-xl"
          }
          callBack={handleClose}
        />
        <h1 className="text-white mb-2">
          {theater ? "Update" : "Add"} Theater
        </h1>

        {theater ? (
          <button
            type="button"
            className=" bg-green-500 py-1 px-4 text-white font-semibold"
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
  );
}

export default TheaterEditor;
