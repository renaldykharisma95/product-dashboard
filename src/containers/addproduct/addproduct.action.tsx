"use client";

import { useFormik } from "formik";
import { productValidationSchema } from "./addproduct.validation";
import { useMutation } from "@tanstack/react-query";
import { PostProduct } from "@/services/product.services";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const useAddProductAction = () => {
  const toast = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (loginData: any) => PostProduct({ ...loginData }),
    onSuccess: (data) => {
      toast({
        title: "Add Product Success",
        description: "Product added successfully",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("ADDED_PRODUCT", JSON.stringify(data));
      router.push("/product");
    },
    onError: (error) => {
      toast({
        title: "Add Product failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      tags: [""],
      brand: "",
      sku: "",
      weight: 0,
      dimensions: { width: 0, height: 0, depth: 0 },
      warrantyInformation: "",
      shippingInformation: "",
      availabilityStatus: "",
      returnPolicy: "",
      minimumOrderQuantity: 0,
      meta: { barcode: "", qrCode: "" },
      thumbnail: "",
      images: "",
    },
    validationSchema: productValidationSchema,
    onSubmit: (productPayload) => {
      mutation.mutate(productPayload);
    },
  });

  return { formik };
};

export default useAddProductAction;
