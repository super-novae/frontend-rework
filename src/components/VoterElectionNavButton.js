import { Button, Text } from "@chakra-ui/react";
import { BsChevronRight } from "react-icons/bs";

export default function VoterElectionNavButton({
  title,
  navigate,
  electionId,
}) {
  return (
    <Button
      onClick={() => navigate(`/voter/elections/${electionId}`)}
      display="flex"
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      bgColor="CelticBlue"
      color="white"
      minW="174px"
      fontWeight="500"
      px={2}
      size="lg"
    >
      <Text fontSize="1em">{title}</Text>
      <BsChevronRight />
    </Button>
  );
}
