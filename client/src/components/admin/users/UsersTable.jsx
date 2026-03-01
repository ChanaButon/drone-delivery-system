import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../api/user-function";
import { Trash2, Edit } from "lucide-react";
import "./UsersTable.css";

const UsersTable = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers
  });

  const getRoleClass = (role) => {
    const r = role.toLowerCase();

    if (r.includes("admin")) return "role-admin";
    if (r.includes("manager")) return "role-manager";

    return "role-user";
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Not authorized</p>;

  return (
    <div className="admin-card">
      <div className="card-header">
        <h3>System Users</h3>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Total Deliveries</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>

              <td className="user-name">{user.name}</td>

              <td className="user-email">{user.email}</td>

              <td>
                <span className={`role-badge ${getRoleClass(user.role)}`}>
                  {user.role}
                </span>
              </td>

              <td>
                <span className="deliveries-badge">
                  {user.totalDeliveries || 0}
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
