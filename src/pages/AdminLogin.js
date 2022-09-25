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
import "../App.css";

export default function AdminLogin({ login }) {
  return (
    <Container maxW="100%" h="100vh" p={0}>
      <Flex h="full" display="flex" flex={1} flexDir={{ base: "row" }}>
        <LoginForm login={login} />
        <Box
          display={{ base: "none", md: "flex" }}
          flex={1}
          className="admin-super-background"
          h="full"
        ></Box>
      </Flex>
    </Container>
  );
}

function LoginForm({ login }) {
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
                Admin!
              </Text>
            </Heading>
          </Box>
          <Text color="#7D7D7D">Enter your login credentials</Text>
        </Box>
        <FormControl mb={{ base: 5, md: 3 }}>
          <FormLabel>Email</FormLabel>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormControl>
        <Button w="full" bgColor="CameoPink" mt={10} onClick={loginEvent}>
          {loading && (
            <CircularProgress isIndeterminate color="black" size="5" mr="3" />
          )}
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}
