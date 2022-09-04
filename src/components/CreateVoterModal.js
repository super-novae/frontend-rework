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
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Student ID</FormLabel>
                <Input />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input />
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
