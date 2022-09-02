import { Box } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

export default function MobileHeader() {
  return (
    <Box w="full" display={{ base: "flex", md: "none" }} px={10} pt={4}>
      <MdMenu color="DarkPurple" size="1.5em" />
    </Box>
  );
}
