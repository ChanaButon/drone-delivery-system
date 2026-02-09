import packages from "../../../../mock/packages.json";
import { Trash2, Edit } from "lucide-react";
import "./PackageTable.css";

const PackageTable = () => {
  const getStatusClass = (status) => {
    const s = status.toLowerCase();

    if (s.includes("delivered")) return "status-delivered";
    if (s.includes("in") || s.includes("transit")) return "status-transit";
    if (s.includes("pending")) return "status-pending";

    return "status-default";
  };

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
          {packages.map((pkg) => (
            <tr key={pkg.trackingId}>
              <td className="tracking-id">{pkg.trackingId}</td>

              <td>
                <span className={`status-badge ${getStatusClass(pkg.status)}`}>
                  {pkg.status}
                </span>
              </td>

              <td>{pkg.sender}</td>
              <td>{pkg.receiver}</td>

              <td>
                <span className="weight-badge">
                  {pkg.weight} kg
                </span>
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
