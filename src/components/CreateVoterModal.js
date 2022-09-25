import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormLabel,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import { BsCaretDown } from "react-icons/bs";

import { programmes, colleges, years } from "../assets/form-enums";

export default function CreateVoterModal({
  isOpen,
  onClose,
  registerVoterHandler,
}) {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [studentId, setStudentId] = useState("");
  const [year, setYear] = useState("");
  const [email, setEmail] = useState("");
  const [programme, setProgramme] = useState("");
  const [telephone, setTelephone] = useState("");

  const registerVoter = async () => {
    const body = {
      name,
      college,
      year,
      email,
      programme,
      telephone_number: telephone,
      student_id: studentId,
    };
    registerVoterHandler(body);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "5xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <Box display="flex" flexDir={{ base: "column", md: "row" }}>
          <Box flex={1}>
            <ModalHeader>Create Voter</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>College</FormLabel>
                <Select
                  placeholder="Select option"
                  icon={<BsCaretDown />}
                  onChange={(e) => setCollege(e.target.value)}
                >
                  {colleges.map((college) => (
                    <option value={college} key={college}>
                      {college}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Student ID</FormLabel>
                <Input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Select
                  placeholder="Select option"
                  icon={<BsCaretDown />}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>
          </Box>
          <Box flex={1}>
            <ModalHeader color="white" display={{ base: "none", md: "block" }}>
              Text
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Programme</FormLabel>
                <Select
                  placeholder="Select option"
                  icon={<BsCaretDown />}
                  onChange={(e) => setProgramme(e.target.value)}
                >
                  {programmes.map((programme) => (
                    <option value={programme} key={programme}>
                      {programme}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Telephone</FormLabel>
                <Input
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </FormControl>
            </ModalBody>
          </Box>
        </Box>
        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={registerVoter}
            color="white"
            fontWeight="500"
          >
            CREATE
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
