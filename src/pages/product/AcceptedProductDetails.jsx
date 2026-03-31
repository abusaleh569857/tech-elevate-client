import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  fetchProductDetails,
  fetchProductReviews,
  reportProduct,
  submitProductReview,
  upvoteProduct,
} from "@/features/products";

const ThumbIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
    <path d="M9.4 10.5 12.5 4a2.6 2.6 0 0 1 2.4 3v3.5h3.9c1 0 1.8.9 1.6 1.9l-1.1 6a2 2 0 0 1-2 1.6H9.4V10.5ZM3 10.5h4.4V20H3v-9.5Z" />
  </svg>
);

const FlagIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 21V4" strokeLinecap="round" />
    <path d="M5 5h10l-1.4 3L15 11H5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AcceptedProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { productDetails, reviews, loading } = useAppSelector((state) => state.products);
  const [reviewData, setReviewData] = useState({ description: "", rating: 0 });

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(fetchProductReviews(id));
  }, [dispatch, id]);

  const handleUpvote = async () => {
    const result = await dispatch(upvoteProduct(id));

    if (upvoteProduct.fulfilled.match(result)) {
      showAlert({ icon: "success", title: "Upvote successful" });
    } else {
      showAlert({ icon: "error", title: "Upvote failed", text: result.payload });
    }
  };

  const handleReport = async () => {
    const result = await dispatch(reportProduct(id));

    if (reportProduct.fulfilled.match(result)) {
      showAlert({ icon: "success", title: "Product reported" });
    } else {
      showAlert({ icon: "error", title: "Report failed", text: result.payload });
    }
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      submitProductReview({
        ...reviewData,
        productId: id,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        reviewerEmail: user.email,
      })
    );

    if (submitProductReview.fulfilled.match(result)) {
      setReviewData({ description: "", rating: 0 });
      showAlert({ icon: "success", title: "Review submitted" });
    } else {
      showAlert({ icon: "error", title: "Review failed", text: result.payload });
    }
  };

  if (loading && !productDetails) {
    return <div className="p-10 text-center text-slate-500">Loading product...</div>;
  }

  if (!productDetails) {
    return <div className="p-10 text-center text-rose-600">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0fdfa_0%,#f8fafc_35%,#ffffff_100%)] px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <img
              src={productDetails.productImage}
              alt={productDetails.productName}
              className="h-[420px] w-full rounded-[1.75rem] object-cover"
            />
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Product Detail</p>
            <h1 className="text-4xl font-black text-slate-900">{productDetails.productName}</h1>
            <p className="text-base leading-7 text-slate-600">{productDetails.description}</p>
            <div className="flex flex-wrap gap-2">
              {productDetails.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 rounded-[1.5rem] bg-slate-50 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Votes</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{productDetails.upvotes || 0}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Reports</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{productDetails.reports || 0}</p>
              </div>
            </div>
            {productDetails.externalLink ? (
              <a
                href={productDetails.externalLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-cyan-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-cyan-700 transition hover:bg-cyan-50"
              >
                Visit Product Site
              </a>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleUpvote}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-emerald-600"
              >
                <ThumbIcon /> Upvote
              </button>
              <button
                type="button"
                onClick={handleReport}
                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-rose-600"
              >
                <FlagIcon /> Report
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <section>
            <h2 className="text-2xl font-black text-slate-900">Community Reviews</h2>
            <div className="mt-6 space-y-4">
              {reviews.length ? (
                reviews.map((review) => (
                  <article key={review._id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={review.reviewerImage}
                        alt={review.reviewerName}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-black text-slate-900">{review.reviewerName}</h3>
                        <p className="text-sm text-slate-500">Rating {review.rating} / 5</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{review.description}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-slate-500">No reviews yet. Be the first one.</p>
              )}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">Post A Review</h2>
            <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
              <textarea
                value={reviewData.description}
                onChange={(event) =>
                  setReviewData((prev) => ({ ...prev, description: event.target.value }))
                }
                rows="5"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                placeholder="Share your experience with this product"
                required
              />
              <input
                type="number"
                min="0"
                max="5"
                value={reviewData.rating}
                onChange={(event) =>
                  setReviewData((prev) => ({ ...prev, rating: Number(event.target.value) }))
                }
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                required
              />
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-cyan-700"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700"
                >
                  Back To Products
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AcceptedProductDetails;
