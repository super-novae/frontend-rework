import {
  FormControl,
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

export default function EditOrganizationModal({ isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size={{ base: "md", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Organization</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input defaultValue="Kwame Nkrumah University of Science and Technology" />
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
