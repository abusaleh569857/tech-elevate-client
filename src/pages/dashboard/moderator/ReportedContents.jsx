import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  fetchReportedProducts,
  removeReportedProduct,
} from "@/features/products";
import Button from "@/shared/ui/Button.jsx";
import Panel from "@/shared/ui/Panel.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const ReportedContents = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { reportedProducts } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchReportedProducts());
  }, [dispatch]);

  const handleDelete = async (productId) => {
    const confirm = await showAlert({
      title: "Delete reported product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    const result = await dispatch(removeReportedProduct(productId));

    if (removeReportedProduct.fulfilled.match(result)) {
      showAlert({ icon: "success", title: "Product deleted" });
    } else {
      showAlert({ icon: "error", title: "Delete failed", text: result.payload });
    }
  };

  return (
    <Panel>
      <SectionHeader
        eyebrow="Risk Control"
        title="Reported Products"
        description="Track problematic submissions and take action with a consistent moderation workflow."
      />
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4">Product</th>
              <th className="px-4 py-4">Reports</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.map((product) => (
              <tr key={product._id} className="border-t border-slate-200 bg-white">
                <td className="px-4 py-4 font-semibold text-slate-900">{product.productName}</td>
                <td className="px-4 py-4 text-slate-600">{product.reports}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="secondary" className="px-4 py-2 text-xs" onClick={() => navigate(`/products/${product._id}`)}>
                      View
                    </Button>
                    <Button type="button" variant="danger" className="px-4 py-2 text-xs" onClick={() => handleDelete(product._id)}>
                      Delete
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

export default ReportedContents;



