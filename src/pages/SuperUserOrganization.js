import { Container, Box, Heading, Button, Text } from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";
import { BsChevronLeft } from "react-icons/bs";

export default function SuperUserOrganization() {
  return (
    <Container maxW="100%" minH="100vh" p={0} display="flex">
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
          <Box display="flex" alignItems="center" gap={3}>
            <BsChevronLeft color="black" size="1.3em" />
            <Heading fontWeight="semibold" fontSize="3xl">
              SuperUser
            </Heading>
          </Box>
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 1 }}
          >
            {/* <IoMdAdd color="white" size="1.2em" /> */}
            <Text display={{ base: "none", md: "inline" }}>EDIT ORG</Text>
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
