"use client";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const EditForm = ({ editFormFormik }: any) => {
  const { values: formData, handleChange } = editFormFormik;
  return (
    <form>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={formData.title} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Brand</FormLabel>
        <Input name="brand" value={formData.brand} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Category</FormLabel>
        <Input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Discount (%)</FormLabel>
        <Input
          type="number"
          name="discountPercentage"
          value={formData.discountPercentage}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Stock</FormLabel>
        <Input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Rating</FormLabel>
        <Input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Image URL</FormLabel>
        <Input name="images" value={formData.images} onChange={handleChange} />
      </FormControl>

      <FormControl>
        <FormLabel>Thumbnail</FormLabel>
        <Input
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
        />
      </FormControl>
    </form>
  );
};

export default EditForm;
