// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ProductReviewQueue = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/api/products?status=pending").then((res) => {
//       setProducts(res.data);
//     });
//   }, []);

//   const handleAction = async (id, action) => {
//     try {
//       const response = await axios.patch(`/api/products/${id}`, { action });
//       if (response.data.success) {
//         setProducts((prev) =>
//           prev.map((product) =>
//             product._id === id
//               ? {
//                   ...product,
//                   status: action === "accept" ? "Accepted" : "Rejected",
//                 }
//               : product
//           )
//         );
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
//               <td className="p-4">{product.name}</td>
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
//                   onClick={() => handleAction(product._id, "accept")}
//                   disabled={product.status !== "Pending"}
//                   className={`${
//                     product.status !== "Pending"
//                       ? "bg-gray-400"
//                       : "bg-green-500"
//                   } text-white px-3 py-1 rounded`}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => handleAction(product._id, "reject")}
//                   disabled={product.status !== "Pending"}
//                   className={`${
//                     product.status !== "Pending" ? "bg-gray-400" : "bg-red-500"
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

import React from "react";

const ProductReviewQueue = () => {
  return (
    <div>
      <h1>p</h1>
    </div>
  );
};

export default ProductReviewQueue;
