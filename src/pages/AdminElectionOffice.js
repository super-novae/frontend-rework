import { useState, useEffect } from "react";
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
  FormLabel,
  Center,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, ListView } from "../components";
import { BsPlus, BsChevronRight } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { getCandidatesByOffice } from "../api/election/election-api";
import { getLocalStorage } from "../util/local-storage.util";
import { BsPersonCircle } from "react-icons/bs";

// const OfficeList = [
//   {
//     id: "org-12sdf38fh3jsbfhgl37a2hagde732",
//     name: "Nobel Fiawornu",
//   },
//   {
//     id: "org-12sdf38fh3jsbfhgl37a2hagde732",
//     name: "Nobel Fiawornu",
//   },
//   {
//     id: "org-12sdf38fh3jsbfhgl37a2hagde732",
//     name: "Nobel Fiawornu",
//   },
//   {
//     id: "org-12sdf38fh3jsbfhgl37a2hagde732",
//     name: "Nobel Fiawornu",
//   },
//   {
//     id: "org-12sdf38fh3jsbfhgl37a2hagde732",
//     name: "Nobel Fiawornu",
//   },
// ];

export default function AdminElectionOffice() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { electionId, officeId } = useParams();

  const [candidateList, setCandidateList] = useState([]);

  useEffect(() => {
    async function fetchCandidates() {
      const json_admin = getLocalStorage("ADMIN");
      const adminObj = JSON.parse(json_admin);

      const candidates = await getCandidatesByOffice(
        adminObj.token,
        electionId,
        officeId
      );
      setCandidateList(candidates);
    }

    // fetchCandidates();
  }, []);

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <CreateCandidateModal isOpen={isOpen} onClose={onClose} />
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
              CREATE CANDIDATE
            </Text>
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
            <Box display="flex" flexDir="row" alignItems="center" gap={2}>
              <Box
                display={{ base: "none", md: "flex" }}
                flexDir="row"
                alignItems="center"
                gap={2}
              >
                <Heading fontWeight="500" fontSize="3xl">
                  ACES Elections
                </Heading>
                <BsChevronRight size="1.2em" />
              </Box>
              <Heading fontWeight="500" fontSize={{ base: "2xl", md: "3xl" }}>
                Office(President)
              </Heading>
            </Box>
            <Button
              bgColor="DarkPurple"
              color="white"
              size={{ base: "md", md: "lg" }}
              fontWeight="normal"
            >
              VIEW RESULTS
            </Button>
          </Box>
          <Heading fontWeight="400" fontSize="2xl" my={5}>
            Candidates
          </Heading>
          {candidateList.length !== 0 && (
            <HStack px={4} mb={5} display={{ base: "none", md: "flex" }}>
              <Text flex={1} fontSize="xl">
                ID
              </Text>
              <Text flex={2} fontSize="xl">
                Name
              </Text>
            </HStack>
          )}
          <Box display="flex" flexDir="column" flex={1} gap={6}>
            <ListView listItem={candidateList} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function CreateCandidateModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Candidate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            display="flex"
            flexDir={{ base: "column", md: "row" }}
            borderWidth={1}
            minH="xs"
          >
            <Center display="flex" flex={1}>
              <BsPersonCircle />
            </Center>
            <Box display="flex" flex={1} flexDir="column" gap={3}>
              <Button bgColor="DarkPurple" color="white" fontWeight="500">
                UPLOAD PHOTO
              </Button>
              <Text fontWeight="600">REMOVE PHOTO</Text>
            </Box>
          </Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Programme</FormLabel>
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
