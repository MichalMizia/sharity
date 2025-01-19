import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUserFiles } from "@/lib/hooks/useUserFiles";
import { MultiSelect } from "../ui/multi-select";
import useCreateProductListing from "@/lib/hooks/useCreateProductListing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import categories from "@/lib/data/categories";

interface IFormInput {
  title: string;
  description: string;
  price: number;
}

const AddProductListingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { user } = useAuth();
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [previewFileId, setPreviewFileId] = useState<string | "">(""); // Pole dla pliku podglądu (opcjonalne)
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  const { userFiles, error, isLoading } = useUserFiles(user?.id || "");
  const {
    mutate,
    isPending: isSubmitting,
    isError,
    error: submitError,
    isSuccess,
  } = useCreateProductListing();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!selectedFileIds.length) {
      toast.error("Please select at least one file for the product listing");
      return;
    }

    const priceFull = Math.floor(data.price);
    const priceChange = Math.round((data.price - priceFull) * 100);

    // Tworzymy obiekt bez previewFileId, jeśli nie zostało wybrane
    const productListing: any = {
      ...data,
      priceFull,
      priceChange,
      category,
      tags,
      userId: user?.id ? Number(user.id) : 0,
      user: {
        id: user?.id || "",
      },
      userFileIds: selectedFileIds.map((id) => parseInt(id)),
    };

    // Tylko jeśli wybrano plik podglądu, dodajemy go do obiektu
    if (previewFileId) {
      productListing.previewFileId = parseInt(previewFileId);
    }

    mutate(productListing, {
      onSuccess: () => {
        toast.success("Product added successfully!");
      },
      onError: (e) => {
        console.log(e);
        toast.error("Failed to add product");
      },
    });
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">Add Product Listing</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: true })}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="price"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: true,
              min: {
                value: 0.01,
                message: "Price must be greater than zero",
              },
            })}
            className="block w-full p-2 border border-gray-300 rounded-lg"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Select
            onValueChange={(e) => {
              setCategory(e);
              setTags([]);
            }}
          >
            <SelectTrigger className="w-full min-h-[42px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  className="cursor-pointer border-b border-gray-300 hover:border-b-gray-500 min-h-[42px]"
                  key={category.name}
                  value={category.name}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-2">
          <label
            htmlFor="tags"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Tags
          </label>
          <MultiSelect
            options={
              categories
                .find((cat) => cat.name === category)
                ?.tags.map((tag) => ({
                  label: tag,
                  value: tag,
                })) || []
            }
            onValueChange={setTags}
            value={tags}
            placeholder="Select tags"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="userFiles"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Select from Your Files
          </label>
          {error ? (
            <p className="text-red-500 text-sm">
              Create some files before adding a product
            </p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <MultiSelect
              options={
                userFiles?.length
                  ? userFiles.map((file) => ({
                      label: file.fileName,
                      value: file.id.toString(),
                    }))
                  : []
              }
              onValueChange={(e) => setSelectedFileIds(e)}
            />
          )}
        </div>
        <div className="mb-2">
          <label
            htmlFor="previewFile"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Select Preview File (Optional, Only PNG or JPEG)
          </label>
          <Select
            onValueChange={(e) => setPreviewFileId(e)}
            disabled={!userFiles?.length}
          >
            <SelectTrigger className="w-full min-h-[42px]">
              <SelectValue placeholder="Select a preview file" />
            </SelectTrigger>
            <SelectContent>
              {userFiles?.length &&
                userFiles
                  .filter((file) =>
                    [".png", ".jpeg", ".jpg"].some((ext) =>
                      file.fileName.endsWith(ext)
                    )
                  )
                  .map((file) => (
                    <SelectItem key={file.id} value={file.id.toString()}>
                      {file.fileName}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductListingForm;
