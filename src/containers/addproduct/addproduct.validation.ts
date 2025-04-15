import * as yup from "yup";

export const productValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0"),
  discountPercentage: yup
    .number()
    .min(0, "Discount must be at least 0")
    .max(100, "Discount cannot exceed 100"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 5")
    .max(5, "Rating must be between 0 and 5"),
  stock: yup
    .number()
    .required("Stock is required")
    .min(0, "Stock must be greater than or equal to 0"),
  tags: yup
    .array()
    .of(yup.string().required("Tag cannot be empty"))
    .min(1, "At least one tag is required"),
  brand: yup.string().required("Brand is required"),
  sku: yup.string().required("SKU is required"),
  weight: yup
    .number()
    .required("Weight is required")
    .min(0, "Weight must be greater than or equal to 0"),
  dimensions: yup.object().shape({
    width: yup.number().required("Width is required").min(0),
    height: yup.number().required("Height is required").min(0),
    depth: yup.number().required("Depth is required").min(0),
  }),
  warrantyInformation: yup.string().required("Warranty info is required"),
  shippingInformation: yup.string().required("Shipping info is required"),
  availabilityStatus: yup.string().required("Availability status is required"),
  returnPolicy: yup.string().required("Return policy is required"),
  //   minimumOrderQuantity: yup
  //     .number()
  //     .required("Minimum order quantity is required")
  //     .min(1, "Must be at least 1"),
  meta: yup.object().shape({
    barcode: yup.string().required("Barcode is required"),
    qrCode: yup.string().required("QR Code must be a valid URL"),
  }),
  thumbnail: yup
    .string()
    .url("Thumbnail must be a valid URL")
    .required("Thumbnail is required"),
  images: yup
    .string()
    .url("image must be a valid URL")
    .required("Image is required"),
});
