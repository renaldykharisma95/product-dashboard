"use client";

import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Badge,
  Button,
  HStack,
} from "@chakra-ui/react";

const ProductCard = ({
  product,
  onEdit,
  onDelete,
}: {
  product: any;
  onEdit?: (product: any) => void;
  onDelete?: (productId: string) => void;
}) => (
  <Box
    borderWidth="1px"
    borderRadius="xl"
    overflow="hidden"
    p={4}
    boxShadow="md"
  >
    <Image
      src={product?.thumbnail || "https://via.placeholder.com/150"}
      alt={product?.title}
      borderRadius="md"
      objectFit="cover"
      w="100%"
      h="160px"
      mb={3}
    />
    <Stack spacing={3}>
      <Heading size="md">{product?.title}</Heading>
      <Text fontSize="sm" noOfLines={2} minH="42px">
        {product?.description}
      </Text>
      <Text fontWeight="bold">${product?.price}</Text>
      <Badge
        colorScheme={
          product?.availabilityStatus === "Low Stock" ||
          !product?.availabilityStatus
            ? "red"
            : "green"
        }
        alignSelf="start"
      >
        {product?.availabilityStatus || "No Status"}
      </Badge>
      <Text fontSize="xs" color="gray.500">
        Brand: {product?.brand}
      </Text>
      <HStack pt={2}>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => {
            if (onEdit) onEdit(product);
          }}
        >
          Edit
        </Button>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => {
            if (onDelete) onDelete(product?.id);
          }}
        >
          Delete
        </Button>
      </HStack>
    </Stack>
  </Box>
);

export default ProductCard;
