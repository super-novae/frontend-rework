import { useState, useEffect } from "react";
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
import {
  getAllElectionsInOrganization,
  createElection,
  deleteElection,
} from "../api/election/election-api";
import { getLocalStorage } from "../util/local-storage.util";

export default function AdminElection({ logout }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [electionList, setElectionList] = useState([]);

  useEffect(() => {
    async function fetchAllElections() {
      const json_admin = getLocalStorage("ADMIN");
      const adminObj = JSON.parse(json_admin);
      console.log("AdminObj: ", adminObj);
      const electionList = await getAllElectionsInOrganization(
        adminObj.token,
        adminObj.orgId
      );
      if (electionList) setElectionList(electionList);
    }

    fetchAllElections();
  }, []);

  const createElectionHandler = async (createElectionBody) => {
    const json_admin = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(json_admin);

    createElectionBody = {
      ...createElectionBody,
      organization_id: adminObj.orgId,
    };
    console.log("NewCreateElectionBody: ", createElectionBody);

    const newElection = await createElection(
      adminObj.token,
      createElectionBody
    );
    if (newElection) {
      setElectionList((prev) => [...prev, newElection]);
    }
  };

  const deleteElectionHandler = async (electionId) => {
    const json_admin = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(json_admin);

    const result = await deleteElection(adminObj.token, electionId);
    if (result) {
      setElectionList((prev) =>
        prev.filter((election) => election.id !== electionId)
      );
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
      <CreateElectionModal
        isOpen={isOpen}
        onClose={onClose}
        createElectionHandler={createElectionHandler}
      />
      <Sidebar color="DarkPurple" logout={logout} />
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
          {electionList.length !== 0 && (
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
            <ListView
              listItem={electionList}
              deleteFunc={deleteElectionHandler}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
