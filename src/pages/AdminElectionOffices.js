import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  useDisclosure,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, ListView } from "../components";
import { BsPlus } from "react-icons/bs";

const OfficeList = [
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "President",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Vice President",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Financial Secretary",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "WOCOM",
  },
  {
    id: "org-12sdf38fh3jsbfhgl37a2hagde732",
    name: "Events Coordinator",
  },
];

export default function AdminElectionOffices() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <EditOfficeModal isOpen={isOpen} onClose={onClose} />
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
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 1 }}
            onClick={onOpen}
          >
            <BsPlus color="white" size="1.2em" />
            <Text display={{ base: "none", md: "inline" }}>CREATE OFFICE</Text>
          </Button>
        </Box>
        <Box display="flex" flex={1} flexDir="column">
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            mt={10}
            mb={2}
          >
            <Heading fontWeight="500" fontSize="3xl">
              ACES Elections
            </Heading>
            <Button
              bgColor="DarkPurple"
              color="white"
              size="lg"
              fontWeight="normal"
            >
              VIEW RESULTS
            </Button>
          </Box>
          <Heading fontWeight="400" fontSize="2xl" my={5}>
            Offices
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
            <ListView listItem={OfficeList} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function EditOfficeModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Election</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={onClose}
            color="white"
            fontWeight="500"
          >
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
