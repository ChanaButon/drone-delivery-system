import packages from "../../../../mock/packages.json";
import "./PackageTable.css";

const PackageTable = () => {
  return (
    <div className="admin-card">
      <h3>Packages</h3>

      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Status</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Weight (kg)</th>
          </tr>
        </thead>
        <tbody>
          {packages.map(pkg => (
            <tr key={pkg.trackingId}>
              <td>{pkg.trackingId}</td>
              <td>{pkg.status}</td>
              <td>{pkg.sender}</td>
              <td>{pkg.receiver}</td>
              <td>{pkg.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;
