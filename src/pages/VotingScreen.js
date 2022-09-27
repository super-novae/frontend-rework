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
  Center,
  CircularProgress,
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
  const { electionId } = useParams();

  const [candidates, setCandidates] = useState([]);
  const [offices, setOffices] = useState([]);

  const [screenLoading, setScreenLoading] = useState([]);

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
        getOffices(candidates.candidates);
      }
    }

    function getOffices(candidateList) {
      const officeList = [];
      candidateList.map((candidate) => {
        if (officeList.includes(candidate.office_name)) {
        } else {
          officeList.push(candidate.office_name);
        }
      });

      console.log("OfficeList: ", officeList);
      setOffices(officeList);
      setScreenLoading(false);
    }

    fetchCandidates();
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
            {screenLoading ? (
              <Center h="full">
                <CircularProgress
                  color="DarkPurple"
                  size="10"
                  isIndeterminate
                />
              </Center>
            ) : (
              <Box w="full">
                {offices.map((office) => (
                  <ElectionOffice office={office} candidates={candidates} />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function ElectionOffice({ office, candidates }) {
  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "candidates",
    defaultValue: 1,
    onChange: (value) => console.log(value),
  });

  const group = getRootProps();

  return (
    <Box key={office}>
      <Text>{office}</Text>
      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-evenly"
        w="full"
        {...group}
      >
        {candidates.map((candidate) => {
          const radio = getRadioProps({ value: candidate.name });
          if (candidate.office_name === office)
            return (
              <ElectionCandidateCard
                candidateName={candidate.name}
                candidateProgramme={candidate.programme}
                key={candidate.id}
                {...radio}
              />
            );
        })}
      </Box>
    </Box>
  );
}

function ElectionCandidateCard({
  candidateName,
  candidateProgramme,
  ...props
}) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box display="flex" flexDir="column" as="label">
      <input {...input} hidden />
      <Box
        {...checkbox}
        borderRadius={3}
        bgColor="white"
        p={2}
        _checked={{
          bgColor: "teal",
          color: "white",
          textColor: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        display="flex"
        flexDir="column"
      >
        <Box
          display="flex"
          borderWidth={1}
          w="200px"
          h="220px"
          borderRadius={5}
          mb={3}
        ></Box>
        <Box w="200px">
          <Heading fontSize="md">{candidateName}</Heading>
          <Text fontSize="sm" noOfLines={1}>
            {candidateProgramme}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
