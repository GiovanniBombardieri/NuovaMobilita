import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const AddPerformance = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState("");

  const addPerformance = async () => {
    if (!user?.token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/create_prestazione`,
        { title, type, price, description },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Successful performance successfully!");

      setTitle("");
      setType("");
      setPrice(0);
      setDescription("");
      (
        document.getElementById("add_performance") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error when creating the performance: ", error);
      alert("Error during the addition of the performance!");
    }
  };

  return (
    <dialog id="add_performance" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
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
              />
            </div>
          </div>

          {/** TYPE */}
          <div>
            <div className="form-control mb-4 w-full flex items-center justify-between">
              <label className="label w-1/5 text-wrap">Performance Type</label>
              <select
                className="select select-bordered w-4/5"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                <option value="P">Psychological</option>
                <option value="M">Motor</option>
              </select>
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
                className="input input-bordered w-4/5 h-32 resize-none whitespace-normal"
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
              className="btn"
              onClick={() =>
                (
                  document.getElementById(
                    "add_prestazione"
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddPerformance;
