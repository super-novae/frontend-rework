import { Container, Box, Heading, Text } from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";

import { getLocalStorage } from "../util/local-storage.util";
import { useState, useLayoutEffect } from "react";

export default function VoterBufferScreen({ logout }) {
  const navigate = useNavigate();
  const [voterName, setVoterName] = useState("");

  useLayoutEffect(() => {
    const voter_json = getLocalStorage("VOTER");
    const voterObj = JSON.parse(voter_json);

    setVoterName(voterObj.name);
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
      <MobileHeader logout={logout} color="DarkPurple" />
      <Box display="flex" flex={1} flexDir="column" p={10}>
        <Box
          display="flex"
          borderBottomWidth={1}
          borderColor="ShadowBlue"
          justifyContent="space-between"
          pb={7}
        >
          <Box display="flex" gap={4} alignItems="center">
            <BsChevronLeft size="22" onClick={() => navigate(-1)} />
            <Heading
              fontWeight="semibold"
              fontSize="3xl"
              display={{ base: "none", md: "inline" }}
            >
              Voter
            </Heading>
          </Box>
          <Heading fontWeight="500" fontSize="2xl">
            Hello,{" "}
            <Text display="inline" fontWeight="600">
              {voterName}
            </Text>
          </Heading>
        </Box>
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
            onClick={() => navigate("vote")}
          >
            <Heading display="flex">
              Vote<Text color="transparent">rs</Text>
            </Heading>
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
            onClick={() => navigate("results")}
          >
            <Heading>Results</Heading>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
