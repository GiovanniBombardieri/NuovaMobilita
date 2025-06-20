import { useEffect, useState } from "react";
import { Performance, useAuth, User, Structure } from "../context/AuthContext";
import axios from "axios";

import img_prest_sanitaria from "../../public/icona-prest-sanitaria.jpg";
import img_prest_psicologica from "../../public/icona-prest-psicologica.jpg";

import EditPerfomance from "./EditPerformance";
import AddPerformance from "./AddPerfomance";

function isStructure(user: User | Structure | null): user is Structure {
  return (user as Structure)?.role === "structure";
}

const Performances = () => {
  const { user } = useAuth();

  const [perfomances, setPerfomances] = useState<Performance[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/get_prestazioni?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setPerfomances(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Performance recovery error", err);
      });
  }, [currentPage, user?.token]);

  const deletePerformance = async (perfomance_id: string) => {
    if (!perfomance_id || !user?.token) return;

    const confirm_variable = confirm(
      "You are sure you want to eliminate this performance?"
    );
    if (!confirm_variable) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/delete_prestazione/${perfomance_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get_prestazioni?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setPerfomances(res.data.data);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error("Error when eliminating the performance: ", error);
      alert("Error in the elimination of the performance");
    }
  };

  return (
    <div
      className={`rounded-box ${
        isStructure(user)
          ? "h-full w-auto overflow-auto"
          : "h-[583px] w-full lg:w-1/2 mx-5 mb-5"
      }`}
    >
      <ul className="list bg-base-100 rounded-box shadow-md h-full">
        <div className="flex flex-row justify-between items-center">
          <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
            Your Perfomance
          </li>
          <button
            className="btn btn-square btn-ghost mr-5 mt-2"
            onClick={() => {
              (
                document.getElementById("add_performance") as HTMLDialogElement
              )?.showModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-[1.4em]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="green"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="14" y1="7" x2="14" y2="21" />
              <line x1="7" y1="14" x2="21" y2="14" />
            </svg>
          </button>
        </div>

        {perfomances.map((perfomance: Performance) => (
          <li className="list-row">
            <div className="w-[490px] flex flex-row justify-stretch">
              <div className="w-1/12 flex justify-center mr-4">
                <img
                  className="size-8 rounded-box"
                  src={
                    perfomance.performance_type?.type === "P"
                      ? img_prest_psicologica
                      : img_prest_sanitaria
                  }
                  alt="Avatar"
                />
              </div>
              <div className="w-10/12 mr-5">
                <div>
                  <strong>{perfomance.performance_type?.title}</strong>
                </div>
                <p className="list-col-wrap text-xs mt-0">
                  {perfomance.personalized_description
                    ? perfomance.personalized_description.length > 150
                      ? perfomance.personalized_description.slice(0, 150) +
                        "..."
                      : perfomance.personalized_description
                    : perfomance.performance_type?.description &&
                      perfomance.performance_type?.description.length > 150
                    ? perfomance.performance_type?.description.slice(0, 150) +
                      "..."
                    : ""}
                </p>
              </div>
              <div className="w-1/12 text-end">
                <button
                  onClick={() => {
                    setSelectedId(perfomance.performance_id);
                    (
                      document.getElementById(
                        "edit_performance"
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
                    stroke="blue"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => deletePerformance(perfomance.performance_id)}
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
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3-3h8a1 1 0 0 1 1 1v2H5V4a1 1 0 0 1 1-1z" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
        {perfomances.length !== 0 ? (
          <div className="w-full h-full flex flex-row justify-center items-center">
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
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-5/6 text-center">
              No performance present at database.
            </div>
            <br />
            <div className="w-5/6 text-center">
              Use the search button to find the performance already present in
              our systems or add it with the button above!
            </div>
          </div>
        )}
      </ul>
      <EditPerfomance performance_id={selectedId} />
      <AddPerformance />
    </div>
  );
};

export default Performances;
