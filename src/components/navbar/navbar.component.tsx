"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef } from "react";
import useScreenDetector from "@/hooks/useScreenDetector";
import { useQuery } from "@tanstack/react-query";
import { GetMe } from "@/services/auth.services";
import { preventRefetch } from "@/app/helpers/preventRefetch";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { deleteAllCookies } from "@/app/helpers/clearCookies";

const NavbarDesktop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { isMobile } = useScreenDetector();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["GetMe"],
    queryFn: () => GetMe(),
    select: ({ data }) => data,
    ...preventRefetch,
  });

  useEffect(() => {
    if (!!data) Cookies.set("PROFILE_USER", JSON.stringify(data));
  }, [data]);

  const onSignOutClick = () => {
    deleteAllCookies();
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Flex
      height="70px"
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
      top={0}
      right={0}
      left={isMobile ? 0 : "auto"}
      w={{ md: "calc(100% - 200px)", sm: "100%" }}
      px={6}
      bg="linear-gradient(to right, #00b5d8, #007d80)"
      boxShadow="md"
      color="white"
      zIndex={2}
    >
      <Flex justifyContent="flex-start" alignItems="center" gap={6}>
        {isMobile && (
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            aria-label="menu"
            variant="ghost"
            color="white"
            borderColor="white"
          />
        )}
        <Heading as="h5" size="md">
          My Dashboard
        </Heading>
      </Flex>
      <Flex flexDirection="row" gap={8} alignItems="center">
        <Menu>
          <MenuButton
            as={Button}
            width="full"
            colorScheme="whiteAlpha"
            variant="outline"
            color="white"
            borderColor="white"
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          >
            {isLoading ? "Loading..." : "Sign Out"}
          </MenuButton>
          <MenuList>
            <MenuItem isDisabled _hover={{ bg: "none" }}>
              {isLoading ? (
                <Text color="gray.600" fontWeight="bold" pl={1}>
                  Loading...
                </Text>
              ) : error ? (
                <Text color="red.500" fontWeight="bold" pl={1}>
                  Error loading user
                </Text>
              ) : (
                <Text color="gray.600" fontWeight="bold" pl={1}>
                  {data?.username || "Guest"}
                </Text>
              )}
            </MenuItem>
            <MenuDivider />
            <MenuItem color="black" onClick={onSignOutClick}>
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <VStack align="start" spacing={6}>
              <Link
                href="/"
                _hover={{ textDecoration: "none" }}
                display="block"
                w="full"
              >
                <Text
                  fontSize="lg"
                  _hover={{
                    cursor: "pointer",
                    bg: "white.600",
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
                  _hover={{
                    cursor: "pointer",
                    bg: "white.600",
                    borderRadius: "md",
                  }}
                >
                  Product
                </Text>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavbarDesktop;
