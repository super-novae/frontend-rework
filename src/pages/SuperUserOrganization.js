import {
  Container,
  Box,
  Heading,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Sidebar,
  MobileHeader,
  EditOrganizationModal,
  ListView,
} from "../components";
import { BsChevronLeft, BsPencil, BsThreeDotsVertical } from "react-icons/bs";

const ElectionList = [
  { id: "elec-he73901jsnv985lkmn216789fh4", name: "SRC Elections" },
  { id: "elec-he73901jsnv985lkmn216789fh4", name: "SRC Elections" },
  { id: "elec-he73901jsnv985lkmn216789fh4", name: "SRC Elections" },
];

export default function SuperUserOrganization() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Container
      maxW="100%"
      minH="100vh"
      p={0}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <EditOrganizationModal isOpen={isOpen} onClose={onClose} />
      <Sidebar />
      <MobileHeader />
      <Box display="flex" flex={1} flexDir="column" p={10}>
        <Box
          display="flex"
          borderBottomWidth={1}
          borderColor="ShadowBlue"
          justifyContent="space-between"
          pb={7}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <BsChevronLeft color="black" size="1.3em" />
            <Heading fontWeight="semibold" fontSize="3xl">
              SuperUser
            </Heading>
          </Box>
          <Button
            bgColor="DarkPurple"
            color="white"
            size="lg"
            fontWeight="normal"
            gap={{ base: 0, md: 3 }}
            onClick={onOpen}
          >
            <BsPencil />
            <Text display={{ base: "none", md: "inline" }}>EDIT ORG</Text>
          </Button>
        </Box>
        <Heading fontWeight="500" fontSize="1.3em" my={7}>
          Kwame Nkrumah University of Science and Technology
        </Heading>
        <Heading fontWeight="400" fontSize="1.3em" mb={7}>
          Administrator
        </Heading>
        <Box
          display="flex"
          borderWidth={1}
          borderColor="DarkPurple"
          borderRadius={{ base: 5, md: 3 }}
          p={4}
          alignItems="center"
        >
          <Box display="flex" flexDir={{ base: "column", md: "row" }} flex={1}>
            <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
              admin-f2uj68sh59jkl48anc4209klmc
            </Text>
            <Box
              display="flex"
              flex={2}
              flexDir={{ base: "column", md: "row" }}
            >
              <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
                Nobel Fiawornu
              </Text>
              <Text flex={2} fontSize={{ base: "md", md: "xl" }}>
                nobelfiawornu@gmail.com
              </Text>
            </Box>
          </Box>
          <BsThreeDotsVertical />
        </Box>
        <Heading fontWeight="400" fontSize="1.3em" my={7}>
          Elections
        </Heading>
        <Box display="flex" flex={1} flexDir="column" gap={4}>
          <ListView listItem={ElectionList} />
        </Box>
      </Box>
    </Container>
  );
}
