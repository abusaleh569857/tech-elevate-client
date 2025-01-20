import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch Users
  useEffect(() => {
    axios
      .get("https://tech-elevate-server.vercel.app/all-users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  // Handle Role Update
  const updateUserRole = (userId, role) => {
    axios
      .put(`https://tech-elevate-server.vercel.app/users/${userId}/role`, {
        role,
      })
      .then((res) => {
        Swal.fire({
          title: `User role updated to ${role}!`,
          icon: "success",
          confirmButtonText: "OK",
        });

        // Update user list locally
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, role: res.data.role } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user role", error);
        Swal.fire({
          title: "Failed to update user role.",
          text: error.response?.data?.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h2>
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-gray-700">
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => updateUserRole(user._id, "moderator")}
                  disabled={user.role === "moderator"}
                  className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                  Make Moderator
                </button>
                <button
                  onClick={() => updateUserRole(user._id, "admin")}
                  disabled={user.role === "admin"}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
