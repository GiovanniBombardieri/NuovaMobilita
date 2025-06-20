import { useAuth, User, Structure } from "../context/AuthContext";
import { useState } from "react";

// Funzioni di type guard
function isUser(user: User | Structure | null): user is User {
  return (user as User)?.role === "user";
}

function isStructure(user: User | Structure | null): user is Structure {
  return (user as Structure)?.role === "structure";
}

const geocodeAddress = async (address: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await response.json();
  if (data && data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  throw new Error("Failed geocoding.");
};

const EditProfile = () => {
  const { user, login } = useAuth();

  const [email, setEmail] = useState(user?.email || "");

  // User
  const [name, setName] = useState(isUser(user) ? user.name : "");
  const [surname, setSurname] = useState(isUser(user) ? user.surname : "");
  const [phone, setPhone] = useState(isUser(user) ? user.phone || "" : "");
  const [userCity, setUserCity] = useState(isUser(user) ? user.city : "");
  const [userProvince, setUserProvince] = useState(
    isUser(user) ? user.province : ""
  );
  const [userCap, setUserCap] = useState(isUser(user) ? user.cap : "");
  const [userStreet, setUserStreet] = useState(isUser(user) ? user.street : "");
  const [userCivicNumber, setUserCivicNumber] = useState(
    isUser(user) ? user.civic_number : ""
  );

  // Structure
  const [corporate, setCorporate] = useState(
    isStructure(user) ? user.corporate : ""
  );
  const [structurePhone, setStructurePhone] = useState(
    isStructure(user) ? user.phone || "" : ""
  );

  const [city, setCity] = useState(isStructure(user) ? user.city : "");
  const [province, setProvince] = useState(
    isStructure(user) ? user.province : ""
  );
  const [cap, setCap] = useState(isStructure(user) ? user.cap : "");
  const [street, setStreet] = useState(isStructure(user) ? user.street : "");
  const [civic_number, setCivicNumber] = useState(
    isStructure(user) ? user.civic_number : ""
  );

  const updateProfile = async () => {
    const updateData = isUser(user)
      ? {
          email,
          name,
          surname,
          phone,
          userCity,
          userProvince,
          userCap,
          userStreet,
          userCivicNumber,
        }
      : {
          corporate,
          email,
          structurePhone,
          city,
          province,
          cap,
          street,
          civic_number,
        };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok)
        throw new Error("Error in saving the updated data of the profile");

      const updateUser = await response.json();

      (document.getElementById("edit_profile") as HTMLDialogElement)?.close();

      const fullAddress = `${updateUser.street} ${updateUser.civic_number}, ${updateUser.cap} ${updateUser.city}, ${updateUser.province}`;
      try {
        const location = await geocodeAddress(fullAddress);

        if (updateUser.role === "user") {
          login({
            name: updateUser.name,
            surname: updateUser.surname,
            phone: updateUser.phone,
            role: updateUser.role,
            email: updateUser.email,
            token: updateUser.access_token,
            city: updateUser.city,
            province: updateUser.province,
            street: updateUser.street,
            civic_number: updateUser.civic_number,
            cap: updateUser.cap,
            location: location,
          });

          window.location.reload();
        } else if (updateUser.role === "structure") {
          login({
            corporate: updateUser.corporate,
            city: updateUser.city,
            province: updateUser.province,
            street: updateUser.street,
            civic_number: updateUser.civic_number,
            cap: updateUser.cap,
            role: updateUser.role,
            email: updateUser.email,
            phone: updateUser.phone,
            token: updateUser.access_token,
            location: location,
          });

          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        const defaultLocation = {
          lat: 41.9028,
          lng: 12.4964,
        };
        if (updateUser.role === "user") {
          login({
            name: updateUser.name,
            surname: updateUser.surname,
            phone: updateUser.phone,
            role: updateUser.role,
            email: updateUser.email,
            token: updateUser.access_token,
            city: updateUser.city,
            province: updateUser.province,
            street: updateUser.street,
            civic_number: updateUser.civic_number,
            cap: updateUser.cap,
            location: defaultLocation,
          });

          window.location.reload();
        } else if (updateUser.role === "structure") {
          login({
            corporate: updateUser.corporate,
            city: updateUser.city,
            province: updateUser.province,
            street: updateUser.street,
            civic_number: updateUser.civic_number,
            cap: updateUser.cap,
            role: updateUser.role,
            email: updateUser.email,
            phone: updateUser.phone,
            token: updateUser.access_token,
            location: defaultLocation,
          });

          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Error in saving the profile", err);
    }
  };

  return (
    <dialog id="edit_profile" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateProfile();
          }}
        >
          {/** USER */}
          {isUser(user) && (
            <>
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-3/5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Surname</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Phone</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">City</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Province (acronym)</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={userProvince}
                    onChange={(e) => setUserProvince(e.target.value)}
                    maxLength={2}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">CAP</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={userCap}
                    onChange={(e) => setUserCap(e.target.value)}
                    maxLength={5}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Street</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={userStreet}
                    onChange={(e) => setUserStreet(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Civic Number</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={userCivicNumber}
                    onChange={(e) => setUserCivicNumber(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/** STRUCTURE */}
          {isStructure(user) && (
            <>
              <div>
                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Corporate</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={corporate}
                    onChange={(e) => setCorporate(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-3/5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Phone</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={structurePhone}
                    onChange={(e) => setStructurePhone(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">City</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Province</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">CAP</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={cap}
                    onChange={(e) => setCap(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Street</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 w-full flex items-center justify-between">
                  <label className="label w-2/5">Civic Number</label>
                  <input
                    type="text"
                    className="input input-bordered w-3/5"
                    value={civic_number}
                    onChange={(e) => setCivicNumber(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          <div className="modal-action">
            <button type="submit" className="btn btn-primary mr-2">
              Save
            </button>
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById("edit_profile") as HTMLDialogElement
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

export default EditProfile;
