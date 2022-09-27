import { useEffect, useState, useLayoutEffect } from "react";
import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  useRadioGroup,
  useRadio,
  Image,
  Center,
  CircularProgress,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader } from "../components";
import { BsChevronLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import {
  getElectionCandidatesByElectionId,
  voterCastVotes,
} from "../api/voter/voter-api";
import { getLocalStorage } from "../util/local-storage.util";

export default function VotingScreen({ logout }) {
  const { electionId } = useParams();

  const [candidates, setCandidates] = useState([]);
  const [offices, setOffices] = useState([]);
  const [voterId, setVoterId] = useState();
  const [voterName, setVoterName] = useState("");

  const [screenLoading, setScreenLoading] = useState([]);
  const [voting, setVoting] = useState(false);

  const [results, setResults] = useState([]);

  const [voteResults, setVoteResults] = useState([]);

  const navigate = useNavigate();

  function updateResults(newVal) {
    setResults((prev) => [...prev, newVal]);
  }

  function submitVotes() {
    setVoting(true);
    results.map((result) => {
      const selection = candidates.filter(
        (candidate) => candidate.name === result
      );
      // console.log("Selection: ", selection);
      const selected = selection.pop();

      const body = {
        candidate_id: selected.id,
        election_id: selected.election_id,
        office_id: selected.office_id,
        voter_id: voterId,
      };
      setVoteResults((prev) => [...prev, body]);
    });
    castVotes();
  }

  function castVotes() {
    const voter_json = getLocalStorage("VOTER");
    const voterObj = JSON.parse(voter_json);

    voteResults.map(async (vR) => {
      const response = await voterCastVotes(
        voterObj.token,
        voterObj.voterId,
        vR
      );
      console.log(response);
    });
    setVoting(false);
    // navigate(-1);
  }

  useLayoutEffect(() => {
    const voter_json = getLocalStorage("VOTER");
    const voterObj = JSON.parse(voter_json);

    setVoterName(voterObj.name);
  }, []);

  useEffect(() => {
    async function fetchCandidates() {
      const voter_json = getLocalStorage("VOTER");
      const voterObj = JSON.parse(voter_json);

      setVoterName(voterObj.name);

      const candidates = await getElectionCandidatesByElectionId(
        voterObj.token,
        electionId
      );
      setVoterId(voterObj.voterId);
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
      <MobileHeader logout={logout} color="CelticBlue" />
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
              <>
                <Box w="full">
                  {offices.map((office) => (
                    <ElectionOffice
                      office={office}
                      candidates={candidates}
                      updateResults={updateResults}
                    />
                  ))}
                </Box>
                <Box>
                  <Button
                    bgColor="CelticBlue"
                    onClick={submitVotes}
                    textColor="white"
                    gap={5}
                  >
                    {voting && (
                      <CircularProgress
                        isIndeterminate
                        color="black"
                        size="8"
                      />
                    )}
                    SUBMIT VOTE
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function ElectionOffice({ office, candidates, updateResults }) {
  const { getRootProps, getRadioProps, value } = useRadioGroup({
    name: "candidates",
    defaultValue: 1,
    onChange: (value) => {
      console.log(value);
      updateResults(value);
    },
  });

  const group = getRootProps();

  return (
    <Box key={office}>
      <Text textAlign="center" fontWeight="600" fontSize="xl" my={2}>
        {office}
      </Text>
      <Box
        display="flex"
        flexDir="row"
        flexWrap={{ base: "wrap", md: "nowrap" }}
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
                candidateImage={candidate.profile_image_url}
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
  candidateImage,
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
        >
          {candidateImage && (
            <Image src={candidateImage} boxSize="200px" objectFit="contain" />
          )}
        </Box>
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
