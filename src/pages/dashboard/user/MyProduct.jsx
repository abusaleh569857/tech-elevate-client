import { useEffect, useState } from "react";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  deleteExistingProduct,
  fetchMyProducts,
  updateExistingProduct,
} from "@/features/products";
import Button from "@/shared/ui/Button.jsx";
import FormInput from "@/shared/ui/FormInput.jsx";
import FormTextarea from "@/shared/ui/FormTextarea.jsx";
import Panel from "@/shared/ui/Panel.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const MyProducts = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { myProducts } = useAppSelector((state) => state.products);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchMyProducts(user.email));
    }
  }, [dispatch, user?.email]);

  const handleDelete = async (productId) => {
    const result = await showAlert({
      title: "Delete this product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) {
      return;
    }

    const response = await dispatch(deleteExistingProduct(productId));

    if (deleteExistingProduct.fulfilled.match(response)) {
      showAlert("Deleted", "Product removed successfully.", "success");
    } else {
      showAlert("Failed", response.payload, "error");
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    const response = await dispatch(
      updateExistingProduct({
        productId: editingProduct._id,
        payload: editingProduct,
      })
    );

    if (updateExistingProduct.fulfilled.match(response)) {
      setEditingProduct(null);
      showAlert("Updated", "Product updated successfully.", "success");
    } else {
      showAlert("Failed", response.payload, "error");
    }
  };

  return (
    <Panel>
      <SectionHeader
        eyebrow="Product Management"
        title="My Products"
        description="Track launch status, update product metadata, and remove older submissions from one dashboard table."
      />

      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4">Product</th>
              <th className="px-4 py-4">Votes</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product) => (
              <tr key={product._id} className="border-t border-slate-200 bg-white">
                <td className="px-4 py-4 font-semibold text-slate-900">{product.productName}</td>
                <td className="px-4 py-4 text-slate-600">{product.upvotes || 0}</td>
                <td className="px-4 py-4 text-slate-600">{product.status || "Pending"}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" className="px-4 py-2 text-xs" onClick={() => setEditingProduct({ ...product })}>
                      Update
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

      {editingProduct ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
          <Panel className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
            <SectionHeader eyebrow="Product Editor" title="Edit Product" />
            <form onSubmit={handleEditSubmit} className="mt-6 space-y-4">
              <FormInput
                value={editingProduct.productName}
                onChange={(event) =>
                  setEditingProduct((prev) => ({ ...prev, productName: event.target.value }))
                }
                required
              />
              <FormInput
                type="url"
                value={editingProduct.productImage}
                onChange={(event) =>
                  setEditingProduct((prev) => ({ ...prev, productImage: event.target.value }))
                }
                required
              />
              <FormTextarea
                rows="5"
                value={editingProduct.description}
                onChange={(event) =>
                  setEditingProduct((prev) => ({ ...prev, description: event.target.value }))
                }
                required
              />
              <FormInput
                value={editingProduct.tags?.join(", ") || ""}
                onChange={(event) =>
                  setEditingProduct((prev) => ({
                    ...prev,
                    tags: event.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  }))
                }
              />
              <FormInput
                type="url"
                value={editingProduct.externalLink || ""}
                onChange={(event) =>
                  setEditingProduct((prev) => ({ ...prev, externalLink: event.target.value }))
                }
              />
              <div className="flex flex-wrap justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </Panel>
        </div>
      ) : null}
    </Panel>
  );
};

export default MyProducts;



