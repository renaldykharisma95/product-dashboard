"use client";

import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <Flex>
      <Box
        minH="100vh"
        w={{ base: "60px", md: "200px" }}
        h="100vh"
        bg="teal.500"
        color="white"
        position="fixed"
        left={0}
        top={0}
        py={4}
        px={0}
        display={{ base: "none", md: "block" }}
        zIndex={1}
      >
        <VStack align="start" spacing={6}>
          <Link
            href="/"
            _hover={{ textDecoration: "none" }}
            display="block"
            w="full"
          >
            <Text
              fontSize="lg"
              px={4}
              py={2}
              w="full"
              display="block"
              _hover={{
                cursor: "pointer",
                bg: "teal.600",
                borderRadius: "md",
              }}
            >
              Home
            </Text>
          </Link>

          <Link
            href="/product"
            _hover={{ textDecoration: "none" }}
            display="block"
            w="full"
          >
            <Text
              fontSize="lg"
              px={4}
              py={2}
              w="full"
              display="block"
              _hover={{
                cursor: "pointer",
                bg: "teal.600",
                borderRadius: "md",
              }}
            >
              Product
            </Text>
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Sidebar;
