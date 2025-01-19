// // Product Details Page

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../Provider/AuthProvider";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";

// const AcceptedProductDetails = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [reviewData, setReviewData] = useState({ description: "", rating: 0 });

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/products/${id}`)
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error("Error fetching product details:", err));

//     axios
//       .get(`http://localhost:5000/products/${id}/reviews`)
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error("Error fetching reviews:", err));
//   }, [id]);

//   const handleUpvote = () => {
//     axios
//       .post(
//         `http://localhost:5000/products/${id}/upvote`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       )
//       .then(() => {
//         setProduct({ ...product, upvotes: product.upvotes + 1 });
//         Swal.fire({
//           icon: "success",
//           title: "Upvote Successful!",
//         });
//       })
//       .catch((err) => {
//         Swal.fire({
//           icon: "error",
//           title: "Upvote Failed",
//           text: err.response?.data?.message || "Something went wrong!",
//         });
//       });
//   };

//   const handleReport = () => {
//     axios
//       .post(
//         `http://localhost:5000/products/${id}/report`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       )
//       .then(() => {
//         Swal.fire({
//           icon: "success",
//           title: "Product Reported!",
//         });
//       })
//       .catch((err) => {
//         Swal.fire({
//           icon: "error",
//           title: "Report Failed",
//           text: err.response?.data?.message || "Something went wrong!",
//         });
//       });
//   };

//   const handleReviewSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post(`http://localhost:5000/reviews`, {
//         ...reviewData,
//         productId: id,
//         reviewerName: user.displayName,
//         reviewerImage: user.photoURL,
//         reviewerEmail: user.email,
//       })
//       .then((res) => {
//         setReviews([...reviews, res.data]);
//         setReviewData({ description: "", rating: 0 });
//         Swal.fire({
//           icon: "success",
//           title: "Review Submitted!",
//         });
//       })
//       .catch((err) => {
//         Swal.fire({
//           icon: "error",
//           title: "Review Submission Failed",
//           text: err.response?.data?.message || "Something went wrong!",
//         });
//       });
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         {product.productName}
//       </h1>
//       <img
//         src={product.productImage}
//         alt={product.productName}
//         className="w-full h-64 object-cover rounded-md mb-4"
//       />
//       <p className="text-gray-600 mb-4">{product.description}</p>
//       <p className="text-gray-600 mb-2 font-semibold">Tags:</p>
//       <p className="text-gray-600 mb-4">{product.tags.join(", ")}</p>
//       <p className="text-gray-600 mb-4">Votes: {product.upvotes}</p>
//       <p className="text-gray-600 mb-4">Reports: {product.reports}</p>
//       <button
//         onClick={handleUpvote}
//         className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
//       >
//         Upvote
//       </button>
//       <button
//         onClick={handleReport}
//         className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//       >
//         Report
//       </button>

//       {/* Reviews Section */}
//       <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
//       <div className="space-y-4">
//         {reviews.map((review) => (
//           <div key={review._id} className="p-4 bg-gray-100 rounded-lg">
//             <div className="flex items-center mb-2">
//               <img
//                 src={review.reviewerImage}
//                 alt={review.reviewerName}
//                 className="w-10 h-10 rounded-full mr-4"
//               />
//               <h3 className="font-bold text-gray-800">{review.reviewerName}</h3>
//             </div>
//             <p className="text-gray-600">{review.description}</p>
//             <p className="text-yellow-500">Rating: {review.rating} / 5</p>
//           </div>
//         ))}
//       </div>

//       {/* Post Review Section */}
//       <h2 className="text-2xl font-bold mt-8 mb-4">Post a Review</h2>
//       <form onSubmit={handleReviewSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Reviewer Name</label>
//           <input
//             type="text"
//             value={user.displayName}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Reviewer Image</label>
//           <input
//             type="text"
//             value={user.photoURL}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Reviewer Email</label>
//           <input
//             type="text"
//             value={user.email}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Review Description</label>
//           <textarea
//             value={reviewData.description}
//             onChange={(e) =>
//               setReviewData({ ...reviewData, description: e.target.value })
//             }
//             className="w-full p-2 border border-gray-300 rounded"
//           ></textarea>
//         </div>
//         <div>
//           <label className="block text-gray-700">Rating</label>
//           <input
//             type="number"
//             min="0"
//             max="5"
//             value={reviewData.rating}
//             onChange={(e) =>
//               setReviewData({ ...reviewData, rating: e.target.value })
//             }
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AcceptedProductDetails;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaThumbsUp, FaFlag } from "react-icons/fa";

const AcceptedProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({ description: "", rating: 0 });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));

    axios
      .get(`http://localhost:5000/products/${id}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, [id]);

  const handleUpvote = () => {
    axios
      .post(
        `http://localhost:5000/products/${id}/upvote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(() => {
        setProduct({ ...product, upvotes: product.upvotes + 1 });
        Swal.fire({
          icon: "success",
          title: "Upvote Successful!",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Upvote Failed",
          text: err.response?.data?.message || "Something went wrong!",
        });
      });
  };

  const handleReport = () => {
    axios
      .post(
        `http://localhost:5000/products/${id}/report`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Product Reported!",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Report Failed",
          text: err.response?.data?.message || "Something went wrong!",
        });
      });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/reviews`, {
        ...reviewData,
        productId: id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        reviewerEmail: user.email,
      })
      .then((res) => {
        setReviews([...reviews, res.data]);
        setReviewData({ description: "", rating: 0 });
        Swal.fire({
          icon: "success",
          title: "Review Submitted!",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Review Submission Failed",
          text: err.response?.data?.message || "Something went wrong!",
        });
      });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">
        {product.productName}
      </h1>
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-gray-600 mb-2 font-semibold">Tags:</p>
      <p className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-4">
        {product.tags.join(", ")}
      </p>
      <p className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text mb-4">
        Votes: {product.upvotes}
      </p>
      <p className="bg-gradient-to-r from-red-400 to-purple-500 text-transparent bg-clip-text mb-4">
        Reports: {product.reports}
      </p>
      {product.externalLink && (
        <p className="text-gray-700 mb-4">
          External Link:{" "}
          <a
            href={product.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            Click Here
          </a>
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={handleUpvote}
          className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600 flex items-center gap-2"
        >
          <FaThumbsUp />
          Upvote
        </button>
        <button
          onClick={handleReport}
          className="px-6 py-2 bg-gradient-to-r from-red-400 to-purple-500 text-white rounded-lg hover:from-red-500 hover:to-purple-600 flex items-center gap-2"
        >
          <FaFlag />
          Report
        </button>
      </div>

      {/* Reviews Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 bg-gray-100 rounded-lg">
            <div className="flex items-center mb-2">
              <img
                src={review.reviewerImage}
                alt={review.reviewerName}
                className="w-10 h-10 rounded-full mr-4"
              />
              <h3 className="font-bold text-gray-800">{review.reviewerName}</h3>
            </div>
            <p className="text-gray-600">{review.description}</p>
            <p className="text-yellow-500">Rating: {review.rating} / 5</p>
          </div>
        ))}
      </div>

      {/* Post Review Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Post a Review</h2>
      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Reviewer Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Reviewer Image</label>
          <input
            type="text"
            value={user.photoURL}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Reviewer Email</label>
          <input
            type="text"
            value={user.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Review Description</label>
          <textarea
            value={reviewData.description}
            onChange={(e) =>
              setReviewData({ ...reviewData, description: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            value={reviewData.rating}
            onChange={(e) =>
              setReviewData({ ...reviewData, rating: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:from-green-500 hover:to-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
          >
            Back to Products Page
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcceptedProductDetails;
