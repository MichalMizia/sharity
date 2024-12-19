import AddProductListingForm from "@/components/forms/AddProductListingForm";
import AddUserFileForm from "@/components/forms/AddUserFileForm";
import React from "react";

const AddProductPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      <AddUserFileForm />
      <AddProductListingForm />
    </div>
  );
};

export default AddProductPage;
