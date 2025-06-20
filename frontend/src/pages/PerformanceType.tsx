import { useState, useEffect, useCallback } from "react";
import {
  useAuth,
  PerformanceTypeData,
  Performance,
} from "../context/AuthContext";
import axios from "axios";

const PerfomanceType = () => {
  const { user } = useAuth();

  const [performanceType, setPerformanceType] = useState<PerformanceTypeData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPerformanceTypeSelected, setIsPerformanceTypeSelected] =
    useState("");
  const [loadingPerformanceData, setLoadingPerformanceData] = useState(false);

  const [performance, setPerformance] = useState<Performance | null>(null);
  const [performance_type_id, setPerformanceTypeId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (performance) {
      setIsPerformanceTypeSelected(performance.performance_type_id);
    }
  }, [performance]);

  // Loading the performance data
  const uploadingTypeFunction = useCallback(
    (performance_type_id: string) => {
      if (!performance_type_id) return;

      setLoadingPerformanceData(true);
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/get_tipo_prestazione_singola/${performance_type_id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          setPerformance(data);

          // Inizializzo gli stati degli input
          setTitle(data?.title);
          setType(data?.type);
          setDescription(data?.description);
          setPerformanceTypeId(data?.performance_type_id);
        })
        .catch((err) => {
          console.error("Error in recovering the type of performance", err);
        })
        .finally(() => {
          setLoadingPerformanceData(false);
        });
    },
    [user?.token]
  );

  // Function to have the types of performance present in the database
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/get_tipo_prestazioni?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((res) => {
        setPerformanceType(res.data.data);
        setLastPage(res.data.last_page);
      })
      .catch((err) => {
        console.error("Error in the recovery of types of performance", err);
      });
  }, [currentPage, user?.token]);

  // Function to add the performance once the type is chosen
  const addPerformance = async () => {
    if (!user?.token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/create_prestazione`,
        { performance_type_id, title, type, price, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      (
        document.getElementById("search_performance_type") as HTMLDialogElement
      )?.close();

      alert("Successful performance successfully!");

      setTitle("");
      setType("");
      setDescription("");
    } catch (error) {
      console.error("Error when creating the performance: ", error);
      alert("Error during the addition of the performance!");
    }
  };

  return (
    <dialog
      id="search_performance_type"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        {isPerformanceTypeSelected && !loadingPerformanceData ? (
          <>
            <h3 className="font-bold text-lg mb-4">Add Performance</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addPerformance();
              }}
            >
              {/** TITLE */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5">Title</label>
                  <input
                    type="text"
                    className="input input-bordered w-4/5"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    readOnly
                  />
                </div>
              </div>

              {/** TYPE */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5 text-wrap">Type</label>
                  <input
                    type="text"
                    className="input input-bordered w-4/5"
                    value={type === "P" ? "Psychological" : "Motor"}
                    readOnly
                  />
                </div>
              </div>

              {/** PRICE */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5">Price (€)</label>
                  <input
                    type="number"
                    min={0}
                    className="input input-bordered w-4/5"
                    value={price}
                    onChange={(e) => {
                      const value = e.target.value.replace(",", ".");
                      const number = parseFloat(value);
                      setPrice(isNaN(number) ? 0 : number);
                    }}
                    required
                  />
                </div>
              </div>

              {/** DESCRIPTION */}
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-1/5">Description</label>
                  <textarea
                    className="input input-bordered w-4/5 h-60 resize-none whitespace-normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary mr-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setIsPerformanceTypeSelected("");
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="flex justify-end my-0">
              <button
                type="button"
                className="btn bg-red-500 btn-circle"
                onClick={() =>
                  (
                    document.getElementById(
                      "search_performance_type"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white font-bold"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h3 className="font-bold text-lg mb-4 text-center">
              Search Performance Type
            </h3>
            <div className="w-full">
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

            {performanceType
              .filter((perfomanceType) =>
                perfomanceType.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((perfomanceType: PerformanceTypeData) => (
                <ul className="list bg-base-100 rounded-box shadow-md h-full my-5">
                  <li
                    className="list-row"
                    key={perfomanceType.performance_type_id}
                  >
                    <div>
                      <div className="font-bold">{perfomanceType.title}</div>
                      <div>
                        {perfomanceType.type === "P"
                          ? "Psychological"
                          : "Motor"}
                      </div>
                      <div>{perfomanceType.description}</div>
                    </div>
                    <button
                      onClick={() => {
                        uploadingTypeFunction(
                          perfomanceType.performance_type_id
                        );
                      }}
                      className="btn btn-square btn-ghost"
                    >
                      <svg
                        className="h-[2em] w-[2em] text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16l4-4-4-4" />
                        <path d="M8 12h8" />
                      </svg>
                    </button>
                  </li>
                </ul>
              ))}
            <div className="w-full h-full flex flex-row justify-center items-center">
              <div className="join">
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  «
                </button>
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
                <button
                  className="join-item btn"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  »
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default PerfomanceType;
