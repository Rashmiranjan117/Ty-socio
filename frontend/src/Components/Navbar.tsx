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
  useToast,
  Hide,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { FaRegUserCircle } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import axios, { AxiosResponse, AxiosPromise } from "axios";
import { GrAdd } from "react-icons/gr";
import { AddContext } from "../context/ContextProvider";

interface DataInterface {
  image: string;
  comment?: string;
  like: number;
  description: string;
}

const postData = (
  payload: DataInterface,
  token: string
): Promise<AxiosResponse> => {
  return axios({
    method: "POST",
    url: "https://spotless-galoshes-lion.cyclic.app/post/",
    data: payload,
    headers: {
      Authorization: token,
    },
  });
};

const Navbar = () => {
  const cookie = new Cookies();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = cookie.get("isauth");
  const [image, setImage] = useState<string>("");
  const [like, setLike] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [isLiked, setIsliked] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { add, setadd } = React.useContext(AddContext);
  // console.log(add,setadd)

  const handleLogout = () => {
    cookie.remove("isauth");
    navigate("/login");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let payload = {
      image,
      like,
      description,
      comment: "",
    };
    postData(payload, token)
      .then((res) => {
        toast({
          title: `${res.data.msg}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setadd(!add);
        onClose();
      })
      .catch((err) => {
        toast({
          title: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    setImage("");
    setDescription("");
  };
  return (
    <Box className="nav">
      <Heading>
        <span className="white">Ty'</span>
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
            <Hide below="md">
              <Text color="blue.600" ml={5}>
                Add
              </Text>
            </Hide>
          </Button>

          <Modal
            blockScrollOnMount={true}
            closeOnOverlayClick={true}
            isOpen={isOpen}
            onClose={onClose}
            size="xl"
          >
            <ModalOverlay />
            <ModalContent className="modal">
              <ModalHeader>Add New Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDirection="column" gap={3}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <FormControl isRequired>
                    <FormLabel>Enter Image Url</FormLabel>
                    <Input
                      placeholder="Enter Image url"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Enter Description</FormLabel>
                    <Input
                      placeholder="Description/Caption"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue" variant="outline">
                    Post
                  </Button>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
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
            <MenuItem
              background="red"
              color="white"
              icon={<IoExitOutline />}
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
