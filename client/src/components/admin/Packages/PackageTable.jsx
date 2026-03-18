import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDeliveries, deleteDelivery, updateDelivery } from "../../../api/delivery-function";
import { showSuccess, showError, showConfirm } from "../../../utils/popup.js";
import PackageModal from "./PackageModal";
import "./PackageTable.css";

const PackageTable = () => {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editingPkg, setEditingPkg] = useState(null);

  const queryClient = useQueryClient();

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

  const sortedDeliveries = [...deliveries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredDeliveries =
    statusFilter === "ALL"
      ? sortedDeliveries
      : sortedDeliveries.filter((d) => d.status === statusFilter);

  const handleDelete = async (id) => {
    const confirm = await showConfirm("Are you sure you want to delete this package?");
    if (!confirm) return;

    try {
      await deleteDelivery(id);
      showSuccess("Package deleted successfully");
      queryClient.invalidateQueries(["deliveries"]);
      setSelectedPkg(null);
    } catch (err) {
      showError(err.message);
    }
  };

  const handleEdit = (pkg) => {
    setEditingPkg(pkg);
    setSelectedPkg({ ...pkg, isEditing: true });
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateDelivery(editingPkg._id, updatedData);
      showSuccess("Package updated successfully");
      queryClient.invalidateQueries(["deliveries"]);
      setSelectedPkg(null);
      setEditingPkg(null);
    } catch (err) {
      showError(err.message);
    }
  };

  if (isLoading) return <p>Loading deliveries...</p>;
  if (isError) return <p>Error loading deliveries</p>;

  return (
    <div className="admin-card">
      <div className="card-header">
        <h3>Packages</h3>
        <select
          className="filter-select"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="ALL">All</option>
          <option value="CREATED">Created</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_FLIGHT">In Flight</option>
          <option value="DELIVERED">Delivered</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <table className="package-table">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Status</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Weight</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredDeliveries.map((pkg) => {
            const isCreated = pkg.status === "CREATED";

            return (
              <tr key={pkg._id} onClick={() => setSelectedPkg(pkg)}>
                <td className="tracking-id">{pkg._id}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(pkg.status)}`}>
                    {pkg.status}
                  </span>
                </td>
                <td>{pkg.senderId?.name || "N/A"}</td>
                <td>{pkg.receiver?.name || "N/A"}</td>
                <td>
                  <span className="weight-badge">{pkg.weightRange || "-"}</span>
                </td>
                <td>
                  {isCreated && (
                    <div className="actions" onClick={(e) => e.stopPropagation()}>
                      {/* כפתורים חיצוניים לא נדרשים */}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <PackageModal
        pkg={selectedPkg}
        onClose={() => setSelectedPkg(null)}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default PackageTable;