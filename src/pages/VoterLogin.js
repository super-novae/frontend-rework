import { useState } from "react";
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
  CircularProgress,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function VoterLogin({ login }) {
  const navigate = useNavigate();
  return (
    <Container maxW="100%" h="100vh" p={0}>
      <Flex h="full" display="flex" flex={1} flexDir={{ base: "row" }}>
        <LoginForm navigate={navigate} login={login} />
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

function LoginForm({ navigate, login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginEvent = () => {
    setLoading(true);
    login(email, password);
  };

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
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
        <Button
          w="full"
          bgColor="CelticBlue"
          mt={10}
          color="white"
          onClick={loginEvent}
          gap={5}
        >
          {loading && (
            <CircularProgress isIndeterminate color="black" size="8" />
          )}
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}
