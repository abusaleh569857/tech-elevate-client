// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProductReviewQueue = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all products from the backend
//     axios.get("http://localhost:5000/all-products").then((res) => {
//       const sortedProducts = res.data.sort((a, b) =>
//         a.status === "pending" && b.status !== "pending" ? -1 : 1
//       );
//       setProducts(sortedProducts);
//     });
//   }, []);

//   const handleAction = async (id, action) => {
//     console.log(id, action);
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/update-products/${id}`,
//         { action }
//       );
//       if (response.data.success) {
//         setProducts((prev) =>
//           prev.map((product) =>
//             product._id === id
//               ? {
//                   ...product,
//                   status: action === "accept" ? "accepted" : "rejected",
//                 }
//               : product
//           )
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleMakeFeatured = async (id) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:5000/update-products/${id}`,
//         {
//           isFeatured: true,
//         }
//       );
//       if (response.data.success) {
//         alert("Product marked as Featured!");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Product Review Queue</h1>
//       <table className="w-full bg-white shadow rounded">
//         <thead>
//           <tr className="bg-blue-700 text-white">
//             <th className="p-4">Product Name</th>
//             <th className="p-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product._id} className="border-b">
//               <td className="p-4">{product.productName}</td>
//               <td className="p-4 space-x-2">
//                 <button
//                   onClick={() =>
//                     navigate(`/moderator-dashboard/product/${product._id}`)
//                   }
//                   className="bg-blue-500 text-white px-3 py-1 rounded"
//                 >
//                   View Details
//                 </button>
//                 <button
//                   onClick={() => handleMakeFeatured(product._id)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded"
//                 >
//                   Make Featured
//                 </button>
//                 <button
//                   onClick={() => handleAction(product._id, "accept")}
//                   disabled={product.status !== "pending"}
//                   className={`${
//                     product.status !== "pending"
//                       ? "bg-gray-400"
//                       : "bg-green-500"
//                   } text-white px-3 py-1 rounded`}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleAction(product._id, "reject")}
//                   disabled={product.status !== "pending"}
//                   className={`${
//                     product.status !== "pending" ? "bg-gray-400" : "bg-red-500"
//                   } text-white px-3 py-1 rounded`}
//                 >
//                   Reject
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductReviewQueue;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductReviewQueue = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all products from the backend
    axios.get("http://localhost:5000/all-products").then((res) => {
      const sortedProducts = res.data.sort((a, b) =>
        a.status === "pending" && b.status !== "pending" ? -1 : 1
      );
      setProducts(sortedProducts);
    });
  }, []);

  const handleAction = async (id, action) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/update-products/${id}`,
        { action }
      );
      if (response.data.success) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === id
              ? {
                  ...product,
                  status: action === "accept" ? "accepted" : "rejected",
                }
              : product
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeFeatured = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/update-products/${id}`,
        {
          isFeatured: true,
        }
      );
      if (response.data.success) {
        alert("Product marked as Featured!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Review Queue</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-4">Product Name</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-4">{product.productName}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    product.status === "pending"
                      ? "bg-yellow-500"
                      : product.status === "accepted"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() +
                    product.status.slice(1)}
                </span>
              </td>
              <td className="p-4 space-x-2">
                <button
                  onClick={() =>
                    navigate(`/moderator-dashboard/product/${product._id}`)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleMakeFeatured(product._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Make Featured
                </button>
                <button
                  onClick={() => handleAction(product._id, "accept")}
                  disabled={product.status !== "pending"}
                  className={`${
                    product.status !== "pending"
                      ? "bg-gray-400"
                      : "bg-green-500"
                  } text-white px-3 py-1 rounded`}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleAction(product._id, "reject")}
                  disabled={product.status !== "pending"}
                  className={`${
                    product.status !== "pending" ? "bg-gray-400" : "bg-red-500"
                  } text-white px-3 py-1 rounded`}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReviewQueue;
