"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { blobBottomView, blobTopView } from "./login.style";
import useLoginAction from "./login.action";
import { Form } from "formik";

const LoginPage = () => {
  const { values, handleChange, handleSubmit, isDisabled } = useLoginAction();
  return (
    <Container>
      <Box {...blobTopView} />
      <Box {...blobBottomView} />
      <Flex minH="100vh" align="center" justify="center">
        <Box p={8} rounded="xl" shadow="lg" w={{ base: "90%", md: "400px" }}>
          <Stack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Login to Your Account
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="********"
                />
              </FormControl>
              <Button
                type="submit"
                mt={4}
                colorScheme="blue"
                size="lg"
                w="full"
                disabled={isDisabled}
              >
                Login
              </Button>
            </form>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
};

export default LoginPage;
