import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  fetchModerationQueue,
  markProductAsFeatured,
  moderateProduct,
} from "@/features/products";
import Button from "@/shared/ui/Button.jsx";
import Panel from "@/shared/ui/Panel.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const ProductReviewQueue = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { moderationQueue } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchModerationQueue());
  }, [dispatch]);

  const handleAction = async (productId, action) => {
    const result = await dispatch(moderateProduct({ productId, action }));

    if (moderateProduct.fulfilled.match(result)) {
      showAlert({
        icon: "success",
        title: `Product ${action === "Accept" ? "accepted" : "rejected"}`,
      });
    } else {
      showAlert({ icon: "error", title: "Action failed", text: result.payload });
    }
  };

  const handleMakeFeatured = async (productId) => {
    const result = await dispatch(markProductAsFeatured(productId));

    if (markProductAsFeatured.fulfilled.match(result)) {
      showAlert({ icon: "success", title: "Product marked as featured" });
    } else {
      showAlert({ icon: "error", title: "Feature failed", text: result.payload });
    }
  };

  return (
    <Panel>
      <SectionHeader
        eyebrow="Content Moderation"
        title="Product Review Queue"
        description="Review pending submissions, feature strong launches, and keep moderation actions consistent."
      />
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4">Product</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {moderationQueue.map((product) => (
              <tr key={product._id} className="border-t border-slate-200 bg-white">
                <td className="px-4 py-4 font-semibold text-slate-900">{product.productName}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" className="px-4 py-2 text-xs" onClick={() => navigate(`/moderator-dashboard/product/${product._id}`)}>
                      Details
                    </Button>
                    <Button type="button" variant="ghost" className="px-4 py-2 text-xs" onClick={() => handleMakeFeatured(product._id)}>
                      Feature
                    </Button>
                    <Button type="button" className="px-4 py-2 text-xs" onClick={() => handleAction(product._id, "Accept")} disabled={product.status !== "Pending"}>
                      Accept
                    </Button>
                    <Button type="button" variant="danger" className="px-4 py-2 text-xs" onClick={() => handleAction(product._id, "Reject")} disabled={product.status !== "Pending"}>
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
};

export default ProductReviewQueue;



