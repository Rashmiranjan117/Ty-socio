import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image } from "@chakra-ui/react";
import axios, { AxiosPromise, AxiosResponse } from "axios";
import Cookies from "universal-cookie";

interface DataType {
  image: string;
  userId: string;
  comment: string[];
  like: number;
}

const getData = (token: string): Promise<AxiosResponse<DataType[]>> => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/post/",
    headers: {
      Authorization: token,
    },
  });
};

const Dashboards = () => {
  const [data, setData] = useState<DataType[]>([]);
  const cookies = new Cookies();
  const token: string = cookies.get("isauth");

  const handleGet = () => {
    getData(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);
  console.log(data);
  return <Box className="main"></Box>;
};

export default Dashboards;
