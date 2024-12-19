'use client'
import { useEffect, useState } from "react";
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
  InputRightElement,
  Image
} from "@chakra-ui/react";
import { FaUserAlt, FaLock , FaRegEnvelope } from "react-icons/fa";

import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'
import { useSignInWithGoogle , useSignInWithApple } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import {  firestore } from "../../firebase/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore";

const CFaMail = chakra(FaRegEnvelope);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);



const App = () => {
  const [inputs, setInputs] = useState({
		username: "",
		email: "",
		password: "",
	});

  const [signInWithGoogle, , , error1] = useSignInWithGoogle(auth);

	const showToast = useShowToast();
  const loginUser = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const [loading1, setLoading] = useState(loading)
  const sign = async (inputs) =>
  {
    setLoading(true);
    await signup(inputs)
  }

  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error1) {
				showToast("Error", error1.message, "error");
				return;
			}
			const userRef = doc(firestore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					createdAt: Date.now(),
					premium:false
				};
				await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};



  useEffect(() => {
    user && router.push('/')
  }, [user])
  



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
          <div style={{userSelect:'none' , color:"#000"}} id="text1" >DeenFlow</div>
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
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input color="#000"
                  value={inputs.username}
                  borderColor={"gray.400"}  _hover={{borderColor:"gray.600"}}
								onChange={(e) => setInputs({ ...inputs, username: e.target.value })}  type="name" placeholder="name" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaMail color="gray.300" />}
                  />
                  <Input color="#000" value={inputs.email}
                  borderColor={"gray.400"}  _hover={{borderColor:"gray.600"}}
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
                  color="#000"
                  value={inputs.password}
                  borderColor={"gray.400"}  _hover={{borderColor:"gray.600"}}
                  autoComplete="current-password"
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button backgroundColor="gray.300"
                      color="#fff"
                      _hover={{backgroundColor:"gray.400"}}  h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              
              </FormControl>
              <Button
                borderRadius={0}
                backgroundColor="#000"
                color="#fff"
                _hover={{backgroundColor:"#121212"}}
                variant="solid"
                width="full"
                 colorScheme="gray"
                 isLoading={loading}
						onClick={() => signup(inputs)}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
      <span style={{userSelect:'none' , color:"#000"}}>
      Already registered?{" "}
          </span>
      
        <Link color='gray' href="/login">
          Login
        </Link>
      </Box>
      <Flex mt={10}> 
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
        <Button backgroundColor={"#000"} _hover={{backgroundColor:"#121212"}} mx='2' color={"white"}>
      <Image src='/google.png' w={3} h={3} mr={2} alt='Google logo' />
        Google
      </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;
