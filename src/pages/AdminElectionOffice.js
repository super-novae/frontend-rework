import { useState, useEffect } from "react";
import {
  Container,
  Text,
  Box,
  Heading,
  Button,
  HStack,
  useDisclosure,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Select,
  Center,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import { Sidebar, MobileHeader, ListView } from "../components";
import {
  BsPlus,
  BsChevronLeft,
  BsPersonCircle,
  BsCaretDown,
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCandidatesByOffice,
  createElectionCandidate,
  deleteElectionCandidate,
} from "../api/election/election-api";
import { getLocalStorage } from "../util/local-storage.util";
import { programmes } from "../assets/form-enums";

import { s3, bucketName, region } from "../config/aws-s3.config";

export default function AdminElectionOffice({ logout }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { electionId, officeId, officeName } = useParams();

  const [candidateList, setCandidateList] = useState([]);

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      const json_admin = getLocalStorage("ADMIN");
      const adminObj = JSON.parse(json_admin);

      const candidates = await getCandidatesByOffice(
        adminObj.token,
        electionId,
        officeId
      );
      if (candidates) {
        setCandidateList(candidates);
        setScreenLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  const createCandidateHandler = async (body) => {
    const json_admin = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(json_admin);

    body = {
      ...body,
      election_id: electionId,
      office_id: officeId,
      organization_id: adminObj.orgId,
    };

    const newCandidate = await createElectionCandidate(
      adminObj.token,
      electionId,
      body
    );
    if (newCandidate) {
      setCandidateList((prev) => [...prev, newCandidate]);
    }
  };

  const deleteElectionHandler = async (candidateId) => {
    const json_admin = getLocalStorage("ADMIN");
    const adminObj = JSON.parse(json_admin);

    const response = await deleteElectionCandidate(
      adminObj.token,
      electionId,
      candidateId
    );
    if (response) {
      setCandidateList((prev) =>
        prev.filter((candidate) => candidate.id !== candidateId)
      );
    }
  };

  const navigate = useNavigate();

  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <CreateCandidateModal
        isOpen={isOpen}
        onClose={onClose}
        createCandidateHandler={createCandidateHandler}
      />
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
          <Box display="flex" flexDir="row" gap={3} alignItems="center">
            <BsChevronLeft
              color="black"
              size="1.3em"
              onClick={() => navigate(-1)}
            />
            <Heading
              fontWeight="semibold"
              fontSize="3xl"
              display={{ base: "none", md: "inline" }}
            >
              Administrator
            </Heading>
          </Box>
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 1 }}
            onClick={onOpen}
          >
            <BsPlus color="white" size="1.2em" />
            <Text display={{ base: "none", md: "inline" }}>
              CREATE CANDIDATE
            </Text>
          </Button>
        </Box>
        <Box display="flex" flex={1} flexDir="column">
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            alignItems="center"
            mt={10}
            mb={2}
          >
            <Box display="flex" flexDir="row" alignItems="center" gap={2}>
              {/* <Box
                display={{ base: "none", md: "flex" }}
                flexDir="row"
                alignItems="center"
                gap={2}
              >
                <Heading fontWeight="500" fontSize="3xl">
                  ACES Elections
                </Heading>
                <BsChevronRight size="1.2em" />
              </Box> */}
              <Heading
                fontWeight="500"
                fontSize={{ base: "2xl", md: "3xl" }}
                display={{ base: "none", md: "inline" }}
              >
                Office({`${officeName}`})
              </Heading>
              <Heading
                fontWeight="500"
                fontSize={{ base: "2xl", md: "3xl" }}
                display={{ base: "inline", md: "none" }}
              >
                {`${officeName}`}
              </Heading>
            </Box>
          </Box>
          <Heading fontWeight="400" fontSize="2xl" my={5}>
            Candidates
          </Heading>
          {candidateList.length !== 0 && (
            <HStack px={4} mb={5} display={{ base: "none", md: "flex" }}>
              <Text flex={1} fontSize="xl">
                ID
              </Text>
              <Text flex={2} fontSize="xl">
                Name
              </Text>
            </HStack>
          )}
          <Box display="flex" flexDir="column" flex={1} gap={6}>
            {screenLoading ? (
              <Center h="full">
                <CircularProgress
                  isIndeterminate
                  color="DarkPurple"
                  size="10"
                />
              </Center>
            ) : (
              <ListView
                listItem={candidateList}
                deleteFunc={deleteElectionHandler}
                dont_go={true}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

function CreateCandidateModal({ isOpen, onClose, createCandidateHandler }) {
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [programme, setProgramme] = useState("");

  const createCandidate = () => {
    const data = { name, programme };
    createCandidateHandler(data);
    onClose();
  };

  const uploadS3 = async (e) => {
    const imageName = e.target.files[0].name;
    await s3
      .putObject({
        Key: imageName,
        Bucket: bucketName,
        Body: e.target.files[0],
      })
      .promise()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const onChangeInputField = async (e) => {
    const imageName = e.target.files[0].name;
    uploadS3(e);
    const url = `https://${bucketName}.s3-${region}.amazonaws.com/${imageName}`;
    setImageUrl(url);
    console.log(url);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Candidate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            display="flex"
            flexDir={{ base: "column", md: "row" }}
            h="xs"
            gap={2}
          >
            <Center display="flex" flex={1}>
              {image === null ? (
                <BsPersonCircle color="#c4c4c4" size="200" />
              ) : (
                <Image
                  src={image}
                  boxSize="200px"
                  objectFit="contain"
                  alt={name}
                />
              )}
            </Center>
            <Center display="flex" flex={1} flexDir="column" gap={3}>
              <FormControl>
                <FormLabel
                  htmlFor="file-input"
                  bgColor="DarkPurple"
                  color="white"
                  fontWeight="500"
                  p={4}
                  fontSize="lg"
                  textAlign="center"
                  borderRadius={5}
                >
                  UPLOAD PHOTO
                </FormLabel>
                <Input
                  id="file-input"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  hidden
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    console.log("Image: ", e.target.files[0]);
                    onChangeInputField(e);
                  }}
                />
              </FormControl>
              {/* <Text fontWeight="600" as="button" onClick={() => setImage(null)}>
                REMOVE PHOTO
              </Text> */}
            </Center>
          </Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Programme</FormLabel>
            <Select
              placeholder="Select option"
              icon={<BsCaretDown />}
              onChange={(e) => setProgramme(e.target.value)}
            >
              {programmes.map((prog) => (
                <option value={prog} key={prog}>
                  {prog}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={createCandidate}
            color="white"
            fontWeight="500"
          >
            SAVE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
