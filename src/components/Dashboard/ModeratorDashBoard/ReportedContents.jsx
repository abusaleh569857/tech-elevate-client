import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/reported-products").then((res) => {
      setReportedProducts(res.data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/products/${id}`);
      if (response.data.success) {
        setReportedProducts((prev) =>
          prev.filter((product) => product._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reported Contents</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-4">Product Name</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportedProducts.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-4">{product.name}</td>
              <td className="p-4">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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

export default ReportedContents;
