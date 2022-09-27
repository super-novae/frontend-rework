import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  useDisclosure,
  CircularProgress,
  Center,
} from "@chakra-ui/react";
import {
  Sidebar,
  MobileHeader,
  CreateOrganizationModal,
  ListView,
} from "../components";
import { IoMdAdd } from "react-icons/io";

import {
  getAllOrganizations,
  deleteOrganizationById,
  createOrganization,
} from "../api/organization/organization-api";
import { getLocalStorage } from "../util/local-storage.util";

export default function SuperUserHome({ logout }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [orgList, setOrgList] = useState(null);

  const [screenLoading, setScreenLoading] = useState(true);

  async function fetchOrganizations(token) {
    const organizations = await getAllOrganizations(token);
    if (organizations) {
      setOrgList(organizations);
      setScreenLoading(false);
    }
  }

  useEffect(() => {
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );
    if (super_user_token) {
      fetchOrganizations(super_user_token);
    }
  }, []);

  const deleteOrganizationHandler = (id) => {
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );
    deleteOrganizationById(super_user_token, id);
    fetchOrganizations(super_user_token);
  };

  const handleCreateOrganization = async (name) => {
    const super_user_token = getLocalStorage("SUPER_USER");
    console.log(super_user_token);
    const newOrg = await createOrganization(super_user_token, name);
    if (newOrg) {
      setOrgList((prev) => [...prev, newOrg]);
    }
    onClose();
  };

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <CreateOrganizationModal
        isOpen={isOpen}
        onClose={onClose}
        handleCreateOrganization={handleCreateOrganization}
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
          {screenLoading ? (
            <Center h="full" color="DarkPurple">
              <CircularProgress isIndeterminate color="black" size="10" />
            </Center>
          ) : (
            <>
              {orgList !== null && (
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
                  listItem={orgList}
                  navigateTo="organization"
                  deleteFunc={deleteOrganizationHandler}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
