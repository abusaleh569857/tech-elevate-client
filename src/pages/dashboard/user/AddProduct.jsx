import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { showAlert } from "@/shared/lib/alert.js";
import { useAppDispatch, useAppSelector } from "@/app/hooks.js";
import { createProduct } from "@/features/products";
import TagInputField from "@/shared/ui/form/TagInputField.jsx";
import Button from "@/shared/ui/Button.jsx";
import FormInput from "@/shared/ui/FormInput.jsx";
import FormTextarea from "@/shared/ui/FormTextarea.jsx";
import SectionHeader from "@/shared/ui/SectionHeader.jsx";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      productImage: "",
      description: "",
      externalLink: "",
      tags: [],
    },
  });

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerImage: user?.photoURL || null,
    };

    const result = await dispatch(createProduct(payload));

    if (createProduct.fulfilled.match(result)) {
      reset();
      await showAlert({
        icon: "success",
        title: "Product added",
        text: "Your product has been submitted successfully.",
      });
      navigate("/user-dashboard/my-products");
      return;
    }

    const message = result.payload || "Something went wrong while adding the product.";

    await showAlert({
      icon: "error",
      title: "Submission failed",
      text: message,
    });

    if (message.toLowerCase().includes("subscription")) {
      navigate("/user-dashboard/my-profile");
    }
  };

  return (
    <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:p-8">
      <SectionHeader
        eyebrow="Creator Studio"
        title="Add Your Product"
        description="Use one consistent form flow to publish products with validated data, clean links, and reusable metadata."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5 md:grid-cols-2">
        <FormInput
          label="Product Name"
          error={errors.productName?.message}
          {...register("productName", {
            required: "Product name is required.",
            minLength: {
              value: 3,
              message: "Product name must be at least 3 characters long.",
            },
          })}
        />

        <FormInput
          label="Product Image URL"
          type="url"
          error={errors.productImage?.message}
          {...register("productImage", {
            required: "Product image URL is required.",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Please enter a valid product image URL.",
            },
          })}
        />

        <FormTextarea
          label="Description"
          rows="5"
          error={errors.description?.message}
          containerClassName="md:col-span-2"
          {...register("description", {
            required: "Description is required.",
            minLength: {
              value: 20,
              message: "Description should be at least 20 characters long.",
            },
          })}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700">Owner</label>
          <div className="mt-2 flex items-center gap-4 rounded-[1.5rem] bg-slate-50 p-4">
            <img
              src={user?.photoURL || "https://placehold.co/80x80?text=U"}
              alt={user?.displayName || "User"}
              className="h-14 w-14 rounded-full object-cover"
            />
            <div>
              <p className="font-black text-slate-900">{user?.displayName || "N/A"}</p>
              <p className="text-sm text-slate-500">{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Controller
            name="tags"
            control={control}
            rules={{
              validate: (value) =>
                value.length > 0 || "Please add at least one tag.",
            }}
            render={({ field }) => (
              <TagInputField
                label="Tags"
                value={field.value}
                onChange={field.onChange}
                error={errors.tags?.message}
                placeholder="Add relevant tags"
              />
            )}
          />
        </div>

        <FormInput
          label="External Link"
          type="url"
          error={errors.externalLink?.message}
          containerClassName="md:col-span-2"
          {...register("externalLink", {
            validate: (value) =>
              !value || /^https?:\/\/.+/i.test(value) || "Please enter a valid URL.",
          })}
        />

        <Button type="submit" className="w-full md:col-span-2">
          Submit Product
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;



