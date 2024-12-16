'use client'
import { useState } from "react";
import React from 'react'
import { auth } from "../../firebase/firebase";
import { sendPasswordResetEmail } from 'firebase/auth';
import useShowToast from "../../hooks/useShowToast";
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
import { FaUserAlt, FaLock } from "react-icons/fa";
import Image from "next/image";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const App = () => {

    const showToast = useShowToast();

    const [email, setEmail] = useState("");

    const resetPasswordFunction = () => {
    const value = email

    sendPasswordResetEmail(auth,value).then(data=>{
        showToast('Email sent')
    }).catch(err=>{
        showToast(err.code)
    })

    }

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
                
                 <div style={{userSelect:'none'}}>
                Just let us know your email address.
                </div>
                
              <FormControl>
               
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input type="email" placeholder="email address" value={email}
				            onChange={(e) => setEmail(e.target.value )} />
                </InputGroup>
              </FormControl>
           
              <Button
                borderRadius={0}
                variant="solid"
                width="full"
                 colorScheme="gray"
                 onClick={resetPasswordFunction}
              >
                EMAIL PASSWORD RESET LINK
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
     
    </Flex>
  );
};

export default App;
