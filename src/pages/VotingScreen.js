import { Container, Text, Box, Heading, Button } from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";
import { BsChevronLeft } from "react-icons/bs";

export default function VotingScreen() {
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <Sidebar color="CelticBlue" />
      <MobileHeader />
      <Box display="flex" flex={1} flexDir="column" p={10}>
        <Box
          display="flex"
          borderBottomWidth={1}
          borderColor="ShadowBlue"
          justifyContent="space-between"
          pb={7}
        >
          <Box display="flex" gap={4} alignItems="center">
            <BsChevronLeft size="22" />
            <Heading fontWeight="semibold" fontSize="3xl">
              Voter
            </Heading>
          </Box>
          <Heading fontWeight="500" fontSize="2xl">
            Hello,{" "}
            <Text display="inline" fontWeight="600">
              Nobel Fiawornu
            </Text>
          </Heading>
        </Box>
        <Box display="flex" flex={1} flexDir="column" pt={7}>
          <Heading fontWeight="semibold" fontSize="2xl" mb={5}>
            SRC ELECTIONS
          </Heading>
          <Box
            display="flex"
            flex={1}
            flexDir="column"
            gap={10}
            alignItems="center"
          >
            <Box>
              <Heading fontWeight="normal" fontSize="2xl">
                President
              </Heading>
              <Box display="flex" flexDir="row" gap={10} pt={3} flexWrap="wrap">
                <ElectionCandidateCard />
                <ElectionCandidateCard />
                <ElectionCandidateCard />
                <ElectionCandidateCard />
              </Box>
            </Box>
            <Box>
              <Heading fontWeight="normal" fontSize="2xl">
                Vice President
              </Heading>
              <Box display="flex" flexDir="row" gap={10} pt={3} flexWrap="wrap">
                <ElectionCandidateCard />
                <ElectionCandidateCard />
                <ElectionCandidateCard />
                <ElectionCandidateCard />
              </Box>
            </Box>
            <Box>
              <Heading fontWeight="normal" fontSize="2xl">
                Financial Secretary
              </Heading>
              <Box display="flex" flexDir="row" gap={10} pt={3} flexWrap="wrap">
                <ElectionCandidateCard />
                <ElectionCandidateCard />
                <ElectionCandidateCard />
                <ElectionCandidateCard />
              </Box>
            </Box>
            <Button
              color="white"
              bgColor="CelticBlue"
              alignSelf="center"
              size="lg"
              px={10}
              fontWeight="normal"
              mt={10}
            >
              SUBMIT VOTE
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function ElectionCandidateCard() {
  return (
    <Box display="flex" flexDir="column">
      <Box
        display="flex"
        borderWidth={1}
        w="200px"
        h="220px"
        borderRadius={5}
        mb={3}
      ></Box>
      <Box w="200px">
        <Heading fontSize="md">Augustine Agbeko</Heading>
        <Text fontSize="sm" noOfLines={1} color="ShadowBlue">
          BSc. Computer Engineering
        </Text>
      </Box>
    </Box>
  );
}
