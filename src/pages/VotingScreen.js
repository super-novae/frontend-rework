import { useEffect, useState } from "react";
import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  useRadioGroup,
  useRadio,
  HStack,
  chakra,
  Stack,
  useToast,
  Image,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import { getElectionCandidatesByElectionId } from "../api/voter/voter-api";
import { getLocalStorage } from "../util/local-storage.util";

const Candidates = [
  { name: "Candidate Name", programme: "Candidate Programme", id: 1 },
  { name: "Candidate Name", programme: "Candidate Programme", id: 2 },
  { name: "Candidate Name", programme: "Candidate Programme", id: 3 },
  { name: "Candidate Name", programme: "Candidate Programme", id: 4 },
];

export default function VotingScreen({ logout }) {
  const { electionId } = useParams;

  const [candidates, setCandidates] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCandidates() {
      const voter_json = getLocalStorage("VOTER");
      const voterObj = JSON.parse(voter_json);

      const candidates = await getElectionCandidatesByElectionId(
        voterObj.token,
        electionId
      );
      if (candidates) {
        setCandidates(candidates.candidates);
      }
    }

    // fetchCandidates();
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
            <BsChevronLeft size="22" onClick={() => navigate(-1)} />
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
                <Example />
              </Box>
            </Box>
            {/* <Box>
              <Heading fontWeight="normal" fontSize="2xl">
                Financial Secretary
              </Heading>
              <Box display="flex" flexDir="row" gap={10} pt={3} flexWrap="wrap">
                <CustomExample />
              </Box>
            </Box> */}
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

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps, state } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        p={1}
      >
        <Box
          w="200px"
          h="220px"
          borderWidth={1}
          borderColor={state.isChecked ? "white" : "black"}
        ></Box>
        {props.children}
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function Example() {
  const options = [
    { candidate: "Candidate 1", item: "Mango" },
    { candidate: "Candidate 2", item: "Apple" },
    { candidate: "Candidate 3", item: "Banana" },
  ];

  const [choice, setChoice] = useState({});

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "Office",
    value: { choice },
    onChange: setChoice,
  });

  const group = getRootProps();

  return (
    <Box>
      <Text>Choice: {choice.candidate}</Text>
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={value} {...radio}>
              <Text>{value.candidate}</Text>
              <Text>{value.item}</Text>
            </RadioCard>
          );
        })}
      </HStack>
    </Box>
  );
}
