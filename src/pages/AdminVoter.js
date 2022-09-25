import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Button,
  Text,
  useDisclosure,
  Center,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, CreateVoterModal } from "../components";
import { BsChevronLeft, BsPlus, BsFileSpreadsheetFill } from "react-icons/bs";

import { getAllVotersInOrganization } from "../api/voter/voter-api";
import { adminRegisterVoter } from "../api/auth/voter";
import { getLocalStorage } from "../util/local-storage.util";

export default function AdminVoter({ logout }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [voterList, setVoterList] = useState([]);

  const [excel, setExcel] = useState(null);

  useEffect(() => {
    async function fetchAllVoters() {
      const admin_json = getLocalStorage("ADMIN");
      const adminObj = JSON.parse(admin_json);

      const voters = await getAllVotersInOrganization(
        adminObj.token,
        adminObj.orgId
      );
      if (voters) setVoterList(voters);
    }

    fetchAllVoters();
  }, []);

  const registerVoter = async (body) => {
    const admin_json = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(admin_json);

    body = { ...body, organization_id: adminObj.orgId };

    const newVoter = await adminRegisterVoter(adminObj.token, body);
    if (newVoter) {
      setVoterList((prev) => [...prev, newVoter]);
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
      <CreateVoterModal
        isOpen={isOpen}
        onClose={onClose}
        registerVoterHandler={registerVoter}
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
          <Box display="flex" alignItems="center" gap={3}>
            <BsChevronLeft color="black" size="1.3em" />
            <Heading fontWeight="semibold" fontSize="3xl">
              Administrator
            </Heading>
          </Box>
          <Box display="flex" alignItems="center" gap={3}>
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
            <FormControl>
              <FormLabel
                htmlFor="bulk-reg"
                p={{ base: 4, md: 3 }}
                m={0}
                backgroundColor="DarkPurple"
                color="white"
                display="flex"
                flexDir="row"
                gap={2}
                borderRadius={5}
                align-items="center"
                w="fit-content"
              >
                <Center>
                  <BsFileSpreadsheetFill />
                </Center>
                <Text display={{ base: "none", md: "inline" }}>
                  BULK REGISTER
                </Text>
              </FormLabel>
              <Input
                type="file"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                id="bulk-reg"
                hidden
                onChange={(e) => {
                  console.log(e.target.files[0]);
                }}
              />
            </FormControl>
          </Box>
        </Box>
        <Heading fontWeight="500" fontSize="1.3em" my={7}>
          Voters
        </Heading>
        {voterList.length !== 0 && (
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
        )}
        <Box display="flex" flex={1} flexDir="column" gap={6}>
          <AdminVoterList listItem={voterList} />
        </Box>
      </Box>
    </Container>
  );
}

function AdminVoterList({ listItem }) {
  if (listItem.length === 0)
    return (
      <Center h="full">
        <Text>There is nothing to show</Text>
      </Center>
    );
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
