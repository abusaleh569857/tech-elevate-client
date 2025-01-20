import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    description: "",
    externalLink: "",
  });
  const navigate = useNavigate();

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const productData = {
  //     ...formData,
  //     ownerName: user?.displayName,
  //     ownerEmail: user?.email,
  //     ownerImage: user?.photoURL || null,
  //     tags: tags.map((tag) => tag.text),
  //   };

  //   try {
  //     const response = await axios.post(
  //       "https://tech-elevate-server.vercel.app/add-products",
  //       productData
  //     );
  //     if (response.data.success) {
  //       // Show success message using SweetAlert
  //       Swal.fire({
  //         icon: "success",
  //         title: "Product Added!",
  //         text: "Your product has been successfully added.",
  //       }).then(() => {
  //         navigate("/user-dashboard/my-products");
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Failed to Add Product",
  //       text: "There was an issue adding your product. Please try again.",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerImage: user?.photoURL || null,
      tags: tags.map((tag) => tag.text),
    };

    try {
      const response = await axios.post(
        "https://tech-elevate-server.vercel.app/add-products",
        productData
      );
      if (response.data.success) {
        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been successfully added.",
        }).then(() => {
          navigate("/user-dashboard/my-products");
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        // Handle 403 Forbidden Error
        if (status === 403) {
          Swal.fire({
            icon: "error",
            title: "Access Denied",
            text:
              data.message ||
              "You can only add one product without a subscription.",
          }).then(() => {
            // Redirect to My Products page after showing error
            navigate("/user-dashboard/my-profile");
          });
        } else {
          // Handle other errors
          Swal.fire({
            icon: "error",
            title: "Error Adding Product",
            text:
              data.message ||
              "There was an issue adding your product. Please try again.",
          });
        }
      } else {
        // Handle network or unexpected errors
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "Something went wrong. Please check your network connection and try again.",
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">
        Add Your Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-5">
          <label
            htmlFor="productName"
            className="block text-lg font-medium text-gray-600"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Product Image */}
        <div className="mb-5">
          <label
            htmlFor="productImage"
            className="block text-lg font-medium text-gray-600"
          >
            Product Image URL
          </label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={formData.productImage}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product image URL"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product description"
            rows="5"
            required
          />
        </div>

        {/* Owner Info */}
        <div className="mb-5">
          <label className="block text-lg font-medium text-gray-600 mb-2">
            Owner Info
          </label>
          <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
            <img
              src={user?.photoURL}
              alt="Owner Image"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <p className="text-lg font-semibold">
                {user?.displayName || "N/A"}
              </p>
              <p className="text-gray-600">{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-5">
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-600"
          >
            Tags
          </label>
          <ReactTags
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            placeholder="Add a tag"
            inputFieldPosition="inline"
            allowDragDrop={false}
            classNames={{
              tags: "tags",
              tagInput: "tag-input",
              tagInputField:
                "border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400",
              selected: "selected-tags",
              tag: "inline-block bg-blue-500 text-white px-2 py-1 rounded mr-2 mt-2",
              remove: "ml-2 text-white cursor-pointer",
            }}
          />
        </div>

        {/* External Link */}
        <div className="mb-5">
          <label
            htmlFor="externalLink"
            className="block text-lg font-medium text-gray-600"
          >
            External Link
          </label>
          <input
            type="text"
            id="externalLink"
            name="externalLink"
            value={formData.externalLink}
            onChange={handleInputChange}
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter external link"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
