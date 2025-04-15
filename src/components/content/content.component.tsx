"use client";

import useScreenDetector from "@/hooks/useScreenDetector";
import NavbarDesktop from "../navbar/navbar.component";
import Sidebar from "../sidebar/sidebar.component";
import { Box, Container } from "@chakra-ui/react";

const Content = ({ children }: { children: React.ReactNode }) => {
  const { isMobile } = useScreenDetector();
  return (
    <Container maxW="full" maxH="100vh" px={3}>
      {!isMobile && <Sidebar />}
      <NavbarDesktop />
      <Box
        position="absolute"
        top="90px"
        left={isMobile ? "5%" : "16%"}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Content;
