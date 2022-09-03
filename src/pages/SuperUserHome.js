import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, CreateOrganizationModal } from "../components";
import { IoMdAdd } from "react-icons/io";

const OrgList = [
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Kwame Nkrumah University of Science and Technology",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Kwame Nkrumah University of Science and Technology",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Kwame Nkrumah University of Science and Technology",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Kwame Nkrumah University of Science and Technology",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Kwame Nkrumah University of Science and Technology",
  },
];

export default function SuperUserHome() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <CreateOrganizationModal isOpen={isOpen} onClose={onClose} />
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
            SuperUser
          </Heading>
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 1 }}
            onClick={onOpen}
          >
            <IoMdAdd color="white" size="1.2em" />
            <Text display={{ base: "none", md: "inline" }}>CREATE ORG</Text>
          </Button>
        </Box>
        <Box display="flex" flex={1} flexDir="column">
          <Heading fontWeight="500" fontSize="2xl" mt={10} mb={12}>
            Organizations
          </Heading>
          <HStack px={4} mb={5} display={{ base: "none", md: "flex" }}>
            <Text flex={1} fontSize="xl">
              ID
            </Text>
            <Text flex={2} fontSize="xl">
              Name
            </Text>
          </HStack>
          <Box display="flex" flexDir="column" flex={1} gap={4}>
            <Organizations />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function Organizations() {
  return OrgList.map((org) => (
    <Box
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      borderWidth="2px"
      borderColor="DarkPurple"
      borderRadius={{ base: 5, md: 3 }}
      p={4}
    >
      <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
        {org.id}
      </Text>
      <Text flex={2} fontSize={{ base: "md", md: "xl" }}>
        {org.name}
      </Text>
    </Box>
  ));
}
