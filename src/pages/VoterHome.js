import { useEffect, useState, useLayoutEffect } from "react";
import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, VoterElectionNavButton } from "../components";
import { useNavigate } from "react-router-dom";

import { getVoterElections } from "../api/voter/voter-api";
import { getLocalStorage } from "../util/local-storage.util";

export default function VoterHome({ logout }) {
  const navigate = useNavigate();

  const [elections, setElections] = useState([]);

  const [voterName, setVoterName] = useState("");

  const [screenLoading, setScreenLoading] = useState(true);

  useLayoutEffect(() => {
    const voter_json = getLocalStorage("VOTER");
    const voterObj = JSON.parse(voter_json);

    setVoterName(voterObj.name);
  }, []);

  useEffect(() => {
    async function fetchElections() {
      const voter_json = getLocalStorage("VOTER");
      const voterObj = JSON.parse(voter_json);

      const elections = await getVoterElections(
        voterObj.token,
        voterObj.voterId,
        voterObj.organizationId
      );
      if (elections) {
        setElections([
          ...elections.college_elections,
          ...elections.department_elections,
          ...elections.src_elections,
        ]);
        setScreenLoading(false);
      }
    }

    fetchElections();
  }, []);

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <Sidebar color="CelticBlue" logout={logout} />
      <MobileHeader logout={logout} color="CelticBlue" />
      <Box display="flex" flex={1} flexDir="column" p={10}>
        <Box
          display="flex"
          borderBottomWidth={1}
          borderColor="ShadowBlue"
          justifyContent="space-between"
          pb={7}
        >
          <Heading
            fontWeight="semibold"
            fontSize="3xl"
            display={{ base: "none", md: "inline" }}
          >
            Voter
          </Heading>
          <Heading fontWeight="500" fontSize="2xl">
            Hello,{" "}
            <Text display="inline" fontWeight="600">
              {voterName}
            </Text>
          </Heading>
        </Box>
        {screenLoading ? (
          <Center h="full">
            <CircularProgress isIndeterminate color="CelticBlue" size="10" />
          </Center>
        ) : (
          <Box display="flex" flex={1} flexDir="column" pt={7}>
            {elections.length === 0 ? (
              <Center>
                <Text>No New Elections</Text>
              </Center>
            ) : (
              <Box display="flex" flex={1} flexDir="column">
                <Box display="flex" flexDir="row" gap={4}>
                  {elections.map((election) => (
                    <VoterElectionNavButton
                      title={election.name}
                      navigate={navigate}
                      key={election.id}
                      electionId={election.id}
                    />
                  ))}
                </Box>
              </Box>
            )}
            {/* <Box display="flex" flex={1} flexDir="column">
            <Heading fontSize="1.2em" fontWeight="600" mb={5}>
              Voted Elections
            </Heading>
            <Box display="flex" flexDir="row">
              <VoterElectionNavButton
                title="ACES Elections"
                navigate={navigate}
              />
            </Box>
          </Box> */}
            <Box>
              <Button
                bgColor="CelticBlue"
                color="white"
                minW="174px"
                fontWeight="500"
                px={2}
                size="lg"
                onClick={() => {}}
              >
                View Results
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
