// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ReportedContents = () => {
//   const [reportedProducts, setReportedProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/reported-products")
//       .then((res) => {
//         setReportedProducts(res.data);
//       })
//       .catch((error) =>
//         console.error("Error fetching reported products:", error)
//       );
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/reported/products/${id}`
//       );
//       if (response.data.success) {
//         setReportedProducts((prev) =>
//           prev.filter((product) => product._id !== id)
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-purple-500 text-transparent bg-clip-text">
//         Reported Products
//       </h1>
//       <table className="w-full bg-white shadow rounded">
//         <thead>
//           <tr className="bg-blue-700 text-white">
//             <th className="p-4">Product Name</th>
//             <th className="p-4">Report Count</th>
//             <th className="p-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reportedProducts.map((product) => (
//             <tr key={product._id} className="border-b">
//               <td className="p-4 text-center">{product.productName}</td>
//               <td className="p-4 text-center">{product.reports}</td>
//               <td className="p-4 flex gap-4 justify-center">
//                 <button
//                   onClick={() => navigate(`/products/${product._id}`)}
//                   className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                 >
//                   View Details
//                 </button>
//                 <button
//                   onClick={() => handleDelete(product._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportedContents;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ReportedContents = () => {
  const [reportedProducts, setReportedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/reported-products")
      .then((res) => {
        setReportedProducts(res.data);
      })
      .catch((error) =>
        console.error("Error fetching reported products:", error)
      );
  }, []);

  const handleDelete = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product? This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/reported/products/${id}`
        );
        if (response.data.success) {
          setReportedProducts((prev) =>
            prev.filter((product) => product._id !== id)
          );
          Swal.fire("Deleted!", "The product has been deleted.", "success");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire(
          "Error!",
          "An error occurred while trying to delete the product.",
          "error"
        );
      }
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-purple-500 text-transparent bg-clip-text">
        Reported Products
      </h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th className="p-4">Product Name</th>
            <th className="p-4">Report Count</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reportedProducts.map((product) => (
            <tr key={product._id} className="border-b">
              <td className="p-4 text-center">{product.productName}</td>
              <td className="p-4 text-center">{product.reports}</td>
              <td className="p-4 flex gap-4 justify-center">
                <button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
