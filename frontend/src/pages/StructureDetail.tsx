import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";

import { StructureDetail, useAuth } from "../context/AuthContext";
import { Performance } from "../context/AuthContext";

const StructureDetails = ({
  structure_id,
}: {
  structure_id: string | null;
}) => {
  const { user } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [perfomanceCompany, setPerfomanceCompany] = useState<Performance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stuctureDetail, setStuctureDetail] = useState<StructureDetail | null>(
    null
  );
  const [selectedPerformanceDetail, setSelectedPerformanceDetail] =
    useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && stuctureDetail) {
      setIsOpen(true);
      setTimeout(() => {
        dialogRef.current?.showModal();
      }, 0);
    }
  }, [isLoading, stuctureDetail]);

  const handleClose = () => {
    dialogRef.current?.close();
    (document.getElementById("struttura_detail") as HTMLDialogElement)?.close();
    setIsOpen(false);
    setStuctureDetail(null);
    setIsLoading(true);
  };

  useEffect(() => {
    if (structure_id !== null) {
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/structure_performances/${structure_id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          setPerfomanceCompany(res.data.performance);
        })
        .catch((err) => {
          console.error(
            "Error in the recovery of the company's performance",
            err
          );
        });
    }
  }, [user?.token, structure_id]);

  useEffect(() => {
    if (structure_id !== null) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/structure_detail/${structure_id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((res) => {
          setStuctureDetail(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(
            "Error in the recovery of details of the selected structure",
            err
          );
          setIsLoading(false);
        });
    }
  }, [user?.token, structure_id]);

  return (
    <dialog
      ref={dialogRef}
      id="struttura_detail"
      className="modal modal-bottom sm:modal-middle"
      open={isOpen ? true : false}
    >
      <div className="modal-box">
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-ring loading-xl"></span>
          </div>
        ) : (
          <>
            {selectedPerformanceDetail ? (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg mb-4">Structure Details</h3>
                  <button
                    type="button"
                    className="btn bg-red-500 btn-circle"
                    onClick={handleClose}
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
                <div className="card bg-base-100 shadow-xl w-2/2 h-full">
                  <div className="card-body flex flex-col p-5 justify-between items-center">
                    <h3 className="card-title mb-5 text-3xl">
                      {stuctureDetail?.structure?.corporate}
                    </h3>

                    {/** EMAIL */}
                    <div className="flex flex-row items-center text-center w-full mb-5">
                      <div className="flex w-1/3 justify-start">
                        <h3 className="card-title">E-mail:</h3>
                      </div>
                      <div className="flex w-2/3 justify-center">
                        {stuctureDetail?.contact?.some((r) => r.email) ? (
                          <div className="flex flex-col items-center">
                            {stuctureDetail.contact
                              .filter((r) => r.email)
                              .map((r, idx) => (
                                <p key={idx}>{r.email}</p>
                              ))}
                          </div>
                        ) : (
                          <p>Email not found</p>
                        )}
                      </div>
                    </div>

                    {/** PHONE */}
                    <div className="flex flex-row items-center text-center w-full mb-5">
                      <div className="flex w-1/3 justify-start">
                        <h3 className="card-title">Phone:</h3>
                      </div>
                      <div className="flex w-2/3 justify-center">
                        {stuctureDetail?.contact?.some((r) => r.phone) ? (
                          <div className="flex flex-col items-center">
                            {stuctureDetail.contact
                              .filter((r) => r.phone)
                              .map((r, idx) => (
                                <p key={idx}>{r.phone}</p>
                              ))}
                          </div>
                        ) : (
                          <p>Phone not found</p>
                        )}
                      </div>
                    </div>

                    {/** POSITION */}
                    <div className="flex flex-row items-center text-center w-full mb-5">
                      <div className="flex w-1/3 justify-start">
                        <h3 className="card-title">Position:</h3>
                      </div>
                      <div className="flex w-2/3 justify-center">
                        <p>
                          {stuctureDetail?.position?.street}{" "}
                          {stuctureDetail?.position?.civic_number},{" "}
                          {stuctureDetail?.position?.cap}{" "}
                          {stuctureDetail?.position?.city} (
                          {stuctureDetail?.position?.province})
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => setSelectedPerformanceDetail(false)}
                    >
                      See Performances
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-bold text-lg mb-4">
                  Structure's Performance
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

                {perfomanceCompany.length === 0 ? (
                  <>
                    <p>No performance found for this structure.</p>
                    <button
                      className="btn btn-sm btn-secondary mt-4"
                      onClick={() => setSelectedPerformanceDetail(true)}
                    >
                      Back
                    </button>
                  </>
                ) : (
                  <>
                    {perfomanceCompany
                      .filter((perfomance) =>
                        perfomance.performance_type?.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((perfomance: Performance) => (
                        <ul className="list bg-base-100 rounded-box shadow-md h-full my-5">
                          <li
                            className="list-row"
                            key={perfomance.performance_id}
                          >
                            <div>
                              <div className="font-bold">
                                {perfomance.performance_type?.title}
                              </div>
                              <div className="mt-3">
                                {perfomance.personalized_description
                                  ? perfomance.personalized_description
                                  : perfomance.performance_type?.description}
                              </div>
                              <div className="mt-5 flex justify-end">
                                <label className="input w-28">
                                  <input
                                    className="text-end pointer-events-none select-none"
                                    value={perfomance.value?.numerical_value}
                                  />
                                  <span className="label">€</span>
                                </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                      ))}
                    <button
                      className="btn btn-sm btn-secondary mb-4"
                      onClick={() => setSelectedPerformanceDetail(true)}
                    >
                      Back
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </dialog>
  );
};

export default StructureDetails;
