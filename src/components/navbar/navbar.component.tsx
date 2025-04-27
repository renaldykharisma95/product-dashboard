"use client";

import {
  Avatar,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import useScreenDetector from "@/hooks/useScreenDetector";
import { usePathname, useRouter } from "next/navigation";
import { deleteAllCookies } from "@/app/helpers/clearCookies";
import Logout from "../../assets/logout.webp";
import Image from "next/image";
import { sidebaritems } from "../sidebar/sidebaritem";
import { Profile } from "@/interfaces/profile.interface";

const NavbarDesktop = ({ profile }: { profile: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const { isMobile, isTablet } = useScreenDetector();
  const router = useRouter();
  const pathname = usePathname();
  const [profileData, setProfileData] = useState({} as Profile);

  useEffect(() => {
    setProfileData(
      profile && profile !== "undefined" ? JSON.parse(profile) : null
    );
  }, [profile]);

  const fullname =
    (profileData.firstName || "") + " " + (profileData.lastName || "");

  const onSignOutClick = () => {
    deleteAllCookies();
    localStorage.clear();
    router.push("/login");
  };

  const onProfileClick = () => {
    router.push("/profile");
  };

  return (
    <Flex
      height="90px"
      justifyContent="space-between"
      alignItems="center"
      position="absolute"
      top={0}
      right={0}
      left={isMobile || isTablet ? 0 : "auto"}
      w={{ lg: "calc(100% - 260px)", sm: "100%" }}
      px={isMobile || isTablet ? 2 : 6}
      boxShadow="md"
      zIndex={2}
    >
      <Flex justifyContent="flex-start" alignItems="center" gap={6}>
        {(isMobile || isTablet) && (
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            aria-label="menu"
            variant="ghost"
            color="inherit"
            borderColor="inherit"
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
            variant="outline"
            borderColor="grey.400"
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
            _hover={{ bg: "gray.400" }}
            _expanded={{ bg: "blue.400" }}
            _focus={{ boxShadow: "outline" }}
          >
            <Center gap={2}>
              <Image src={Logout} alt="signout" width={20} height={20} />
              Sign Out
            </Center>
          </MenuButton>
          <MenuList>
            <MenuItem color="black" onClick={onProfileClick}>
              Profile
            </MenuItem>
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
        <DrawerContent
          bgGradient="linear(to-b, blue.600, blue.800)"
          color="white"
          pt={4}
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex w="full" justify="center" align="center" mb={8}>
              <VStack spacing={2}>
                <Avatar name={fullname} src={profileData.image} size="md" />
                <Text fontWeight="bold">{fullname}</Text>
              </VStack>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={3}>
              {sidebaritems.map((item, idx) => {
                const isActive = pathname === item.href;
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
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavbarDesktop;
