import { Container, Box, Heading } from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";

export default function SuperUserHome() {
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <Sidebar />
      <MobileHeader />
      <Box display="flex" flex={1} flexDir="column" p={10}>
        <Box
          display="flex"
          borderBottomWidth={1}
          borderColor="ShadowBlue"
          justifyContent="space-between"
          pb={7}
        >
          <Heading fontWeight="semibold" fontSize="3xl">
            Administrator
          </Heading>
        </Box>
        <Box
          display="flex"
          flex={1}
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
          gap={10}
        >
          <Box
            borderWidth={1}
            borderRadius={5}
            p="20"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          >
            <Heading>Election</Heading>
          </Box>
          <Box
            borderWidth={1}
            borderRadius={5}
            py="80px"
            px="89px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            bgColor="DarkPurple"
          >
            <Heading color="Cerise">Voters</Heading>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
