import { Box } from "@chakra-ui/react";
import { BsBoxArrowLeft } from "react-icons/bs";

export default function Sidebar({ color, logout }) {
  return (
    <Box
      display={{ base: "none", md: "flex" }}
      flexDir="column"
      bgColor={color}
      minW={20}
      py={5}
    >
      <Box display="flex" flex={1}></Box>
      <Box _hover={{cursor: "pointer"}} display="flex" alignSelf="center" onClick={() => logout()}>
        <BsBoxArrowLeft color="white" size="3em" />
      </Box>
    </Box>
  );
}
