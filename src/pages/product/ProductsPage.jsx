import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import UseTitle from "@/shared/hooks/useDocumentTitle.jsx";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  fetchAcceptedProducts,
  upvoteProduct,
} from "@/features/products";

const ProductsPage = () => {
  UseTitle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { acceptedProducts, acceptedProductsMeta, loading } = useAppSelector(
    (state) => state.products
  );
  const [search, setSearch] = useState(acceptedProductsMeta.search);
  const [currentPage, setCurrentPage] = useState(acceptedProductsMeta.currentPage);

  useEffect(() => {
    dispatch(fetchAcceptedProducts({ page: currentPage, search }));
  }, [currentPage, dispatch, search]);

  const handleUpvote = async (productId, ownerEmail) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (ownerEmail === user.email) {
      return;
    }

    const result = await dispatch(upvoteProduct(productId));

    if (upvoteProduct.fulfilled.match(result)) {
      showAlert({
        icon: "success",
        title: "Upvote successful",
        text: "Your vote has been recorded.",
      });
    } else {
      showAlert({
        icon: "error",
        title: "Upvote failed",
        text: result.payload,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f0fdfa_0%,#f8fafc_45%,#ffffff_100%)] px-4 py-10 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(135deg,#082f49_0%,#0f766e_100%)] p-8 text-white shadow-[0_30px_80px_rgba(8,47,73,0.18)]">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">Marketplace</p>
          <h1 className="mt-4 text-4xl font-black">Explore Products Built By The Community</h1>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by product name or tags"
            className="mt-6 w-full rounded-2xl border border-white/20 bg-white/95 px-5 py-4 text-slate-900 outline-none ring-0 transition focus:border-cyan-300"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {acceptedProducts.map((product) => (
            <article
              key={product._id}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="h-56 w-full object-cover"
              />
              <div className="space-y-4 p-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{product.productName}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleUpvote(product._id, product.ownerEmail)}
                    disabled={product.ownerEmail === user?.email}
                    className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Vote {product.upvotes || 0}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {Array.from({ length: acceptedProductsMeta.totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                className={`h-11 min-w-11 rounded-full px-4 text-sm font-bold transition ${
                  pageNumber === currentPage
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-700 shadow"
                }`}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>

        {loading ? (
          <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            Loading products...
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;



