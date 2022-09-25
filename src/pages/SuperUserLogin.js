import { useState } from "react";
import {
  Container,
  Box,
  Button,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  CircularProgress,
} from "@chakra-ui/react";
import "../index.css"

export default function SuperUserLogin({ loginHandler }) {
  return (
    <Container maxW="100%" h="100vh" p={0}>
      <Flex h="full" display="flex" flex={1} flexDir={{ base: "row" }}>
        <LoginForm loginHandler={loginHandler} />
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

function LoginForm({ loginHandler }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateLoginInput = () => {
    setPasswordError(false);
    setUsernameError(false);
    if (username === "") {
      setUsernameError(true);
      return false;
    }
    if (password === "") {
      setPasswordError(true);
      return false;
    }

    return true;
  };

  const onLoginClick = async () => {
    setLoading(true);
    const shouldLogin = validateLoginInput();
    if (shouldLogin) {
      const response = await loginHandler(username, password);
      console.log("SuperUserLogin: ", response);
      if (response) setLoading(false);
    }
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
                super_u!
              </Text>
            </Heading>
          </Box>
          <Text color="#7D7D7D">Enter your login credentials</Text>
        </Box>
        <FormControl mb={{ base: 5, md: 3 }} isInvalid={usernameError}>
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormErrorMessage>Username is required</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <FormErrorMessage>Password is required</FormErrorMessage>
        </FormControl>
        <Button w="full" bgColor="CameoPink" mt={10} onClick={onLoginClick}>
          {loading && (
            <CircularProgress isIndeterminate color="black" size="5" mr="3" />
          )}
          LOGIN
        </Button>
      </Box>
    </Box>
  );
}
