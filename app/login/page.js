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
  InputRightElement,
  Image
} from "@chakra-ui/react";
import useLogin from "../../hooks/useLogin";
import { FaUserAlt, FaLock,FaRegEnvelope } from "react-icons/fa";
const CFaMail = chakra(FaRegEnvelope);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
import { auth } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useSignInWithGoogle , useSignInWithApple } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import {  firestore } from "../../firebase/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore";


const App = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  useEffect(() => {
    user && router.push('/')
  }, [user])

  const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
  const [signInWithApple, , , error1 ] = useSignInWithApple(auth);
	const showToast = useShowToast();
	const loginUser = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

  const handleGoogleAuth = async () => {
		try {
			const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
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

  const handleAppleAuth = async () => {
		try {
			const newUser = await signInWithApple();
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


  const { loading, login } = useLogin();
  return (
    <>
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
                    children={<CFaMail color="gray.300" />}
                  />
                  <Input color="#000" borderColor={"gray.400"}  _hover={{borderColor:"gray.600"}} value={inputs.email}
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
                  borderColor={"gray.400"}  _hover={{borderColor:"gray.600"}}
                  value={inputs.password}
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
                <FormHelperText textAlign="right">
                  <Link color='#000'  href="/forgot-password">forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                width="full"
                backgroundColor="#000"
                color="#fff"
                _hover={{backgroundColor:"#121212"}}
                 onClick={() => login(inputs)}  isLoading={loading} 
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box color='#000'>
      <span style={{userSelect:'none' , color:"#000"}}>
        New to us?{" "}
          </span>
        <Link color='gray' href="/register">
          Sign Up
        </Link>
      </Box>
      
      <Flex mt={10}> 
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
        <Button backgroundColor={"#000"} _hover={{backgroundColor:"#121212"}} mx='2' color={"white"}>
      <Image src='/google.png' w={3} h={3} mr={2} alt='Google logo' />
        Google
      </Button>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleAppleAuth}>
        <Button backgroundColor={"#000"} _hover={{backgroundColor:"#121212"}} mx='2' color={"white"}>
      <Image src='/apple.png' w={3} h={3} mr={2} alt='Apple logo' />
        Apple
      </Button>
        </Flex>
      </Flex>
    </Flex>
    
  </>
  );
};

export default App;
