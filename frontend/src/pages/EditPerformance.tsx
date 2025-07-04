import { Performance, useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

const EditPerformance = ({
  performance_id,
}: {
  performance_id: string | null;
}) => {
  const { user } = useAuth();
  const [performance, setPerformance] = useState<Performance | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Title
  const [title, setTitle] = useState(
    performance?.performance_type?.title || ""
  );
  useEffect(() => {
    if (performance?.performance_type?.title) {
      setTitle(performance.performance_type.title);
    }
  }, [performance]);

  // Type
  const [type, setType] = useState(performance?.performance_type?.type || "");
  useEffect(() => {
    if (performance?.performance_type?.type) {
      if (performance?.performance_type?.type === "P") {
        setType("Psychological");
      } else if (performance?.performance_type?.type === "M") {
        setType("Motor");
      }
    }
  }, [performance]);

  // Price
  const [price, setPrice] = useState<number>(
    performance?.value?.numerical_value || 0
  );
  useEffect(() => {
    if (performance?.value?.numerical_value) {
      setPrice(performance?.value?.numerical_value);
    }
  }, [performance]);

  // Description
  const [description, setDescription] = useState(
    performance?.performance_type?.description || ""
  );
  useEffect(() => {
    if (performance?.performance_type?.description) {
      if (performance?.personalized_description) {
        setDescription(performance.personalized_description);
      } else {
        setDescription(performance.performance_type.description);
      }
    }
  }, [performance]);

  // Loading the performance data
  useEffect(() => {
    setIsLoading(true);
    if (!performance_id) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/performance/${performance_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setPerformance(res.data);
      })
      .catch((err) => {
        console.error("Performance recovery error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [performance_id, user?.token]);

  const updatePerformance = async () => {
    setIsLoading(true);
    if (!performance_id || !user?.token) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/performance/${performance_id}`,
        {
          title,
          description,
          type,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!isLoading) {
        alert("Successful updated performance");
        window.location.reload();
      }

      (
        document.getElementById("edit_performance") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Successful updated performance: ", error);
      alert("A mistake occurred while updating the performance.");
    }
  };

  // User loading information writing
  const fullText = "Your performance is coming, what do we modify? 👨🏻‍💻";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText((prev) =>
        index < fullText.length ? prev + fullText[index] : ""
      );
      setIndex((prev) => (prev < fullText.length ? prev + 1 : 0));
    }, 70);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <dialog
      id="edit_performance"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit performance</h3>
        {isLoading ? (
          <div className="w-full flex flex-col justify-center items-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
            <br />
            {displayedText}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePerformance();
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
                  readOnly
                />
              </div>
            </div>

            {/** TYPE */}
            <div>
              <div className="form-control mb-4 w-full flex items-center justify-between">
                <label className="label w-1/5 text-wrap">
                  Performance Type
                </label>
                <input
                  type="text"
                  className="input input-bordered w-4/5"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
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
                />
              </div>
            </div>

            {/** DESCRIPTION */}
            <div>
              <div className="form-control mb-4 w-full flex items-center justify-between">
                <label className="label w-1/5">Description</label>
                <textarea
                  className="input input-bordered w-4/5 h-32 resize-none whitespace-normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary mr-2"
                disabled={isLoading}
              >
                {isLoading ? "Saving performance..." : "Save"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (
                    document.getElementById(
                      "edit_performance"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default EditPerformance;
