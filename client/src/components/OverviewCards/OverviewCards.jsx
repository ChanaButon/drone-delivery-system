import "./OverviewCards.css";

const stats = [
  { title: "Total Sent", value: 128, color: "blue" },
  { title: "Pending Arrival", value: 2, color: "orange" },
  { title: "Eco Savings", value: "14kg CO2", color: "green" },
];

const OverviewCards = () => {
  return (
    <div className="overview">
      <h2>Overview</h2>
      <div className="overview-cards">
        {stats.map(stat => (
          <div key={stat.title} className={`card ${stat.color}`}>
            <p className="card-title">{stat.title}</p>
            <p className="card-value">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewCards;
