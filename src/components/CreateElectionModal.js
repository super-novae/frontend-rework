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
  Button,
  Select,
} from "@chakra-ui/react";
import { BsCaretDown } from "react-icons/bs";

export default function CreateElectionModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "2xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Election</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select placeholder="Select option" icon={<BsCaretDown />}>
              <option value="SRC">SRC</option>
              <option value="College">College</option>
              <option value="Department">Department</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Programme</FormLabel>
            <Select placeholder="Select option" icon={<BsCaretDown />}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Route Name</FormLabel>
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
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={onClose}
            color="white"
            fontWeight="500"
          >
            SAVE CHANGES
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
