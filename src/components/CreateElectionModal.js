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
  Button,
  Select,
} from "@chakra-ui/react";
import { BsCaretDown } from "react-icons/bs";

import { programmes, colleges } from "../assets/form-enums";

export default function CreateElectionModal({
  isOpen,
  onClose,
  createElectionHandler,
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [prog, setProg] = useState("");
  const [routeName, setRouteName] = useState("");
  const [college, setCollege] = useState("");

  const createElection = () => {
    const data = {
      name,
      type,
      college,
      route_name: routeName,
      programme: prog,
    };
    createElectionHandler(data);
    onClose();
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
        <ModalHeader>Election</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              placeholder="Select option"
              icon={<BsCaretDown />}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="SRC">SRC</option>
              <option value="College">College</option>
              <option value="Department">Department</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Programme</FormLabel>
            <Select
              placeholder="Select option"
              icon={<BsCaretDown />}
              onChange={(e) => setProg(e.target.value)}
            >
              {programmes.map((prog) => (
                <option value={prog} key={prog}>
                  {prog}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Route Name</FormLabel>
            <Input
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
            />
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
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor="DarkPurple"
            onClick={createElection}
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
