import { Container, Text, Box, Heading, Button } from "@chakra-ui/react";
import { Sidebar, MobileHeader, VoterElectionNavButton } from "../components";
import { useNavigate } from "react-router-dom";

export default function VoterHome({ logout }) {
  const navigate = useNavigate();

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <Sidebar color="CelticBlue" logout={logout} />
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
            Voter
          </Heading>
          <Heading fontWeight="500" fontSize="2xl">
            Hello,{" "}
            <Text display="inline" fontWeight="600">
              Nobel Fiawornu
            </Text>
          </Heading>
        </Box>
        <Box display="flex" flex={1} flexDir="column" pt={7}>
          <Box display="flex" flex={1} flexDir="column">
            <Heading fontSize="1.2em" fontWeight="600" mb={5}>
              Outstanding Elections
            </Heading>
            <Box display="flex" flexDir="row" gap={4}>
              <VoterElectionNavButton
                title="SRC Elections"
                navigate={navigate}
              />
              <VoterElectionNavButton
                title="Unity Hall Elections"
                navigate={navigate}
              />
            </Box>
          </Box>
          <Box display="flex" flex={1} flexDir="column">
            <Heading fontSize="1.2em" fontWeight="600" mb={5}>
              Voted Elections
            </Heading>
            <Box display="flex" flexDir="row">
              <VoterElectionNavButton
                title="ACES Elections"
                navigate={navigate}
              />
            </Box>
          </Box>
          <Box>
            <Button
              bgColor="CelticBlue"
              color="white"
              minW="174px"
              fontWeight="500"
              px={2}
              size="lg"
            >
              View Results
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
