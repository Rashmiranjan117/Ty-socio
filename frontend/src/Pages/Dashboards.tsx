import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image, Divider, useToast } from "@chakra-ui/react";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { AiOutlineLike } from "react-icons/ai";
import { AddContext } from "../context/ContextProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import "./styles/dashboards.css";
interface DataType {
  image: string;
  userId: string;
  comment?: string[];
  like: number;
  _id: string;
  description: string;
}

const getData = (token: string): Promise<AxiosResponse<DataType[]>> => {
  return axios({
    method: "GET",
    url: "https://spotless-galoshes-lion.cyclic.app/post/",
    headers: {
      Authorization: token,
    },
  });
};

const updateLikes = (token: string, payload: DataType) => {
  console.log(payload);
  return axios({
    method: "PATCH",
    url: `https://spotless-galoshes-lion.cyclic.app/${payload._id}`,
    data: payload,
    headers: {
      Authorization: token,
    },
  });
};

const deletePost = (id: string, token: string) => {
  return axios({
    method: "DELETE",
    url: `https://spotless-galoshes-lion.cyclic.app/post/${id}`,
    headers: {
      Authorization: token,
    },
  });
};

const Dashboards = () => {
  const [data, setData] = useState<DataType[]>([]);
  const cookies = new Cookies();
  const token: string = cookies.get("isauth");
  const [like, setLike] = useState<number>(0);
  const { add } = React.useContext(AddContext);
  const toast = useToast();
  const handleGet = () => {
    getData(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleLikes = (el: DataType) => {
    el.like++;
    updateLikes(token, el)
      .then((res) => {
        handleGet();
      })
      .catch((err) => console.warn(err));
  };

  const handleDelete = (id: string) => {
    deletePost(id, token)
      .then((res) => {
        toast({
          status: "success",
          title: "Post Deleted Successfully!",
          isClosable: true,
          duration: 5000,
        });
        handleGet();
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Something went wrong while deleting.",
          isClosable: true,
          duration: 5000,
        });
      });
  };

  useEffect(() => {
    handleGet();
  }, [add]);
  console.log(data);
  return (
    <Box className="main">
      {data &&
        data?.map((el) => {
          return (
            <Box key={el?._id} className="card">
              <Text className="splitname">
                <span>{el?.description}</span>
                <span className="red">
                  <RiDeleteBin6Line onClick={() => handleDelete(el?._id)} />
                </span>
              </Text>
              <Image
                src={el?.image}
                alt={el?.description}
                onDoubleClick={() => handleLikes(el)}
                loading="lazy"
              />
              {el?.like > 0 && (
                <Text className="text-split">
                  <FcLike />
                  <span>
                    {el?.like === 0 ? "" : el.like}{" "}
                    {el?.like < 2 ? "Like" : "Likes"}
                    {/* {el.like} */}
                  </span>
                </Text>
              )}
              <Divider />
              <AiOutlineLike className="icon" onClick={() => handleLikes(el)} />
            </Box>
          );
        })}
    </Box>
  );
};

export default Dashboards;
