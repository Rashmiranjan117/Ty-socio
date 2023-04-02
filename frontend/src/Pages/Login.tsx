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
import Cookies from "universal-cookie";
import "./styles/common.css";

interface LoginInterface {
  email?: string;
  phoneNumber?: number;
  password: string;
}

const LoginUser = (payload: LoginInterface): AxiosPromise => {
  return axios({
    url: "https://spotless-galoshes-lion.cyclic.app/auth/login",
    data: payload,
    method: "POST",
  });
};
// john@gmail.com  john
const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [flag, setFLag] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let credentials = email || phoneNumber;
    console.log(credentials);
    let payload = { credentials, password };
    LoginUser(payload)
      .then((res) => {
        toast({
          title: "Login Successfull.",
          status: "success",
          isClosable: true,
          duration: 5000,
          description: `${res.data.msg}`,
        });
        let token = res.data.token;
        cookies.set("isauth", token);
        navigate("/");
        console.log(res.data);
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
  return (
    <Box className="login">
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <Heading>Login</Heading>
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
          Login
        </Button>
        <Text>
          Don't have an Account? <Link to="/register">Signup</Link>
        </Text>
      </form>
    </Box>
  );
};

export default Login;
