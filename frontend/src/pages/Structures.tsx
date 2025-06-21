import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth, StructureCompleteData } from "../context/AuthContext";

import img_struttura_sanitaria from "../../public/struttura-sanitaria.png";
import StructureDetails from "./StructureDetail";

const Structures = () => {
  const { user } = useAuth();

  const [structures, setStructures] = useState<StructureCompleteData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(
    null
  );

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/paginated_structures?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setStructures(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Error in the recovery of the structures", err);
      });
  }, [currentPage, user?.token]);

  const addPreferredStructure = async (structure_id: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/preferred_structure/${structure_id}`,
        { structure_id },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      alert("Structure added among its favorites!");
      window.location.reload();
    } catch (error) {
      console.error(
        "Error during the addition of the structure among the favorites",
        error
      );
      alert(
        "A mistake has occurred during the addition of the structure among your favorites"
      );
    }
  };

  return (
    <div className="h-auto lg:h-full w-full lg:w-1/2 lg:overflow-auto">
      <ul className="list bg-base-100 rounded-box shadow-md h-full w-full items-center">
        <div className="flex flex-row justify-between items-center">
          <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
            Structures
          </li>
        </div>

        <div className="w-full flex justify-center items-center py-4 px-8">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search for title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>

        {structures
          .filter((structure) =>
            structure.structure?.corporate
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((structure: StructureCompleteData) => (
            <li
              className="w-[95%] py-2 px-4 border-b-2"
              key={structure.structure_id}
            >
              <div className="flex flex-row w-full">
                <div className="w-1/12 flex justify-center items-center mr-4">
                  <img
                    className="size-8 rounded-box"
                    src={img_struttura_sanitaria}
                    alt="Avatar"
                  />
                </div>
                <div className="w-11/12 flex items-center justify-between text-lg">
                  <div>
                    <strong>{structure.structure?.corporate}</strong>
                  </div>
                  <div>
                    <div className="tooltip" data-tip="Detail">
                      <button
                        onClick={() => {
                          setSelectedStructureId(structure.structure_id);
                          (
                            document.getElementById(
                              "struttura_detail"
                            ) as HTMLDialogElement
                          )?.showModal();
                        }}
                        className="btn btn-square btn-ghost"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-[1.2em]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>

                    <div className="tooltip" data-tip="Preferito">
                      <button
                        onClick={() => {
                          addPreferredStructure(structure.structure_id);
                        }}
                        className="btn btn-square btn-ghost"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-[1.2em]"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="red"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}

        <div className="w-full h-full flex flex-row justify-center items-center my-5">
          <div className="join">
            {[...Array(lastPage)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </ul>
      <StructureDetails structure_id={selectedStructureId} />
    </div>
  );
};

export default Structures;
