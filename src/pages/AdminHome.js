import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";
import { useNavigate } from "react-router-dom";

import { getLocalStorage, setLocalStorage } from "../util/local-storage.util";
import { getAdminOrganization } from "../api/admin/admin-api";

export default function SuperUserHome({ logout }) {
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    async function fetchAdminOrg() {
      const json_admin = getLocalStorage("ADMIN");
      const adminObj = JSON.parse(json_admin);
      const org = await getAdminOrganization(adminObj.token, adminObj.adminId);
      if (org) {
        setOrg(org);
        const newAdminObj = { ...adminObj, orgId: org.id };
        setLocalStorage("ADMIN", JSON.stringify(newAdminObj));
      }
    }

    fetchAdminOrg();
  }, []);

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
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
        </Box>
        {org ? (
          <Box
            display="flex"
            flex={1}
            flexDir={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            gap={10}
          >
            <Box
              borderWidth={1}
              borderRadius={5}
              p="20"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              _hover={{
                cursor: "pointer",
                bgColor: "DarkPurple",
                color: "Cerise",
              }}
              onClick={() => navigate("elections")}
            >
              <Heading>Election</Heading>
            </Box>
            <Box
              borderWidth={1}
              borderRadius={5}
              py="80px"
              px="89px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              _hover={{
                cursor: "pointer",
                bgColor: "DarkPurple",
                color: "Cerise",
              }}
              onClick={() => navigate("voters")}
            >
              <Heading>Voters</Heading>
            </Box>
          </Box>
        ) : (
          <Center h="full">
            <CircularProgress color="#160F29" isIndeterminate />
          </Center>
        )}
      </Box>
    </Container>
  );
}
