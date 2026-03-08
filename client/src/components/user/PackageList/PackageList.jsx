import { useQuery } from "@tanstack/react-query";
import { getDeliveriesByUser } from "../../../api/delivery-function";
import "./PackageList.css";

const PackageList = ({ userId }) => {
  const { data: deliveries, isLoading, error } = useQuery({
    queryKey: ["userDeliveries", userId],
    queryFn: () => getDeliveriesByUser(userId)
  });

  if (isLoading) return <p>Loading your deliveries...</p>;
  if (error) return <p>Error fetching deliveries: {error.message}</p>;

  if (!deliveries || deliveries.length === 0) return <p>No deliveries found.</p>;

  return (
    <div className="my-deliveries">
      <h2>My Deliveries</h2>
      <div className="package-list">
        {deliveries.map(delivery => (
          <div key={delivery._id} className="package-card">
            <div>
              <p className="pkg-id">{delivery._id}</p>
              <p className="pkg-dest">
                {delivery.deliveryLocation?.address || "No address"}
              </p>
              {delivery.notes && <p className="pkg-notes">{delivery.notes}</p>}
            </div>
            <div>
              <span className={`pkg-status ${delivery.status.toLowerCase().replace("_", "-")}`}>
                {delivery.status.replace("_", " ")}
              </span>
              <p>{delivery.deliveryType} Delivery</p>
              <p>Weight: {delivery.weight} kg</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;