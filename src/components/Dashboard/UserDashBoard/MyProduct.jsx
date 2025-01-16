import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Fetch products for the logged-in user
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products?ownerEmail=${user.email}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    if (user?.email) {
      fetchProducts();
    }
  }, [user?.email]);

  // Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/products/${id}`);
          setProducts(products.filter((product) => product._id !== id));
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting product:", error.message);
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/products/${editingProduct._id}`,
        editingProduct
      );
      setEditingProduct(null);
      const updatedProducts = products.map((product) =>
        product._id === editingProduct._id ? editingProduct : product
      );
      setProducts(updatedProducts);
      Swal.fire("Updated!", "Your product has been updated.", "success");
    } catch (error) {
      console.error("Error updating product:", error.message);
      Swal.fire("Error!", "Failed to update product.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Product Name</th>
              <th className="border border-gray-300 px-4 py-2">Votes</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {product.productName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.votes || 0}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.status || "Pending"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => setEditingProduct(product)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-screen overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.productName}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      productName: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Product Image URL</label>
                <input
                  type="text"
                  value={editingProduct.productImage}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      productImage: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 w-full"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Tags</label>
                <input
                  type="text"
                  value={editingProduct.tags.join(", ")}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      tags: e.target.value.split(","),
                    })
                  }
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">External Link</label>
                <input
                  type="text"
                  value={editingProduct.externalLink}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      externalLink: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
