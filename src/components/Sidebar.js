import { Box } from "@chakra-ui/react";
import { BsBoxArrowLeft } from "react-icons/bs";

export default function Sidebar() {
  return (
    <Box
      display={{ base: "none", md: "flex" }}
      flexDir="column"
      bgColor="DarkPurple"
      minW={20}
      py={5}
    >
      <Box display="flex" flex={1}></Box>
      <Box display="flex" alignSelf="center">
        <BsBoxArrowLeft color="white" size="3em" />
      </Box>
    </Box>
  );
}
