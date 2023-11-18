import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <Wrapper>
      <Flex 
       w="full" py={4} px={24} mx="auto" mt={8} justifyContent="center"
       alignItems="center"
      >

        <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" width="500px">
          <form onSubmit={handleSubmit}>
            {error && (
              <Box color="red.500" mb={4}>
                {error}
              </Box>
            )}
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mb={4}>
                Register
              </Text>

            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="name" name="name" placeholder="Enter your mame" 
               borderWidth="2px"
               borderBottomWidth="4px"
               borderColor="black" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                borderWidth="2px"
                borderBottomWidth="4px"
                borderColor="black" 
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderWidth="2px"
                borderBottomWidth="4px"
                borderColor="black" 
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                borderWidth="2px"
                borderBottomWidth="4px"
                borderColor="black" 
              />
              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  The password does not match
                </Text>
              )}
            </FormControl>

            <Button mt={6} bg="#B18362" color="white" type="submit" >
              Register
            </Button>
          </form>
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Register;
