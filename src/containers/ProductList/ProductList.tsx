"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProductCard from "./partials/ProductCard/ProductCard";
import useProductListAction from "./ProductList.action";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import EditForm from "./partials/EditForm/EditForm";
import { useRef } from "react";
import useScreenDetector from "@/hooks/useScreenDetector";

const ProductList = () => {
  const {
    allProducts,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    search,
    setSearch,
    onEditProductPage,
    isOpen,
    onClose,
    router,
    editFormFormik,
    onDeleteProductPage,
    isOpenDelete,
    onCloseDelete,
    onDeleteActionProductPage,
  } = useProductListAction();

  const cancelRef = useRef(null);

  const { isMobile } = useScreenDetector();

  return (
    <Box pb={12}>
      <Flex
        align="center"
        justifyContent="space-between"
        pr={[0, 3, 5]}
        gap={4}
        flexDirection={["column", "column", "row"]}
      >
        <InputGroup w={["100%", "100%", "400px"]}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(value) => setSearch(value.target.value)}
            placeholder="Search Product"
            variant="filled"
          />
        </InputGroup>

        <Button
          colorScheme="green"
          leftIcon={<AddIcon />}
          onClick={() => router.push("/product/create-product")}
          w={["100%", "auto", "auto"]}
        >
          Create New Product
        </Button>
      </Flex>

      {isLoading ? (
        <Spinner size="xl" mt={8} />
      ) : (
        <>
          <SimpleGrid
            columns={[1, 2, 3]}
            spacing={6}
            py={5}
            pr={isMobile ? 0 : 5}
          >
            {allProducts.map((product, idx) => (
              <ProductCard
                onEdit={onEditProductPage}
                onDelete={onDeleteProductPage}
                key={idx}
                product={product}
              />
            ))}
          </SimpleGrid>
          <VStack mt={6}>
            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
                loadingText="Loading more..."
                variant="solid"
                colorScheme="blue"
              >
                Load More
              </Button>
            )}
            {!hasNextPage && <Text>No more products</Text>}
          </VStack>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <EditForm editFormFormik={editFormFormik} />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={editFormFormik.submitForm}
            >
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onDeleteActionProductPage}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default ProductList;
