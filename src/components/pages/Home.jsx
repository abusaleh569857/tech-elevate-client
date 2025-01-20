// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../Provider/AuthProvider";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import { useNavigate } from "react-router-dom";
// import Slider from "react-slick"; // Import react-slick
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Home = () => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [trendingProducts, setTrendingProducts] = useState([]);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Fetch Featured Products
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/products-featured")
//       .then((res) => {
//         setFeaturedProducts(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching featured products", error);
//       });
//   }, []);

//   // Fetch Trending Products
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/products-trending")
//       .then((res) => {
//         setTrendingProducts(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching trending products", error);
//       });
//   }, []);

//   // Handle Upvote
//   const handleUpvote = async (productId) => {
//     if (!user) {
//       // Show SweetAlert for login requirement
//       Swal.fire({
//         title: "Please log in to vote.",
//         icon: "info",
//         confirmButtonText: "Login",
//       }).then(() => {
//         navigate("/login");
//       });
//       return;
//     }

//     try {
//       await axios.post(
//         `http://localhost:5000/products/upvote/${productId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );

//       // Success message using SweetAlert
//       Swal.fire({
//         title: "Product upvoted successfully!",
//         icon: "success",
//         confirmButtonText: "OK",
//       });

//       // Refresh products
//       setFeaturedProducts((prev) =>
//         prev.map((product) =>
//           product._id === productId
//             ? { ...product, votes: product.votes + 1 }
//             : product
//         )
//       );
//       setTrendingProducts((prev) =>
//         prev.map((product) =>
//           product._id === productId
//             ? { ...product, votes: product.votes + 1 }
//             : product
//         )
//       );
//     } catch (error) {
//       console.error("Error upvoting product", error);
//       // Show backend error message in SweetAlert
//       Swal.fire({
//         title: "Failed to upvote.",
//         text: error.response?.data?.message || "Something went wrong.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   // Slider Settings
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="bg-white text-gray-900 overflow-x-hidden">
//       {/* Slider */}
//       <section className="mt-8">
//         <Slider {...sliderSettings}>
//           <div className="relative">
//             <img
//               src="https://i.ibb.co/7KR99nb/book12.webp"
//               alt="Banner 1"
//               className="w-full h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
//               <h2 className="text-white text-3xl font-bold z-10">
//                 Innovative Tech for You
//               </h2>
//             </div>
//           </div>
//           <div className="relative">
//             <img
//               src="https://i.ibb.co/7KR99nb/book12.webp"
//               alt="Banner 2"
//               className="w-full h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
//               <h2 className="text-white text-3xl font-bold z-10">
//                 Elevate Your Tech Game
//               </h2>
//             </div>
//           </div>
//           <div className="relative">
//             <img
//               src="https://i.ibb.co/7KR99nb/book12.webp"
//               alt="Banner 3"
//               className="w-full h-80 object-cover"
//             />
//             <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
//               <h2 className="text-white text-3xl font-bold z-10">
//                 Explore Our Featured Products
//               </h2>
//             </div>
//           </div>
//         </Slider>
//       </section>

//       {/* Featured Products */}
//       <section className="mt-16 px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Featured Products
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {featuredProducts.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white text-black rounded-lg shadow-lg overflow-hidden"
//             >
//               <img
//                 src={product.productImage}
//                 alt={product.productName}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
//                   {product.productName}
//                 </h3>
//                 <p className="text-sm bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
//                   {product.tags.join(", ")}
//                 </p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <button
//                     onClick={() => handleUpvote(product._id)}
//                     disabled={product.ownerEmail === user?.email}
//                     className="py-2 px-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50"
//                   >
//                     👍 {product.upvotes}
//                   </button>
//                   <button
//                     onClick={() => navigate(`/products/${product._id}`)}
//                     className="py-2 px-4 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Trending Products */}
//       <section className="mt-16 px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Trending Products
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {trendingProducts.map((product) => (
//             <div
//               key={product._id}
//               className="bg-white text-black rounded-lg shadow-lg overflow-hidden"
//             >
//               <img
//                 src={product.productImage}
//                 alt={product.productName}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
//                   {product.productName}
//                 </h3>
//                 <p className="text-sm bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
//                   {product.tags.join(", ")}
//                 </p>
//                 <div className="mt-4 flex items-center justify-between">
//                   <button
//                     onClick={() => handleUpvote(product._id)}
//                     disabled={product.ownerEmail === user?.email}
//                     className="py-2 px-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50"
//                   >
//                     👍 {product.upvotes}
//                   </button>
//                   <button
//                     onClick={() => navigate(`/products/${product._id}`)}
//                     className="py-2 px-4 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="text-center mt-8">
//           <button
//             onClick={() => navigate("/products")}
//             className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-6 rounded-full hover:opacity-90"
//           >
//             Show All Products
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch Featured Products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products-featured")
      .then((res) => {
        setFeaturedProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching featured products", error);
      });
  }, []);

  // Fetch Trending Products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products-trending")
      .then((res) => {
        setTrendingProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching trending products", error);
      });
  }, []);

  // Fetch Coupons
  useEffect(() => {
    axios
      .get("http://localhost:5000/coupons")
      .then((res) => {
        console.log(res.data);
        const validCoupons = res.data.filter(
          (coupon) => new Date(coupon.expiryDate) > new Date()
        );
        setCoupons(validCoupons);
      })
      .catch((error) => {
        console.error("Error fetching coupons", error);
      });
  }, []);

  // Handle Upvote
  const handleUpvote = async (productId) => {
    if (!user) {
      Swal.fire({
        title: "Please log in to vote.",
        icon: "info",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/products/upvote/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      Swal.fire({
        title: "Product upvoted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setFeaturedProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? { ...product, votes: product.votes + 1 }
            : product
        )
      );
      setTrendingProducts((prev) =>
        prev.map((product) =>
          product._id === productId
            ? { ...product, votes: product.votes + 1 }
            : product
        )
      );
    } catch (error) {
      console.error("Error upvoting product", error);
      Swal.fire({
        title: "Failed to upvote.",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // Slider Settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const couponSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Slider */}
      <section className="mt-8">
        <Slider {...sliderSettings}>
          <div className="relative">
            <img
              src="https://i.ibb.co/7KR99nb/book12.webp"
              alt="Banner 1"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
              <h2 className="text-white text-3xl font-bold z-10">
                Innovative Tech for You
              </h2>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://i.ibb.co/7KR99nb/book12.webp"
              alt="Banner 2"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
              <h2 className="text-white text-3xl font-bold z-10">
                Elevate Your Tech Game
              </h2>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://i.ibb.co/7KR99nb/book12.webp"
              alt="Banner 3"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-60 flex justify-center items-center">
              <h2 className="text-white text-3xl font-bold z-10">
                Explore Our Featured Products
              </h2>
            </div>
          </div>
        </Slider>
      </section>

      {/* Featured Products */}
      <section className="mt-16 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white text-black rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl">{product.productName}</h3>
                <p className="text-sm">{product.tags.join(", ")}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleUpvote(product._id)}
                    disabled={product.ownerEmail === user?.email}
                    className="py-2 px-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50"
                  >
                    👍 {product.upvotes}
                  </button>
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="py-2 px-4 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="mt-16 px-4">
        <section className="mt-16 px-4 pb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Exclusive Coupons
          </h2>
          {coupons.length > 0 ? (
            <Slider {...couponSliderSettings}>
              {coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg flex flex-col items-center justify-center"
                >
                  <h3 className="text-3xl font-extrabold mb-4 text-center">
                    {coupon.code}
                  </h3>
                  <div className="flex flex-col items-center justify-center mb-2">
                    <p className="text-xl font-semibold bg-white text-black px-4 py-1 rounded-full mb-2">
                      Discount: {coupon.discount}%
                    </p>
                    <p className="text-xl bg-white text-black px-4 py-1 rounded-full">
                      Expires:{" "}
                      {new Date(coupon.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm italic text-opacity-80 mt-2 text-center">
                    {coupon.description}
                  </p>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="text-center text-gray-600">
              No valid coupons available at the moment.
            </p>
          )}
        </section>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Trending Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white text-black rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl">{product.productName}</h3>
                <p className="text-sm">{product.tags.join(", ")}</p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => handleUpvote(product._id)}
                    disabled={product.ownerEmail === user?.email}
                    className="py-2 px-4 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 disabled:opacity-50"
                  >
                    👍 {product.upvotes}
                  </button>
                  <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="py-2 px-4 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:opacity-90"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
