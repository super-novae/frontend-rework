import {
  Container,
  Box,
  Heading,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, CreateVoterModal } from "../components";
import { BsChevronLeft, BsPlus } from "react-icons/bs";

const VoterList = [
  {
    id: "elec-he73901jsnv985lkmn216789fh4",
    name: "Nobel Fiawornu",
    email: "nobelfiawornu@email.com",
  },
  {
    id: "elec-he73901jsnv985lkmn216789fh4",
    name: "Nobel Fiawornu",
    email: "nobelfiawornu@email.com",
  },
  {
    id: "elec-he73901jsnv985lkmn216789fh4",
    name: "Nobel Fiawornu",
    email: "nobelfiawornu@email.com",
  },
  {
    id: "elec-he73901jsnv985lkmn216789fh4",
    name: "Nobel Fiawornu",
    email: "nobelfiawornu@email.com",
  },
  {
    id: "elec-he73901jsnv985lkmn216789fh4",
    name: "Nobel Fiawornu",
    email: "nobelfiawornu@email.com",
  },
];

export default function AdminVoter() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <CreateVoterModal isOpen={isOpen} onClose={onClose} />
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
          <Box display="flex" alignItems="center" gap={3}>
            <BsChevronLeft color="black" size="1.3em" />
            <Heading fontWeight="semibold" fontSize="3xl">
              Administrator
            </Heading>
          </Box>
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 3 }}
            onClick={onOpen}
          >
            <BsPlus />
            <Text display={{ base: "none", md: "inline" }}>CREATE VOTER</Text>
          </Button>
        </Box>
        <Heading fontWeight="500" fontSize="1.3em" my={7}>
          Voters
        </Heading>
        <Box display={{ base: "none", md: "flex" }} p={4}>
          <Heading fontWeight="400" fontSize="1.2em" flex={1}>
            ID
          </Heading>
          <Box display="flex" flex={2}>
            <Heading fontWeight="400" fontSize="1.2em" flex={1}>
              Name
            </Heading>
            <Heading fontWeight="400" fontSize="1.2em" flex={2}>
              Email
            </Heading>
          </Box>
        </Box>
        <Box display="flex" flex={1} flexDir="column" gap={6}>
          <AdminVoterList listItem={VoterList} />
        </Box>
      </Box>
    </Container>
  );
}

function AdminVoterList({ listItem }) {
  return listItem.map((item) => (
    <Box
      display="flex"
      borderWidth={1}
      borderColor="DarkPurple"
      borderRadius={{ base: 5, md: 3 }}
      p={4}
      alignItems="center"
      _hover={{
        cursor: "pointer",
        borderWidth: 2,
      }}
    >
      <Box display="flex" flexDir={{ base: "column", md: "row" }} flex={1}>
        <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
          {item.id}
        </Text>
        <Box display="flex" flex={2} flexDir={{ base: "column", md: "row" }}>
          <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
            {item.name}
          </Text>
          <Text flex={2} fontSize={{ base: "md", md: "xl" }}>
            {item.email}
          </Text>
        </Box>
      </Box>
    </Box>
  ));
}
