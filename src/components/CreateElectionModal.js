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

const programmes = [
  "BSc Agriculture",
  "BSc Natural Resources Management",
  "BSc Post Harvest Technology",
  "BSc Dairy and Meat Science and Technology",
  "BSc Landscape Design and Management",
  "BSc Agricultural Biotechnology",
  "BSc Agribusiness Management",
  "BSc Forest Resources Technology",
  "BSc Aquaculture & Water Resources Management",
  "BSc Architecture",
  "BSc Construction Technology & Management",
  "BSc Quantity Surveying & Construction Economics",
  "BSc Development Planning",
  "BSc Human Settlement Planning",
  "BSc Land Economy",
  "BSc Real Estate",
  "BFA Painting and Sculpture",
  "BA Communication Design",
  "BA Industrial ArtBA Integrated Rural Art and Industry",
  "BA Publishing Studies",
  "BA Integrated Rural Art and Industry",
  "BA Economics",
  "BA Geography and Rural Development",
  "BA Sociology",
  "BA Social Work",
  "BA Religious Studies",
  "BA History",
  "BA Political Studies",
  "BA French",
  "BA Akan",
  "BA Culture and Tourism",
  "BA English",
  "BSc. Business Administration",
  "LLB",
  "BSc Agricultural Engineering",
  "BSc Chemical Engineering",
  "BSc Civil Engineering",
  "BSc Geomatic Engineering (Geodetic Engineering)",
  "BSc Materials Engineering",
  "BSc Mechanical Engineering",
  "BSc Electrical & Electronic Engineering",
  "BSc Computer Engineering",
  "BSc Aerospace Engineering",
  "BSc Petroleum Engineering",
  "BSc Telecommunication Engineering",
  "BSc Geological Engineering",
  "BSc Biomedical Engineering",
  "BSc Petrochemical Engineering",
  "BSc Metallurgical Engineering",
  "Pharm D (Doctor of Pharmacy)",
  "BSc Herbal Medicine",
  "BSc Human Biology (Medicine)",
  "BSc Medical Laboratory Technology",
  "BSc Sports and Exercise Science",
  "BSc Nursing",
  "BSc Midwifery",
  "BSc Emergency Nursing",
  "BSc BDS Dental Surgery",
  "DVM (Doctor of Veterinary Medicine)",
  "BSc Sonography",
  "BSc Disability & Rehabilitation Studies",
  "BSc Biochemistry",
  "BSc Food Science and Technology",
  "BSc Biological Sciences",
  "BSc Environmental Science",
  "BSc Chemistry",
  "BSc Computer Science",
  "BSc Mathematics",
  "BSc Statistics",
  "BSc Physics",
  "BSc Actuarial Science",
  "Doctor of Optometry (OD)",
  "BSc Meteorology and Climate Science",
];

const colleges = [
  "College of Agriculture and Natural Resources",
  "College of Art and Built Environment",
  "College of Humanities and Social Sciences",
  "College of Engineering",
  "College of Health Sciences",
  "College of Science",
];

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
