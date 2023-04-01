import React, { useState } from "react";
import "./styles/navbar.css";
import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaRegUserCircle } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
const Navbar = () => {
  const cookie = new Cookies();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [flag, setFLag] = useState<boolean>(false);

  const handleLogout = () => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  return (
    <Box className="nav">
      <Heading>
        <span className="white">Ty</span>
        <span className="black">socio</span>
      </Heading>
      <Box className="right-end">
        <Box>
          <Button
            onClick={onOpen}
            colorScheme="blue"
            bgColor="white"
            color="white"
            variant="outline"
          >
            <GrAdd />
          </Button>

          <Modal
            blockScrollOnMount={true}
            closeOnOverlayClick={true}
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="black" variant="outline">
                  Post
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaRegUserCircle className="icon" />}
            variant="solid"
          />
          <MenuList>
            <MenuItem background="red" color="white" icon={<IoExitOutline />}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
