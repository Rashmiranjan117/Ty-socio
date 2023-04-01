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

interface SignupInterface {
  email?: string;
  phoneNumber?: number;
  password: string;
}

const registerUser = (payload: SignupInterface): AxiosPromise => {
  return axios({
    url: "http://localhost:8080/auth/register",
    data: payload,
    method:"POST"
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
    let payload = { email, phoneNumber, password };
    registerUser(payload)
      .then((res) => {
        toast({
          title: "Account created Successfully.",
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
        });
      });
  };
  // console.log(flag);
  return (
    <Box className="signup">
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
            type='password'
          />
        </FormControl>
        <Button type="submit">Signup</Button>
      </form>
    </Box>
  );
};

export default SIgnup;
