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
  Button,
} from "@chakra-ui/react";

export default function CreateOrganizationModal({ isOpen, onClose }) {
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
            <ModalHeader>Administrator</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input />
              </FormControl>
            </ModalBody>
          </Box>
          <Box flex={1}>
            <ModalHeader>Organization</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Organization Name</FormLabel>
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
            SAVE CHANGES
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}