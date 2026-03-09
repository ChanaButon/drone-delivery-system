import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../api/user-function";
import { getDeliveriesByUser } from "../../../api/delivery-function";
import DeliveryDetails from "./DeliveryDetails";
import "./PackageList.css";

const PackageList = () => {

  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser
  });

  const { data: deliveries = [] } = useQuery({
    queryKey: ["deliveries", user?._id],
    queryFn: () => getDeliveriesByUser(user._id),
    enabled: !!user?._id
  });

  return (
    <div className="package-container">

      <h2 className="pkg-title">My Deliveries</h2>

      <div className="package-grid">

        {deliveries.map((delivery) => (
          <div
            key={delivery._id}
            className="package-card"
            onClick={() => setSelectedDelivery(delivery)}
          >

            <div className="pkg-header">
              <span className="pkg-id">
                #{delivery._id.slice(-6)}
              </span>

              <span className={`pkg-status ${delivery.status.toLowerCase()}`}>
                {delivery.status}
              </span>
            </div>

            <div className="pkg-route">

              <div className="pkg-location">
                <strong>Pickup</strong>
                <p>{delivery.pickupLocation?.address}</p>
              </div>

              <div className="pkg-arrow">→</div>

              <div className="pkg-location">
                <strong>Delivery</strong>
                <p>{delivery.deliveryLocation?.address}</p>
              </div>

            </div>

            <div className="pkg-footer">
              <span>{delivery.weightRange} kg</span>
              <span>{delivery.deliveryType}</span>
            </div>

          </div>
        ))}

      </div>

      {selectedDelivery && (
        <DeliveryDetails
          delivery={selectedDelivery}
          onClose={() => setSelectedDelivery(null)}
        />
      )}

    </div>
  );
};

export default PackageList;