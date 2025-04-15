"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import useAddProductAction from "./addproduct.action";

const AddProductForm = () => {
  const { formik } = useAddProductAction();
  const { errors, touched, handleBlur } = formik;
  const { values, handleChange, setFieldValue, handleSubmit } = formik;

  return (
    <Box maxW="full" mx="auto" p={6}>
      <Heading size="md" mb={4}>
        Add New Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={!!errors.title && touched.title}>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormErrorMessage>{errors.title}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.description && touched.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isInvalid={!!errors.category && touched.category}>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.brand && touched.brand}>
              <FormLabel>Brand</FormLabel>
              <Input
                name="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.brand}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.price && touched.price}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                name="price"
                value={values.price}
                onChange={(value) => setFieldValue("price", value)}
                onBlur={handleBlur}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.discountPercentage && touched.discountPercentage
              }
            >
              <FormLabel>Discount %</FormLabel>
              <NumberInput
                name="discountPercentage"
                value={values.discountPercentage}
                onChange={(value) => setFieldValue("discountPercentage", value)}
                onBlur={handleBlur}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.discountPercentage}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.stock && touched.stock}>
              <FormLabel>Stock</FormLabel>
              <NumberInput
                name="stock"
                value={values.stock}
                onChange={(value) => setFieldValue("stock", value)}
                onBlur={handleBlur}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.stock}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.sku && touched.sku}>
              <FormLabel>SKU</FormLabel>
              <Input
                name="sku"
                value={values.sku}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.sku}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <Divider />

          <Heading size="sm">Tags</Heading>
          <Stack spacing={2}>
            <Stack spacing={2}>
              {values.tags.map((tag, idx) => (
                <FormControl key={idx} isInvalid={!!errors.tags?.[idx]}>
                  <Input
                    name={`tags[${idx}]`}
                    value={values.tags[idx]}
                    placeholder={`Tag ${idx + 1}`}
                    onChange={(e) =>
                      setFieldValue(`tags[${idx}]`, e.target.value)
                    }
                    onBlur={handleBlur}
                  />
                  <FormErrorMessage>{errors.tags?.[idx]}</FormErrorMessage>
                </FormControl>
              ))}

              {values.tags.length < 2 && (
                <Button
                  size="sm"
                  onClick={() => setFieldValue("tags", [...values.tags, ""])}
                  type="button"
                  colorScheme="blue"
                >
                  + Add Tag
                </Button>
              )}
            </Stack>
          </Stack>

          <Heading size="sm" mt={6}>
            Images
          </Heading>
          <FormControl isInvalid={!!errors.images && touched.images}>
            <Input
              name="images"
              value={values.images}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Image URL..."
            />
            <FormErrorMessage>{errors.images}</FormErrorMessage>
          </FormControl>

          <Divider />

          <Heading size="sm">Details</Heading>
          <SimpleGrid columns={2} spacing={4}>
            <FormControl
              isInvalid={
                !!errors.warrantyInformation && touched.warrantyInformation
              }
            >
              <FormLabel>Warranty</FormLabel>
              <Input
                name="warrantyInformation"
                value={values.warrantyInformation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.warrantyInformation}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.shippingInformation && touched.shippingInformation
              }
            >
              <FormLabel>Shipping Info</FormLabel>
              <Input
                name="shippingInformation"
                value={values.shippingInformation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.shippingInformation}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.availabilityStatus && touched.availabilityStatus
              }
            >
              <FormLabel>Availability</FormLabel>
              <Input
                name="availabilityStatus"
                value={values.availabilityStatus}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.availabilityStatus}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.returnPolicy && touched.returnPolicy}
            >
              <FormLabel>Return Policy</FormLabel>
              <Input
                name="returnPolicy"
                value={values.returnPolicy}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.returnPolicy}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <Divider />

          <Heading size="sm">Dimensions</Heading>
          <SimpleGrid columns={3} spacing={4}>
            <FormControl
              isInvalid={
                !!errors.dimensions?.width && touched.dimensions?.width
              }
            >
              <FormLabel>Width</FormLabel>
              <NumberInput
                name="dimensions.width"
                value={values.dimensions.width}
                onChange={(value) => setFieldValue("dimensions.width", value)}
                onBlur={handleBlur}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.dimensions?.width}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.dimensions?.height && touched.dimensions?.height
              }
            >
              <FormLabel>Height</FormLabel>
              <NumberInput
                name="dimensions.height"
                value={values.dimensions.height}
                onChange={(value) => setFieldValue("dimensions.height", value)}
                onBlur={handleBlur}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.dimensions?.height}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={
                !!errors.dimensions?.depth && touched.dimensions?.depth
              }
            >
              <FormLabel>Depth</FormLabel>
              <NumberInput
                name="dimensions.depth"
                value={values.dimensions.depth}
                onChange={(value) => setFieldValue("dimensions.depth", value)}
                onBlur={handleBlur}
              >
                <NumberInputField />
              </NumberInput>
              <FormErrorMessage>{errors.dimensions?.depth}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <Divider />

          <Heading size="sm">Meta</Heading>
          <SimpleGrid columns={2} spacing={4}>
            <FormControl
              isInvalid={!!errors.meta?.barcode && touched.meta?.barcode}
            >
              <FormLabel>Barcode</FormLabel>
              <Input
                name="meta.barcode"
                value={values.meta.barcode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.meta?.barcode}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.meta?.qrCode && touched.meta?.qrCode}
            >
              <FormLabel>QR Code</FormLabel>
              <Input
                name="meta.qrCode"
                value={values.meta.qrCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <FormErrorMessage>{errors.meta?.qrCode}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>

          <Divider />

          <FormControl isInvalid={!!errors.thumbnail && touched.thumbnail}>
            <FormLabel>Thumbnail</FormLabel>
            <Input
              name="thumbnail"
              value={values.thumbnail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormErrorMessage>{errors.thumbnail}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="green">
            Submit Product
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddProductForm;
