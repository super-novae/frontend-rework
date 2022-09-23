import { Box, Center, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";

export default function ListView({ listItem, navigateTo, deleteFunc }) {
  const navigate = useNavigate();

  if (listItem === null || listItem.length === 0) {
    return (
      <Center h="full">
        <Text>There is nothing to show</Text>
      </Center>
    );
  }

  return listItem.map((item) => (
    <Box
      key={item.id}
      display="flex"
      flexDir={{ base: "column", md: "row" }}
      borderWidth={1}
      borderColor="DarkPurple"
      borderRadius={{ base: 5, md: 3 }}
      p={4}
      _hover={{
        cursor: "pointer",
        borderWidth: 2,
      }}
    >
      <Box
        display="flex"
        flex={1}
        flexDir={{ base: "column", md: "row" }}
        onClick={() =>
          navigate(navigateTo ? `${navigateTo}/${item.id}` : `${item.id}`)
        }
      >
        <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
          {item.id}
        </Text>
        <Text flex={2} fontSize={{ base: "md", md: "xl" }}>
          {item.name}
        </Text>
      </Box>
      <Box
        color="red"
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => deleteFunc(item.id)}
      >
        <BsTrashFill size="18" />
      </Box>
    </Box>
  ));
}
