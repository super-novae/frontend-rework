import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { createOrganization } from "../api/organization/organization-api";

//TODO: Fix the create organization api call

export default function CreateOrganizationModal({ isOpen, onClose }) {
  const super_user_token = localStorage.getItem(
    process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
  );

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const validateInput = () => {
    setNameError(false);
    if (name === "") {
      setNameError(true);
      return false;
    }
    return true;
  };

  const handleCreateOrganization = () => {
    const shouldCreateOrganization = validateInput();

    if (shouldCreateOrganization) {
      createOrganization(super_user_token, name);
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Organization</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={nameError}>
            <FormLabel>Name</FormLabel>
            <FormErrorMessage>Organization Name is required</FormErrorMessage>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={handleCreateOrganization}
            color="white"
            fontWeight="500"
          >
            CREATE ORGANIZATION
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
