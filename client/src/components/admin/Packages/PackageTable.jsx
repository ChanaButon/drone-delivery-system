import { useQuery } from "@tanstack/react-query";
import { Trash2, Edit } from "lucide-react";
import { getAllDeliveries } from "../../../api/delivery-function";
import "./PackageTable.css";

const PackageTable = () => {
  const { data: deliveries = [], isLoading, isError } = useQuery({
  queryKey: ["deliveries"],
  queryFn: getAllDeliveries,
  refetchInterval: 3000
});

  const getStatusClass = (status) => {
    switch (status) {
      case "DELIVERED":
        return "status-delivered";
      case "IN_FLIGHT":
      case "LOADING":
      case "ASSIGNED":
        return "status-transit";
      case "CREATED":
        return "status-pending";
      case "FAILED":
        return "status-failed";
      default:
        return "status-default";
    }
  };

  if (isLoading) return <p>Loading deliveries...</p>;
  if (isError) return <p>Error loading deliveries</p>;
  return (
     <div className="admin-card">
      <div className="card-header">
        <h3>Packages</h3>
      </div>

      <table className="package-table">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Status</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Weight (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map((pkg) => (
            <tr key={pkg._id}>
              <td className="tracking-id">{pkg._id}</td>
              <td>
                <span className={`status-badge ${getStatusClass(pkg.status)}`}>
                  {pkg.status}
                </span>
              </td>
              <td>{pkg.senderId?.name || "N/A"}</td>
              <td>{pkg.receiver?.name || "N/A"}</td>
              <td>
                <span className="weight-badge">{pkg.weight} kg</span>
              </td>
              <td>
                <div className="actions">
                  <button className="edit-btn">
                    <Edit size={16} />
                  </button>
                  <button className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;
