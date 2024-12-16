'use client'
import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement
} from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { FaUserAlt, FaLock,FaRegEnvelope } from "react-icons/fa";
import Image from "next/image";
const CFaMail = chakra(FaRegEnvelope);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";


const App = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    user && router.push('/')
  }, [user])

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

  const { loading, error, login } = useLogin();
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
          <div id="text1" >DeenFlow</div>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaMail color="gray.300" />}
                  />
                  <Input value={inputs.email}
							   onChange={(e) => setInputs({ ...inputs, email: e.target.value })} type="email" placeholder="email address" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                  value={inputs.password}
                  autoComplete="current-password"
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link  href="/forgot-password">forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                width="full"
                 colorScheme="gray"
                 onClick={() => login(inputs)}  isLoading={loading} 
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link color='gray' href="/register">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default App;
