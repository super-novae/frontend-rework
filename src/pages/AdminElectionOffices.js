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
  CircularProgress,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, ListView } from "../components";
import { BsPlus, BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import {
  getElectionOffices,
  createElectionOffice,
  deleteElectionOffice,
} from "../api/election/election-api";
import { getLocalStorage } from "../util/local-storage.util";

export default function AdminElectionOffices({ logout }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { id } = useParams();

  const [officeList, setOfficeList] = useState([]);

  const [screenLoading, setScreenLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllOffices() {
      const json_admin = getLocalStorage("ADMIN");
      const adminObj = JSON.parse(json_admin);

      const officeList = await getElectionOffices(adminObj.token, id);
      if (officeList) {
        setOfficeList(officeList);
        setScreenLoading(false);
      }
    }

    fetchAllOffices();
  }, []);

  const createOfficeHandler = async (body) => {
    const json_admin = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(json_admin);

    body = { ...body, election_id: id };

    const newOffice = await createElectionOffice(adminObj.token, id, body);
    if (newOffice) {
      setOfficeList((prev) => [...prev, newOffice]);
    }
  };

  const deleteOfficeHandler = async (officeId) => {
    const json_admin = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(json_admin);

    const response = await deleteElectionOffice(adminObj.token, id, officeId);
    if (response) {
      setOfficeList((prev) => prev.filter((office) => office.id !== officeId));
    }
  };

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <EditOfficeModal
        isOpen={isOpen}
        onClose={onClose}
        createOfficeHandler={createOfficeHandler}
      />
      <Sidebar color="DarkPurple" logout={logout} />
      <MobileHeader logout={logout} color="DarkPurple" />
      <Box display="flex" flex={1} flexDir="column" p={10}>
        <Box
          display="flex"
          borderBottomWidth={1}
          borderColor="ShadowBlue"
          justifyContent="space-between"
          pb={7}
        >
          <Box display="flex" flexDir="row" gap={3} alignItems="center">
            <BsChevronLeft
              color="black"
              size="1.3em"
              onClick={() => navigate(-1)}
            />
            <Heading
              fontWeight="semibold"
              fontSize="3xl"
              display={{ base: "none", md: "inline" }}
            >
              Administrator
            </Heading>
          </Box>
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
          {officeList.length !== 0 && (
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
            {screenLoading ? (
              <Center h="full">
                <CircularProgress
                  isIndeterminate
                  color="DarkPurple"
                  size="10"
                />
              </Center>
            ) : (
              <ListView
                listItem={officeList}
                navigateTo={`/admin/elections/${id}/offices`}
                deleteFunc={deleteOfficeHandler}
                spec_case={true}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function EditOfficeModal({ isOpen, onClose, createOfficeHandler }) {
  const [name, setName] = useState("");
  const [routeName, setRouteName] = useState("");

  const createOffice = () => {
    const data = { name, route_name: routeName };
    createOfficeHandler(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Election Office</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Route Name</FormLabel>
            <Input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={createOffice}
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
