import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    expiryDate: "",
    description: "",
    discount: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger refresh

  // Fetch Coupons
  useEffect(() => {
    axios
      .get("http://localhost:5000/coupons")
      .then((res) => {
        setCoupons(res.data);
      })
      .catch((error) => console.error("Error fetching coupons:", error));
  }, [refreshKey]); // Refresh data whenever refreshKey changes

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update Coupon
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update coupon
      axios
        .put(`http://localhost:5000/coupons/${editId}`, formData)
        .then((res) => {
          Swal.fire({
            title: "Coupon updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setRefreshKey((prev) => prev + 1); // Trigger re-fetch
          resetForm();
        })
        .catch((error) => {
          console.error("Error updating coupon:", error);
          Swal.fire({
            title: "Failed to update coupon.",
            text: error.response?.data?.message || "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
      // Add coupon
      axios
        .post("http://localhost:5000/coupons", formData)
        .then((res) => {
          Swal.fire({
            title: "Coupon added successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          setRefreshKey((prev) => prev + 1); // Trigger re-fetch
          resetForm();
        })
        .catch((error) => {
          console.error("Error adding coupon:", error);
          Swal.fire({
            title: "Failed to add coupon.",
            text: error.response?.data?.message || "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }
  };

  // Delete Coupon
  const handleDeleteCoupon = (id) => {
    axios
      .delete(`http://localhost:5000/coupons/${id}`)
      .then(() => {
        Swal.fire({
          title: "Coupon deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setRefreshKey((prev) => prev + 1); // Trigger re-fetch
      })
      .catch((error) => {
        console.error("Error deleting coupon:", error);
        Swal.fire({
          title: "Failed to delete coupon.",
          text: error.response?.data?.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  // Edit Coupon
  const handleEditCoupon = (coupon) => {
    setIsEditing(true);
    setEditId(coupon._id);
    setFormData({
      code: coupon.code,
      expiryDate: coupon.expiryDate,
      description: coupon.description,
      discount: coupon.discount,
    });
  };

  // Reset Form
  const resetForm = () => {
    setFormData({ code: "", expiryDate: "", description: "", discount: "" });
    setIsEditing(false);
    setEditId(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Coupons</h2>
      {/* Add or Edit Coupon Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Coupon Code"
            required
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Coupon Description"
            required
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount Amount"
            required
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEditing ? "Update Coupon" : "Add Coupon"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={resetForm}
            className="mt-4 ml-4 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Coupon List */}
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-800">
            <th className="px-4 py-2 border">Coupon Code</th>
            <th className="px-4 py-2 border">Expiry Date</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Discount</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id} className="text-gray-700">
              <td className="px-4 py-2 border">{coupon.code}</td>
              <td className="px-4 py-2 border">{coupon.expiryDate}</td>
              <td className="px-4 py-2 border">{coupon.description}</td>
              <td className="px-4 py-2 border">{coupon.discount}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEditCoupon(coupon)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCoupon(coupon._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCoupons;
