import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  useToast,
  Text,
  Heading,
} from "@chakra-ui/react";
import axios, { AxiosPromise } from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles/common.css";

interface SignupInterface {
  email?: string;
  phoneNumber?: number;
  password: string;
}

const registerUser = (payload: SignupInterface): AxiosPromise => {
  return axios({
    url: "https://spotless-galoshes-lion.cyclic.app/auth/register",
    data: payload,
    method: "POST",
  });
};

const SIgnup = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [flag, setFLag] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let credentials = email || phoneNumber;
    console.log(credentials);
    let payload = { credentials, password };
    registerUser(payload)
      .then((res) => {
        toast({
          title: "Account created Successfully.",
          description: `${res.data.msg}`,
          status: "success",
          isClosable: true,
          duration: 5000,
        });
        navigate("/login");
      })
      .catch((err) => {
        toast({
          title: "Something went wrong.",
          status: "error",
          isClosable: true,
          duration: 5000,
          description: `${err}`,
        });
      });
  };
  // console.log(flag);
  return (
    <Box className="signup">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
      <Heading>Signup</Heading>
        <FormControl isRequired>
          <FormLabel>Email / Phone Number</FormLabel>
          <Checkbox defaultChecked onChange={(e) => setFLag(!flag)}>
            Signup Via. {flag ? "Phone Number" : "Email"}
          </Checkbox>
          <Input
            placeholder={flag ? "Enter Phone Number" : "Enter Email"}
            onChange={(e) => {
              if (flag) {
                setPhoneNumber(parseInt(e.target.value));
              } else {
                setEmail(e.target.value);
              }
            }}
            type={flag ? "number" : "email"}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Signup
        </Button>
        <Text>
          Already Have an Account? <Link to="/login">Login</Link>
        </Text>
      </form>
    </Box>
  );
};

export default SIgnup;
