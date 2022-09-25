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
import { useNavigate } from "react-router-dom";

export default function VoterLogin() {
  const navigate = useNavigate();
  return (
    <Container maxW="100%" h="100vh" p={0}>
      <Flex h="full" display="flex" flex={1} flexDir={{ base: "row" }}>
        <LoginForm navigate={navigate} />
        <Box
          display={{ base: "none", md: "flex" }}
          flex={1}
          h="full"
          className="voter-background"
        ></Box>
      </Flex>
    </Container>
  );
}

function LoginForm({ navigate }) {
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
            <Heading fontWeight="normal">
              Welcome back,
              <Text fontWeight="bold" display="inline">
                {" "}
                voter!
              </Text>
            </Heading>
          </Box>
          <Text color="#7D7D7D">Enter your login credentials</Text>
        </Box>
        <FormControl mb={{ base: 5, md: 3 }}>
          <FormLabel>Username</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password"/>
        </FormControl>
        <Box w="full" display="flex" justifyContent="right" my={2}>
          <Text
            onClick={() => navigate("forgot-password")}
            _hover={{
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Forgot Password
          </Text>
        </Box>
        <Button w="full" bgColor="CelticBlue" mt={10} color="white">
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}
