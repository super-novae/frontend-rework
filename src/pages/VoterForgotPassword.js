import {
  Container,
  Box,
  Button,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";

export default function VoterForgotPassword() {
  return (
    <Container maxW="100%" h="100vh" p={0}>
      <Flex h="full" display="flex" flex={1} flexDir={{ base: "row" }}>
        <FP_FORM />
        <Box
          display={{ base: "none", md: "flex" }}
          flex={1}
          bgColor="CelticBlue"
          h="full"
        ></Box>
      </Flex>
    </Container>
  );
}

function FP_FORM() {
  return (
    <Box
      display="flex"
      flexDir="column"
      flex={{ base: 6, md: 1 }}
      h="full"
      justifyContent={{ base: "start", md: "center" }}
      alignItems="center"
      px={30}
      gap={5}
    >
      <Box w={{ base: "90%", md: "80%" }} mt={{ base: 20, md: 0 }}>
        <Box w="full" mb={{ base: 5, md: 10 }}>
          <Box display="flex" gap={1.5}>
            <Heading fontWeight="normal">Forgot Password?</Heading>
          </Box>
          <Text color="#7D7D7D">Enter your email</Text>
        </Box>
        <FormControl mb={{ base: 5, md: 3 }}>
          <FormLabel>Email</FormLabel>
          <Input />
        </FormControl>
        <Button w="full" bgColor="CelticBlue" mt={10} color="white">
          SEND
        </Button>
      </Box>
    </Box>
  );
}
