import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import {
  createNewCoupon,
  deleteExistingCoupon,
  fetchCoupons,
  updateExistingCoupon,
} from "@/features/admin";
import Button from "@/shared/ui/Button.jsx";
import FormInput from "@/shared/ui/FormInput.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const defaultValues = {
  code: "",
  expiryDate: "",
  description: "",
  discount: 0,
};

const ManageCoupons = () => {
  const dispatch = useAppDispatch();
  const { coupons } = useAppSelector((state) => state.admin);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(fetchCoupons());
  }, [dispatch]);

  const resetForm = () => {
    reset(defaultValues);
    setIsEditing(false);
    setEditId(null);
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      discount: Number(values.discount),
    };

    const action = isEditing
      ? updateExistingCoupon({ couponId: editId, payload })
      : createNewCoupon(payload);

    const result = await dispatch(action);

    if (result.type.endsWith("fulfilled")) {
      await dispatch(fetchCoupons());
      await showAlert({
        title: isEditing ? "Coupon updated" : "Coupon added",
        icon: "success",
      });
      resetForm();
    } else {
      showAlert({ title: "Action failed", text: result.payload, icon: "error" });
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const confirm = await showAlert({
      title: "Delete coupon?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) {
      return;
    }

    const result = await dispatch(deleteExistingCoupon(couponId));

    if (deleteExistingCoupon.fulfilled.match(result)) {
      showAlert({ title: "Coupon deleted", icon: "success" });
    } else {
      showAlert({ title: "Delete failed", text: result.payload, icon: "error" });
    }
  };

  const startEdit = (coupon) => {
    setIsEditing(true);
    setEditId(coupon._id);
    reset({
      code: coupon.code,
      expiryDate: coupon.expiryDate,
      description: coupon.description,
      discount: coupon.discount,
    });
  };

  return (
    <div className="space-y-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <SectionHeader
        eyebrow="Growth Tools"
        title="Manage Coupons"
        description="Control marketing offers from one validated form workflow and keep coupon data consistent across the platform."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <FormInput
          label="Coupon Code"
          placeholder="SPRING25"
          error={errors.code?.message}
          {...register("code", {
            required: "Coupon code is required.",
            minLength: {
              value: 2,
              message: "Coupon code is required.",
            },
          })}
        />

        <FormInput
          label="Expiry Date"
          type="date"
          error={errors.expiryDate?.message}
          {...register("expiryDate", {
            required: "Expiry date is required.",
          })}
        />

        <FormInput
          label="Description"
          placeholder="Short offer summary"
          error={errors.description?.message}
          containerClassName="md:col-span-2"
          {...register("description", {
            required: "Description is required.",
            minLength: {
              value: 8,
              message: "Description must be at least 8 characters long.",
            },
          })}
        />

        <FormInput
          label="Discount Percentage"
          type="number"
          min="1"
          max="100"
          error={errors.discount?.message}
          {...register("discount", {
            required: "Discount is required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Discount must be at least 1%.",
            },
            max: {
              value: 100,
              message: "Discount cannot exceed 100%.",
            },
          })}
        />

        <div className="flex flex-wrap items-end gap-3 md:col-span-2">
          <Button type="submit">
            {isEditing ? "Update Coupon" : "Add Coupon"}
          </Button>
          {isEditing ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-[1.5rem] border border-slate-200 text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-4">Code</th>
              <th className="px-4 py-4">Expiry</th>
              <th className="px-4 py-4">Description</th>
              <th className="px-4 py-4">Discount</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="border-t border-slate-200 bg-white">
                <td className="px-4 py-4 font-semibold text-slate-900">{coupon.code}</td>
                <td className="px-4 py-4 text-slate-600">{coupon.expiryDate}</td>
                <td className="px-4 py-4 text-slate-600">{coupon.description}</td>
                <td className="px-4 py-4 text-slate-600">{coupon.discount}%</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="ghost" onClick={() => startEdit(coupon)}>
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDeleteCoupon(coupon._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;



