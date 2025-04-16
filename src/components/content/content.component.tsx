"use client";

import useScreenDetector from "@/hooks/useScreenDetector";
import NavbarDesktop from "../navbar/navbar.component";
import Sidebar from "../sidebar/sidebar.component";
import { Box, Container } from "@chakra-ui/react";

const Content = ({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: string;
}) => {
  const { isMobile } = useScreenDetector();
  return (
    <Container maxW="full" maxH="100vh" px={3}>
      {!isMobile && <Sidebar profile={profile} />}
      <NavbarDesktop profile={profile} />
      <Box
        position="absolute"
        top="120px"
        left={isMobile ? "0px" : "294px"}
        px={isMobile ? 3 : "auto"}
        w={isMobile ? "full" : "fit-content"}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Content;
