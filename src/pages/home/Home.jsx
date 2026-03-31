import { lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseTitle from "@/shared/hooks/useDocumentTitle.jsx";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import { fetchHomeCatalog, upvoteProduct } from "@/features/products";
import { showAlert } from "@/shared/lib/alert.js";

const HomeHeroSlider = lazy(() => import("./components/HomeHeroSlider.jsx"));

const Home = () => {
  UseTitle();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { featuredProducts, trendingProducts, coupons, loading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchHomeCatalog());
  }, [dispatch]);

  const handleUpvote = async (productId, ownerEmail) => {
    if (!user) {
      const result = await showAlert({
        title: "Login required",
        text: "Please sign in to vote for products.",
        icon: "info",
        confirmButtonText: "Go to login",
      });

      if (result.isConfirmed) {
        navigate("/login");
      }
      return;
    }

    if (ownerEmail === user.email) {
      return;
    }

    const result = await dispatch(upvoteProduct(productId));

    if (upvoteProduct.fulfilled.match(result)) {
      showAlert({
        title: "Vote counted",
        text: "Thanks for supporting this product.",
        icon: "success",
      });
    } else {
      showAlert({
        title: "Vote failed",
        text: result.payload,
        icon: "error",
      });
    }
  };

  return (
    <div className="overflow-x-hidden bg-[linear-gradient(180deg,#ecfeff_0%,#f8fafc_28%,#ffffff_100%)] pb-16 text-slate-900">
      <Suspense
        fallback={
          <section className="px-4 pt-4 md:px-6 lg:px-8">
            <div className="flex h-[420px] items-center justify-center rounded-[2rem] bg-[linear-gradient(135deg,#082f49_0%,#0891b2_55%,#14b8a6_100%)] shadow-[0_32px_90px_rgba(8,47,73,0.18)]">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/80">
                Loading showcase...
              </p>
            </div>
          </section>
        }
      >
        <HomeHeroSlider />
      </Suspense>

      <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Curated Picks</p>
            <h2 className="mt-3 text-3xl font-black">Featured Products</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product._id}
              className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
            >
              <img src={product.productImage} alt={product.productName} className="h-48 w-full object-cover" />
              <div className="space-y-4 p-5">
                <div>
                  <h3 className="text-xl font-black text-slate-900">{product.productName}</h3>
                  <p className="mt-2 text-sm text-slate-500">{product.tags?.join(", ")}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleUpvote(product._id, product.ownerEmail)}
                    disabled={product.ownerEmail === user?.email}
                    className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                  >
                    Vote {product.upvotes || 0}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700"
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-[2rem] bg-[linear-gradient(135deg,#082f49_0%,#0891b2_100%)] p-8 text-white shadow-[0_24px_80px_rgba(8,47,73,0.2)]">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">Deals Live Now</p>
            <h2 className="mt-4 text-3xl font-black">Exclusive Coupons</h2>
            <div className="mt-8 space-y-4">
              {coupons.length ? (
                coupons.map((coupon) => (
                  <div key={coupon._id} className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-2xl font-black">{coupon.code}</h3>
                      <span className="rounded-full bg-white px-4 py-1 text-sm font-bold text-slate-900">
                        {coupon.discount}% OFF
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-cyan-50">{coupon.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-cyan-100">
                      Expires {new Date(coupon.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-cyan-50">No valid coupons available right now.</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Momentum Board</p>
            <h2 className="mt-3 text-3xl font-black">Trending Products</h2>
            <div className="mt-8 grid gap-4">
              {trendingProducts.map((product) => (
                <article
                  key={product._id}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:flex-row"
                >
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="h-28 w-full rounded-[1.25rem] object-cover md:w-40"
                  />
                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{product.productName}</h3>
                      <p className="mt-2 text-sm text-slate-500">{product.tags?.join(", ")}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleUpvote(product._id, product.ownerEmail)}
                        disabled={product.ownerEmail === user?.email}
                        className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-emerald-600 disabled:bg-slate-300"
                      >
                        Vote {product.upvotes || 0}
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-cyan-700"
              >
                Browse All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <p className="mt-12 text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
          Syncing platform data...
        </p>
      ) : null}
    </div>
  );
};

export default Home;
