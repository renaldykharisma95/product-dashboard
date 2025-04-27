"use client";

import useDebounce from "@/hooks/useDebounce";
import {
  DeleteProduct,
  GetProductList,
  UpdateProduct,
} from "@/services/product.services";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useProductListAction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const toast = useToast();

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const debouncedSearch = useDebounce(search);
  const router = useRouter();
  const addedProduct = JSON.parse(
    localStorage.getItem("ADDED_PRODUCT") || "null"
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["infinite-products", debouncedSearch],
    queryFn: ({ pageParam = 0 }) =>
      GetProductList({
        limit: 10,
        skip: pageParam,
        q: debouncedSearch || "",
      }),
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  const { data: prodList } = useQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = 0 }) =>
      GetProductList({
        limit: 200,
      }),

    refetchOnWindowFocus: false,
  });

  console.log("prodList: ", prodList?.products);

  const mutationEdit = useMutation({
    mutationFn: (loginData: any) => {
      const id = loginData.id;
      delete loginData.id;
      return UpdateProduct(id || "", { ...loginData });
    },
    onSuccess: (data) => {
      toast({
        title: "Update Product Success",
        description: "Product added successfully",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("ADDED_PRODUCT", JSON.stringify(data));
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Update Product failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
  });

  const mutateDelete = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: () => {
      toast({
        title: "Delete Product Success",
        description: "Delete added successfully",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      refetch();
      onCloseDelete();
    },
    onError: (error) => {
      toast({
        title: "Update Product failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
  });

  const editFormFormik = useFormik({
    initialValues: {
      id: 0,
      title: "",
      price: 0,
      discountPercentage: 0,
      stock: 0,
      rating: 0,
      images: "",
      thumbnail: "",
      description: "",
      brand: "",
      category: "",
    },
    onSubmit: (data) => {
      mutationEdit.mutate({ id: data.id, title: data.title });
    },
  });

  const onEditProductPage = (product: any) => {
    onOpen();
    editFormFormik.setValues(product);
  };

  const onDeleteProductPage = (productId: any) => {
    onOpenDelete();
    setDeleteId(productId);
  };

  const onDeleteActionProductPage = () => {
    if (String(deleteId) === "195") {
      localStorage.clear();
      onCloseDelete();
    } else {
      mutateDelete.mutate(deleteId);
    }
  };

  return {
    allProducts: [
      ...(addedProduct ? [addedProduct] : []),
      ...(data?.pages.flatMap((page) => page.products) || []),
    ],
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    setSearch,
    search,
    onEditProductPage,
    isOpen,
    onClose,
    router,
    editFormFormik,
    onDeleteProductPage,
    isOpenDelete,
    onCloseDelete,
    onDeleteActionProductPage,
  };
};

export default useProductListAction;
