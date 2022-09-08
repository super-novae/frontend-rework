import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Sidebar,
  MobileHeader,
  CreateElectionModal,
  ListView,
} from "../components";
import { BsPlus } from "react-icons/bs";

const ElectionList = [
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "SRC ELECTION",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "ACES ELECTION",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "ACES ELECTION",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "GADRES ELECTION",
  },
];

export default function AdminElection() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <CreateElectionModal isOpen={isOpen} onClose={onClose} />
      <Sidebar color="DarkPurple" />
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
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 1 }}
            onClick={onOpen}
          >
            <BsPlus color="white" size="1.2em" />
            <Text display={{ base: "none", md: "inline" }}>
              CREATE ELECTION
            </Text>
          </Button>
        </Box>
        <Box display="flex" flex={1} flexDir="column">
          <Heading fontWeight="500" fontSize="2xl" mt={10} mb={12}>
            Elections
          </Heading>
          <HStack px={4} mb={5} display={{ base: "none", md: "flex" }}>
            <Text flex={1} fontSize="xl">
              ID
            </Text>
            <Text flex={2} fontSize="xl">
              Name
            </Text>
          </HStack>
          <Box display="flex" flexDir="column" flex={1} gap={6}>
            <ListView listItem={ElectionList} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
