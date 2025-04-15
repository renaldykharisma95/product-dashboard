"use client";

import { useFormik } from "formik";
import { loginSchema } from "./login.validation";
import { PostLogin } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const useLoginAction = () => {
  const toast = useToast();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (loginData: any) => PostLogin({ ...loginData }),
    onSuccess: (data) => {
      Cookies.set("ACCESS_TOKEN", String(data.accessToken));
      Cookies.set("REFRESH_TOKEN", String(data.refreshToken));
      router.push("/");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    },
  });

  const { values, handleChange, handleSubmit, isValid, dirty, isSubmitting } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (loginPayload) => {
        mutation.mutate(loginPayload);
      },
    });

  return {
    values,
    handleChange,
    handleSubmit,
    isDisabled: !isValid || !dirty,
  };
};

export default useLoginAction;
