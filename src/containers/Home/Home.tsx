"use client";

import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const HomeView = ({ data }: any) => {
  const [profileData, setProfileData] = useState({} as any);

  useEffect(() => {
    if (typeof window !== undefined) {
      setProfileData(JSON.parse(data));
    }
  }, [data]);

  return (
    <Box pb={6}>
      <Box>
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={6}>
          <Avatar
            size="2xl"
            name={profileData?.firstName}
            src={profileData?.image}
          />
          <Box>
            <Heading size="lg">
              {profileData?.firstName} {profileData?.lastName}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              @{profileData?.username} · {profileData?.role}
            </Text>
            <Badge mt={2} colorScheme="purple">
              {profileData?.bloodGroup}
            </Badge>
          </Box>
        </Flex>

        <Divider my={6} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Stack>
            <Heading size="sm">Personal Info</Heading>
            <Text>Age: {profileData?.age}</Text>
            <Text>Birthdate: {profileData?.birthDate}</Text>
            <Text>Email: {profileData?.email}</Text>
            <Text>Phone: {profileData?.phone}</Text>
            <Text>Eye Color: {profileData?.eyeColor}</Text>
            <Text>
              Hair: {profileData?.hair?.color}, {profileData?.hair?.type}
            </Text>
            <Text>Height: {profileData?.height} cm</Text>
            <Text>Weight: {profileData?.weight} kg</Text>
          </Stack>

          <Stack>
            <Heading size="sm">Address</Heading>
            <Text>{profileData?.address?.address}</Text>
            <Text>
              {profileData?.address?.city}, {profileData?.address?.state}{" "}
              {profileData?.address?.postalCode}
            </Text>
            <Text>{profileData?.address?.country}</Text>
          </Stack>

          <Stack>
            <Heading size="sm">Company</Heading>
            <Text>Name: {profileData?.company?.name}</Text>
            <Text>Title: {profileData?.company?.title}</Text>
            <Text>Dept: {profileData?.company?.department}</Text>
            <Text>City: {profileData?.company?.address.city}</Text>
          </Stack>

          <Stack>
            <Heading size="sm">Education & Bank</Heading>
            <Text>University: {profileData?.university}</Text>
            <Text>
              Card: {profileData?.bank?.cardType} ****
              {profileData?.bank?.cardNumber.slice(-4)}
            </Text>
            <Text>IBAN: {profileData?.bank?.iban}</Text>
            <Text>Currency: {profileData?.bank?.currency}</Text>
          </Stack>

          <Stack>
            <Heading size="sm">Crypto</Heading>
            <Text>Coin: {profileData?.crypto?.coin}</Text>
            <Text>Wallet: {profileData?.crypto?.wallet}</Text>
            <Text>Network: {profileData?.crypto?.network}</Text>
          </Stack>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default HomeView;
