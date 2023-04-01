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
} from "@chakra-ui/react";
import axios, { AxiosPromise } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

interface LoginInterface {
  email?: string;
  phoneNumber?: number;
  password: string;
}

const LoginUser = (payload: LoginInterface): AxiosPromise => {
  return axios({
    url: "http://localhost:8080/auth/login",
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
    let payload = { email, phoneNumber, password };
    LoginUser(payload)
      .then((res) => {
        toast({
          title: "Account created Successfully.",
          status: "success",
          isClosable: true,
          duration: 5000,
        });
        let token = res.data.token;
        cookies.set("isauth", token);
        navigate("/");
      })
      .catch((err) => {
        toast({
          title: "Something went wrong.",
          status: "error",
          isClosable: true,
          duration: 5000,
        });
      });
  };
  return (
    <Box className="login">
      <form onSubmit={(e) => handleSubmit(e)}>
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
        <Button type="submit">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
