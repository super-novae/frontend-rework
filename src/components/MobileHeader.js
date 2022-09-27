import {
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { BsBoxArrowLeft, BsXSquareFill } from "react-icons/bs";

export default function MobileHeader({ logout, color }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [showDrawer, setShowDrawer] = useState(false);

  // const toggleDrawer = () => {
  //   setShowDrawer(!showDrawer);
  // };

  return (
    <Box w="full" display={{ base: "flex", md: "none" }} px={10} pt={4}>
      <MdMenu color="DarkPurple" size="1.5em" onClick={() => onOpen()} />
      <MobileDrawer
        onClose={onClose}
        isOpen={isOpen}
        logout={logout}
        color={color}
      />
    </Box>
  );
}

export function MobileDrawer({ onClose, isOpen, logout, color }) {
  // console.log("Mobile Drawer");
  return (
    <Modal isOpen={isOpen} onClose={onClose} m={0}>
      <ModalOverlay />
      <ModalContent w="20%" m={0} position="absolute" left={0}>
        <Box
          bgColor={color}
          py={5}
          h="100vh"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" flex={1}>
            <Box mx="auto" onClick={() => onClose()}>
              <BsXSquareFill color="white" size="2em" />
            </Box>
          </Box>
          <Box
            _hover={{ cursor: "pointer" }}
            display="flex"
            alignSelf="center"
            // onClick={() => logout()}
          >
            <BsBoxArrowLeft color="white" size="2em" onClick={() => logout()} />
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}
