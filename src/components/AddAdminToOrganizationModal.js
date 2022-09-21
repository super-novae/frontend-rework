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
  FormErrorMessage,
  Input,
  FormLabel,
  Box,
  Button,
} from "@chakra-ui/react";

import { administratorSignUp } from "../api/auth/admin";
import { addAdminToOrganization } from "../api/organization/organization-api";

export default function AddAdminToOrganizationModal({
  isOpen,
  onClose,
  setAdmin,
  orgId,
}) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const validateInput = () => {
    if (username === "") {
      setUsernameError(true);
      return false;
    }
    if (email === "") {
      setEmailError(true);
      return false;
    }
    if (name === "") {
      setNameError(true);
      return false;
    }
    return true;
  };

  const handleAdminSignup = async () => {
    const shouldSignUp = validateInput();
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );

    if (super_user_token && shouldSignUp) {
      const newAdmin = await administratorSignUp(super_user_token, {
        username,
        name,
        email,
      });
      if (newAdmin) {
        setAdmin(newAdmin);
        addNewAdminToOrgHandler(newAdmin.id);
      }
    }
    onClose();
  };

  const addNewAdminToOrgHandler = async (adminId) => {
    const super_user_token = localStorage.getItem(
      process.env.REACT_APP_SUPER_USER_LS_KEY.toString()
    );

    await addAdminToOrganization(super_user_token, orgId, adminId);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "3xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <Box display="flex" flex={1} flexDir="column">
          <ModalHeader>Administrator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <FormErrorMessage>Email is required</FormErrorMessage>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isInvalid={nameError}>
              <FormLabel>Name</FormLabel>
              <FormErrorMessage>Name is required</FormErrorMessage>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isInvalid={usernameError}>
              <FormLabel>Username</FormLabel>
              <FormErrorMessage>Username is required</FormErrorMessage>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
          </ModalBody>
        </Box>
        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={handleAdminSignup}
            color="white"
            fontWeight="500"
          >
            CREATE ADMIN
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
