import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the specific product by ID
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-xl text-center text-red-500 py-10">Loading...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-xl text-center text-red-500 py-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Product Details
      </h1>
      {/* Main Details */}
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            Product Name
          </label>
          <p className="text-lg font-medium text-gray-800">
            {product.productName}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            Description
          </label>
          <p className="text-lg text-gray-800">{product.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              Owner Name
            </label>
            <p className="text-lg text-gray-800">{product.ownerName}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              Owner Email
            </label>
            <p className="text-lg text-gray-800">{product.ownerEmail}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              Status
            </label>
            <p className="text-lg text-gray-800">{product.status}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">Tags</label>
            <p className="text-lg text-gray-800">{product.tags.join(", ")}</p>
          </div>
        </div>
        {product.externalLink && (
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">
              External Link
            </label>
            <a
              href={product.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-blue-600 hover:underline"
            >
              {product.externalLink}
            </a>
          </div>
        )}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-gray-600">
            Created At
          </label>
          <p className="text-lg text-gray-800">
            {new Date(product.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-gray-600 font-semibold">Upvotes</h3>
          <p className="text-2xl font-bold text-green-600">{product.upvotes}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-gray-600 font-semibold">Downvotes</h3>
          <p className="text-2xl font-bold text-red-600">{product.downvotes}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-gray-600 font-semibold">Reports</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {product.reports}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/moderator-dashboard/review-queue")}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium shadow-lg"
      >
        Back to Review Queue
      </button>
    </div>
  );
};

export default ProductDetails;
