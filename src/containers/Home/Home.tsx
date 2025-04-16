"use client";

import { preventRefetch } from "@/app/helpers/preventRefetch";
import useScreenDetector from "@/hooks/useScreenDetector";
import { GetMe } from "@/services/auth.services";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const HomeView = () => {
  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["GetMe"],
    queryFn: () => GetMe(),
    select: (data) => data,
    ...preventRefetch,
  });

  const { isMobile } = useScreenDetector();

  if (isLoading) {
    return (
      <Box pb={6}>
        <Flex direction={{ base: "column", md: "row" }} align="center" gap={6}>
          <SkeletonCircle size="32" />
          <Box width="full">
            <Skeleton height="30px" width="200px" mb={2} />
            <Skeleton height="20px" width="150px" mb={2} />
            <Skeleton height="24px" width="80px" />
          </Box>
        </Flex>

        <Divider my={6} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {[...Array(5)].map((_, i) => (
            <Stack key={i}>
              <Skeleton height="24px" width="120px" mb={2} />
              {[...Array(7)].map((_, j) => (
                <Skeleton key={j} height="20px" width="full" />
              ))}
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Error loading profile: {error.message}</Text>
      </Box>
    );
  }

  return (
    <Box pb={6}>
      <Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={6}
        >
          <Avatar
            size="2xl"
            name={profileData?.firstName}
            src={profileData?.image}
          />
          <Flex
            align={isMobile ? "center" : "start"}
            justify={isMobile ? "start" : "start"}
            direction="column"
          >
            <Heading size="lg">
              {profileData?.firstName} {profileData?.lastName}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              @{profileData?.username} · {profileData?.role}
            </Text>
            <Badge mt={2} colorScheme="purple">
              {profileData?.bloodGroup}
            </Badge>
          </Flex>
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
              {profileData?.bank?.cardNumber?.slice(-4)}
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
