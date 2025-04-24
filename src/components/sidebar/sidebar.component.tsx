"use client";

import {
  Avatar,
  Box,
  Flex,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { sidebaritems } from "./sidebaritem";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = ({ profile }: { profile: string }) => {
  const pathname = usePathname();

  const profileData =
    profile && profile !== "undefined" ? JSON.parse(profile) : {};
  const fullname =
    (profileData.firstName || "") + " " + (profileData.lastName || "");

  return (
    <Box
      minH="100vh"
      w={{ base: "120px", md: "260px" }}
      bgGradient="linear(to-b, blue.600, blue.800)"
      color="white"
      position="fixed"
      left={0}
      top={0}
      px={2}
      display={{ base: "none", md: "block" }}
      zIndex={1}
      shadow="md"
    >
      <Flex minH="90px" w="full" justify="center" align="center" mb={8}>
        <VStack spacing={2}>
          <Avatar name={fullname} src={profileData.image} size="md" />
          <Text fontWeight="bold">{fullname}</Text>
        </VStack>
      </Flex>
      <VStack align="stretch" spacing={3}>
        {sidebaritems.map((item, idx) => {
          const isActive = pathname.includes(item.label.toLowerCase());
          return (
            <Link
              key={idx}
              href={item.href}
              _hover={{ textDecoration: "none" }}
              w="full"
            >
              <HStack
                px={4}
                py={2.5}
                borderRadius="md"
                transition="all 0.2s"
                bg={isActive ? "blue.700" : "transparent"}
                _hover={{
                  bg: "blue.600",
                  transform: "translateX(4px)",
                }}
              >
                <Image
                  src={item.image}
                  alt={`image${idx}`}
                  width={20}
                  height={20}
                />
                <Text fontSize="md">{item.label}</Text>
              </HStack>
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
