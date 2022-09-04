import { Box, Text } from "@chakra-ui/react";

export default function ListView({ listItem }) {
  return listItem.map((item) => (
    <Box
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
      <Text flex={1} fontSize={{ base: "md", md: "xl" }}>
        {item.id}
      </Text>
      <Text flex={2} fontSize={{ base: "md", md: "xl" }}>
        {item.name}
      </Text>
    </Box>
  ));
}
