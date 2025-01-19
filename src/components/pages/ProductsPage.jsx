// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const fetchProducts = (page = 1, query = "") => {
//     axios
//       .get(
//         `http://localhost:5000/accepted-products?page=${page}&search=${query}`
//       )
//       .then((res) => {
//         setProducts(res.data.products);
//         setTotalPages(res.data.totalPages);
//       })
//       .catch((err) => console.error("Error fetching products:", err.message));
//   };

//   useEffect(() => {
//     fetchProducts(currentPage, search);
//   }, [currentPage, search]);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1); // Reset to the first page on new search
//   };

//   const handleUpvote = (productId, isOwner) => {
//     const isLoggedIn = !!localStorage.getItem("userToken"); // Simulate login check
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else if (!isOwner) {
//       axios
//         .post(
//           `http://localhost:5000/products/${productId}/upvote`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//           }
//         )
//         .then(() => {
//           fetchProducts(currentPage, search);
//           Swal.fire({
//             icon: "success",
//             title: "Upvote Successful!",
//             text: "Your upvote has been recorded.",
//           });
//         })
//         .catch((err) => {
//           const errorMessage =
//             err.response?.data?.message || "Something went wrong!";
//           Swal.fire({
//             icon: "error",
//             title: "Upvote Failed",
//             text: errorMessage,
//           });
//           console.error("Error upvoting product:", err.message);
//         });
//     }
//   };

//   const renderPagination = () => {
//     return (
//       <div className="flex justify-center mt-6">
//         {[...Array(totalPages).keys()].map((pageNum) => (
//           <button
//             key={pageNum}
//             onClick={() => setCurrentPage(pageNum + 1)}
//             className={`px-4 py-2 mx-1 rounded ${
//               pageNum + 1 === currentPage
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             {pageNum + 1}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Products
//       </h1>
//       {/* Search Bar */}
//       <div className="mb-8">
//         <input
//           type="text"
//           value={search}
//           onChange={handleSearch}
//           placeholder="Search by tags..."
//           className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       {/* Product Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
//           >
//             <img
//               src={product.productImage}
//               alt={product.productName}
//               className="w-full h-40 object-cover rounded-md mb-4"
//             />
//             <h2 className="text-lg font-bold text-gray-800">
//               {product.productName}
//             </h2>
//             <p className="text-sm text-gray-600 mt-2">
//               {product.tags.join(", ")}
//             </p>

//             <button
//               onClick={() => handleUpvote(product._id, product.isOwner)}
//               disabled={product.isOwner}
//               className={`mt-4 px-6 py-2 rounded-lg border-4 flex items-center justify-center gap-2 ${
//                 product.isOwner
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-green-500 text-white hover:bg-green-600"
//               }`}
//             >
//               👍 {product.upvotes}
//             </button>
//             <button
//               onClick={() => navigate(`/products/${product._id}`)}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//       {/* Pagination */}
//       {renderPagination()}
//     </div>
//   );
// };

// export default ProductsPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   const fetchProducts = (page = 1, query = "") => {
//     axios
//       .get(
//         `http://localhost:5000/accepted-products?page=${page}&search=${query}`
//       )
//       .then((res) => {
//         setProducts(res.data.products);
//         setTotalPages(res.data.totalPages);
//       })
//       .catch((err) => console.error("Error fetching products:", err.message));
//   };

//   useEffect(() => {
//     fetchProducts(currentPage, search);
//   }, [currentPage, search]);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1); // Reset to the first page on new search
//   };

//   const handleUpvote = (productId, isOwner) => {
//     const isLoggedIn = !!localStorage.getItem("userToken"); // Simulate login check
//     if (!isLoggedIn) {
//       navigate("/login");
//     } else if (!isOwner) {
//       axios
//         .post(
//           `http://localhost:5000/products/${productId}/upvote`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//           }
//         )
//         .then(() => {
//           fetchProducts(currentPage, search);
//           Swal.fire({
//             icon: "success",
//             title: "Upvote Successful!",
//             text: "Your upvote has been recorded.",
//           });
//         })
//         .catch((err) => {
//           const errorMessage =
//             err.response?.data?.message || "Something went wrong!";
//           Swal.fire({
//             icon: "error",
//             title: "Upvote Failed",
//             text: errorMessage,
//           });
//           console.error("Error upvoting product:", err.message);
//         });
//     }
//   };

//   const renderPagination = () => {
//     return (
//       <div className="flex justify-center mt-6">
//         {[...Array(totalPages).keys()].map((pageNum) => (
//           <button
//             key={pageNum}
//             onClick={() => setCurrentPage(pageNum + 1)}
//             className={`px-4 py-2 mx-1 rounded ${
//               pageNum + 1 === currentPage
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             {pageNum + 1}
//           </button>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
//         Explore Our Products
//       </h1>
//       {/* Search Bar */}
//       <div className="mb-8">
//         <input
//           type="text"
//           value={search}
//           onChange={handleSearch}
//           placeholder="Search products by tags..."
//           className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       {/* Product Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center transition-transform transform hover:scale-105"
//           >
//             <img
//               src={product.productImage}
//               alt={product.productName}
//               className="w-full h-40 object-cover rounded-md mb-4"
//             />
//             <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
//               {product.productName}
//             </h2>
//             <p className="text-sm text-gray-600 mt-2 flex flex-wrap justify-center gap-2">
//               {product.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </p>
//             <p className="text-sm text-gray-500 mt-2 italic bg-gray-100 p-2 rounded-lg opacity-80">
//               Support this product with your vote to make it stand out!
//             </p>
//             <button
//               onClick={() => handleUpvote(product._id, product.isOwner)}
//               disabled={product.isOwner}
//               className={`mt-4 px-6 py-2 rounded-lg border-4 flex items-center justify-center gap-2 ${
//                 product.isOwner
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-green-500 text-white hover:bg-green-600"
//               }`}
//             >
//               👍 {product.upvotes}
//             </button>
//             <button
//               onClick={() => navigate(`/products/${product._id}`)}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>
//       {/* Pagination */}
//       {renderPagination()}
//     </div>
//   );
// };

// export default ProductsPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchProducts = (page = 1, query = "") => {
    axios
      .get(
        `http://localhost:5000/accepted-products?page=${page}&search=${query}`
      )
      .then((res) => {
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching products:", err.message));
  };

  useEffect(() => {
    fetchProducts(currentPage, search);
  }, [currentPage, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleUpvote = (productId, isOwner) => {
    const isLoggedIn = !!localStorage.getItem("userToken"); // Simulate login check
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!isOwner) {
      axios
        .post(
          `http://localhost:5000/products/${productId}/upvote`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        )
        .then(() => {
          fetchProducts(currentPage, search);
          Swal.fire({
            icon: "success",
            title: "Upvote Successful!",
            text: "Your upvote has been recorded.",
          });
        })
        .catch((err) => {
          const errorMessage =
            err.response?.data?.message || "Something went wrong!";
          Swal.fire({
            icon: "error",
            title: "Upvote Failed",
            text: errorMessage,
          });
          console.error("Error upvoting product:", err.message);
        });
    }
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-6">
        {[...Array(totalPages).keys()].map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              pageNum + 1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNum + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Explore Our Products
      </h1>
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search products by tags..."
          className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              {product.productName}
            </h2>
            <p className="text-sm text-gray-600 mt-2 flex flex-wrap justify-center gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </p>
            <div className="flex items-center justify-evenly w-full mt-4">
              <p className="text-sm text-gray-500 italic bg-gray-100 p-2 rounded-lg opacity-80">
                Support with your vote!
              </p>
              <button
                onClick={() => handleUpvote(product._id, product.isOwner)}
                disabled={product.isOwner}
                className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white ${
                  product.isOwner
                    ? "cursor-not-allowed opacity-50"
                    : "hover:opacity-90"
                }`}
              >
                👍 {product.upvotes}
              </button>
            </div>
            <button
              onClick={() => navigate(`/products/${product._id}`)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default ProductsPage;
