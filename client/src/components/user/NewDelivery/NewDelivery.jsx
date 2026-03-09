import { useState } from "react";
import {useMutation, useQuery } from "@tanstack/react-query";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScaleIcon from "@mui/icons-material/Scale";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotesIcon from "@mui/icons-material/Notes";

import { createDelivery} from "../../../api/delivery-function"; 
import {
  findUsersByEmail,
  getUserIdByEmail
} from "../../../api/user-function"; 

import "./NewDelivery.css";

const NewDelivery = () => {
  const [useOther, setUseOther] = useState(false);

  const [receiverEmail, setReceiverEmail] = useState("");
  const [receiverId, setReceiverId] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const [pickupCity, setPickupCity] = useState("");
  const [pickupStreet, setPickupStreet] = useState("");
  const [pickupNumber, setPickupNumber] = useState("");

  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryNumber, setDeliveryNumber] = useState("");

  const [weightRange, setWeightRange] = useState("0-5");
  const [deliveryType, setDeliveryType] = useState("REGULAR");

  const [notes, setNotes] = useState("");

  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: suggestions = [] } = useQuery({
    queryKey: ["autocompleteUsers", searchText],
    queryFn: () => findUsersByEmail(searchText),
    enabled: !!searchText && !useOther
  });

  const handleSelectUser = async (email) => {
    setReceiverEmail(email);
    const id = await getUserIdByEmail(email);
    setReceiverId(id);
    setShowDropdown(false);
  };

   const mutation = useMutation({
    mutationFn: createDelivery,
    onSuccess: () => {
      alert("Delivery created successfully!");
    },
    onError: (err) => {
      alert("Failed to create delivery: " + err.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      receiverEmail: useOther ? "" : receiverEmail,
      receiverId: useOther ? null : receiverId,
      receiverName: useOther ? receiverName : "",
      receiverPhone: useOther ? receiverPhone : "",

      pickupCity,
      pickupStreet,
      pickupNumber,

      deliveryCity,
      deliveryStreet,
      deliveryNumber,

      weightRange,
      deliveryType,
      notes
    };

    mutation.mutate(payload);
  };

  return (
    <div className="delivery-form">
      <h2>Create New Delivery</h2>
      <form onSubmit={handleSubmit}>

        <section className="form-section">
          <h3>
            <PersonIcon className="section-icon" />
            Receiver
          </h3>

          {!useOther && (
            <div style={{ position: "relative" }}>
              <div className="input-icon">
                <EmailIcon />
                <input
                  placeholder="Receiver Email (if registered)"
                  value={receiverEmail}
                  onChange={(e) => {
                    setReceiverEmail(e.target.value);
                    setSearchText(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                <button
                  type="button"
                  className="other-btn"
                  onClick={() => {
                    setUseOther(true);
                    setShowDropdown(false);
                  }}
                >
                  Other
                </button>
              </div>

              {showDropdown && suggestions.length > 0 && (
                <ul className="autocomplete-dropdown">
                  {suggestions.map((user) => (
                    <li key={user._id} onClick={() => handleSelectUser(user.email)}>
                      {user.email} - {user.fullName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {useOther && (
            <>
              <div className="input-icon">
                <PersonIcon />
                <input
                  placeholder="Full Name"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                />
              </div>

              <div className="input-icon">
                <PhoneIcon />
                <input
                  placeholder="Phone Number"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="other-btn"
                onClick={() => setUseOther(false)}
              >
                Back to Email
              </button>
            </>
          )}
        </section>

        <section className="form-section">
          <h3>
            <FlightTakeoffIcon className="section-icon" />
            Pickup Location
          </h3>

          <input
            placeholder="City"
            value={pickupCity}
            onChange={(e) => setPickupCity(e.target.value)}
          />

          <input
            placeholder="Street"
            value={pickupStreet}
            onChange={(e) => setPickupStreet(e.target.value)}
          />

          <input
            placeholder="House Number"
            value={pickupNumber}
            onChange={(e) => setPickupNumber(e.target.value)}
          />
        </section>

        <section className="form-section">
          <h3>
            <LocationOnIcon className="section-icon" />
            Delivery Location
          </h3>

          <input
            placeholder="City"
            value={deliveryCity}
            onChange={(e) => setDeliveryCity(e.target.value)}
          />

          <input
            placeholder="Street"
            value={deliveryStreet}
            onChange={(e) => setDeliveryStreet(e.target.value)}
          />

          <input
            placeholder="House Number"
            value={deliveryNumber}
            onChange={(e) => setDeliveryNumber(e.target.value)}
          />
        </section>

        <section className="form-section grid">
          <div>
            <label>
              <ScaleIcon className="label-icon" />
              Weight
            </label>
            <select value={weightRange} onChange={(e) => setWeightRange(e.target.value)}>
              <option value="0-5">0-5 kg</option>
              <option value="5-10">5-10 kg</option>
              <option value="10-20">10-20 kg</option>
            </select>
          </div>

          <div>
            <label>
              <LocalShippingIcon className="label-icon" />
              Delivery Type
            </label>
            <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)}>
              <option value="REGULAR">Regular</option>
              <option value="FAST">Fast</option>
            </select>
          </div>
        </section>

        <section className="form-section">
          <h3>
            <NotesIcon className="section-icon" />
            Notes
          </h3>
          <textarea
            placeholder="Additional instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </section>

        <button type="submit" className="submit-btn">
          Create Delivery
        </button>
      </form>
    </div>
  );
};

export default NewDelivery;