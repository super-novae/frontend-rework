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

export default function CreateVoterModal({ isOpen, onClose }) {
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
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>College</FormLabel>
                <Select placeholder="Select option" icon={<BsCaretDown />}>
                  <option value="option1">
                    College of Agriculture and Natural Resources
                  </option>
                  <option value="option2">
                    College of Art and Built Environment
                  </option>
                  <option value="option3">
                    College of Humanities and Social Sciences
                  </option>
                  <option value="option4">College of Engineering</option>
                  <option value="option5">College of Health Sciences</option>
                  <option value="option6">College of Science</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Student ID</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Select placeholder="Select option" icon={<BsCaretDown />}>
                  <option value="option1">Year One</option>
                  <option value="option2">Year Two</option>
                  <option value="option3">Year Three</option>
                  <option value="option3">Year Four</option>
                  <option value="option3">Year Five</option>
                  <option value="option3">Year Six</option>
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
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Programme</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Telephone</FormLabel>
                <Input />
              </FormControl>
            </ModalBody>
          </Box>
        </Box>
        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={onClose}
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
