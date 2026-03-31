import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import Button from "@/shared/ui/Button.jsx";
import Panel from "@/shared/ui/Panel.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";
import { fetchProductDetails } from "@/features/products";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { productDetails } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (!productDetails) {
    return <div className="p-10 text-center text-slate-500">Loading...</div>;
  }

  return (
    <Panel className="mx-auto max-w-5xl md:p-8">
      <SectionHeader
        eyebrow="Review Detail"
        title="Product Details"
        description="Inspect submission content, ownership, status, and performance before taking moderation action."
      />
      <div className="mt-8 space-y-6">
        <img
          src={productDetails.productImage}
          alt={productDetails.productName}
          className="w-full rounded-[1.75rem] object-cover"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Product</p>
            <p className="mt-3 text-2xl font-black text-slate-900">{productDetails.productName}</p>
            <p className="mt-4 text-sm leading-7 text-slate-600">{productDetails.description}</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Owner</p>
            <p className="mt-3 font-black text-slate-900">{productDetails.ownerName}</p>
            <p className="mt-2 text-sm text-slate-600">{productDetails.ownerEmail}</p>
            <p className="mt-4 text-sm text-slate-600">Status: {productDetails.status}</p>
            <p className="mt-2 text-sm text-slate-600">Tags: {productDetails.tags?.join(", ")}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-emerald-50 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Upvotes</p>
            <p className="mt-3 text-3xl font-black text-emerald-900">{productDetails.upvotes || 0}</p>
          </div>
          <div className="rounded-[1.5rem] bg-amber-50 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Reports</p>
            <p className="mt-3 text-3xl font-black text-amber-900">{productDetails.reports || 0}</p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-100 p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-700">Created</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">
              {new Date(productDetails.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <Button className="mt-8" onClick={() => navigate("/moderator-dashboard/review-queue")}>
        Back To Queue
      </Button>
    </Panel>
  );
};

export default ProductDetails;


