import "./NewDelivery.css";

const NewDelivery = () => {
  return (
    <div className="new-delivery">
      <h2>New Delivery</h2>
      <form>
        <input placeholder="Recipient Name" />
        <input placeholder="Destination Address" />
        <select>
          <option>Standard (15 min)</option>
          <option>Express (8 min)</option>
        </select>
        <button type="submit">Launch Delivery Drone</button>
      </form>
    </div>
  );
};

export default NewDelivery;
