import "./PackageList.css";

const sentPackages = [
  { id: "DRN-7721", destination: "12 Herzl St, Tel Aviv", status: "In Flight" },
  { id: "DRN-5512", destination: "5 HaNeviim, Haifa", status: "Charging" },
];

const incomingPackages = [
  { id: "DRN-3390", source: "Apple Store", status: "Delivered" },
  { id: "DRN-9901", source: "Super-Pharm", status: "Processing" },
];

const PackageList = () => {
  return (
    <div className="my-deliveries">
      <h2>My Deliveries</h2>

      <h3>Sent by Me</h3>
      <div className="package-list">
        {sentPackages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <p>{pkg.id}</p>
            <p>{pkg.destination}</p>
            <span className={`status ${pkg.status.replace(" ", "-").toLowerCase()}`}>{pkg.status}</span>
          </div>
        ))}
      </div>

      <h3>Incoming</h3>
      <div className="package-list">
        {incomingPackages.map(pkg => (
          <div key={pkg.id} className="package-card">
            <p>{pkg.id}</p>
            <p>{pkg.source}</p>
            <span className={`status ${pkg.status.replace(" ", "-").toLowerCase()}`}>{pkg.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageList;
