import users from "../../../../mock/users.json";
import { Trash2, Edit } from "lucide-react";
import "./UsersTable.css";

const UsersTable = () => {
  const getRoleClass = (role) => {
    const r = role.toLowerCase();

    if (r.includes("admin")) return "role-admin";
    if (r.includes("manager")) return "role-manager";

    return "role-user";
  };

  return (
    <div className="admin-card">
      <div className="card-header">
        <h3>System Users</h3>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Total Deliveries</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="user-id">{user.id}</td>

              <td className="user-name">{user.fullName}</td>

              <td className="user-email">{user.email}</td>

              <td>
                <span className={`role-badge ${getRoleClass(user.role)}`}>
                  {user.role}
                </span>
              </td>

              <td>
                <span className="deliveries-badge">
                  {user.totalDeliveries}
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

export default UsersTable;
