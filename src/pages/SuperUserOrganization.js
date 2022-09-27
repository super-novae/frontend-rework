import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Button,
  Text,
  useDisclosure,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import {
  Sidebar,
  MobileHeader,
  EditOrganizationModal,
  AddAdminToOrganizationModal,
  ListView,
} from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { BsChevronLeft, BsPencil, BsPlusLg, BsTrashFill } from "react-icons/bs";

import { getOrganizationById } from "../api/organization/organization-api";
import { getAdministratorById, deleteAdminById } from "../api/auth/admin";
import { getAllElectionsInOrganization } from "../api/election/election-api";

export default function SuperUserOrganization({ logout }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: newIsOpen,
    onOpen: newOnOpen,
    onClose: newOnClose,
  } = useDisclosure();
  const navigate = useNavigate();
  const { id } = useParams();

  const [orgDetails, setOrgDetails] = useState(null);
  const [admin, setAdmin] = useState(null);

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );

    async function getAdminByIdHandler(id) {
      const admin = await getAdministratorById(super_user_token, id);
      if (admin) {
        setAdmin(admin);
        setScreenLoading(false);
      }
    }

    async function getOrgByIdHandler(id) {
      const org = await getOrganizationById(super_user_token, id);
      setOrgDetails(org);
      if (org.administrator_id) {
        getAdminByIdHandler(org.administrator_id);
      }
    }

    getOrgByIdHandler(id);
  }, []);

  const deleteAdminHandler = async () => {
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );
    await deleteAdminById(super_user_token, admin.id);
  };

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <AddAdminToOrganizationModal
        isOpen={isOpen}
        onClose={onClose}
        setAdmin={setAdmin}
        orgId={id}
      />
      <EditOrganizationModal isOpen={newIsOpen} onClose={newOnClose} />
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
          <Box display="flex" alignItems="center" gap={3}>
            <Box _hover={{ cursor: "pointer" }}>
              <BsChevronLeft
                color="black"
                size="1.3em"
                onClick={() => navigate(-1)}
              />
            </Box>
            <Heading fontWeight="semibold" fontSize="3xl">
              SuperUser
            </Heading>
          </Box>
          <Box display="flex" gap={3}>
            <Button
              bgColor="DarkPurple"
              color="white"
              size="lg"
              fontWeight="normal"
              gap={{ base: 0, md: 3 }}
              onClick={() => onOpen()}
              alignItems="center"
            >
              <BsPlusLg size="16" />
              <Text display={{ base: "none", md: "inline" }}>ADD ADMIN</Text>
            </Button>
            <Button
              bgColor="DarkPurple"
              color="white"
              size="lg"
              fontWeight="normal"
              gap={{ base: 0, md: 3 }}
              onClick={() => newOnOpen()}
            >
              <BsPencil />
              <Text display={{ base: "none", md: "inline" }}>EDIT ORG</Text>
            </Button>
          </Box>
        </Box>
        <Heading fontWeight="500" fontSize="1.3em" my={7}>
          {orgDetails?.name}
        </Heading>
        {!screenLoading && (
          <Heading fontWeight="400" fontSize="1.3em" mb={7}>
            Administrator
          </Heading>
        )}
        {screenLoading ? (
          <Center h="full">
            <CircularProgress isIndeterminate color="DarkPurple" size="10" />
          </Center>
        ) : admin ? (
          <Box
            display="flex"
            borderWidth={1}
            borderColor="DarkPurple"
            borderRadius={{ base: 5, md: 3 }}
            p={4}
            alignItems="center"
          >
            <Box
              display="flex"
              flexDir={{ base: "column", md: "row" }}
              flex={1}
            >
              <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
                {admin?.id}
              </Text>
              <Box
                display="flex"
                flex={2}
                flexDir={{ base: "column", md: "row" }}
              >
                <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
                  {admin?.name}
                </Text>
                <Text flex={2} fontSize={{ base: "md", md: "xl" }}>
                  {admin?.email}
                </Text>
              </Box>
            </Box>
            <BsTrashFill
              color="red"
              size="18"
              onClick={() => deleteAdminHandler()}
            />
          </Box>
        ) : (
          <Box>
            <Text>Nothing to show here</Text>
          </Box>
        )}
      </Box>
    </Container>
  );
}
