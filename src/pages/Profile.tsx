import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { Input } from "@chakra-ui/input";

import { Textarea } from "@chakra-ui/textarea";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";

type Inputs = {
  ho: string;
  ten: string;
  bietDanh?: string;
  gioiTinh: string;
  gioSinh: string;
  ngaySinh: string;
  noiSinh?: string;
};

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Stack
      width={"100%"}
      bgGradient="linear(to-b, purple.800, purple.600)"
      minH="100vh"
      py={10}
      color="white"
      alignItems={"center"}
    >
      <Heading as="h2" mb={6} textAlign="center" size="lg">
        Thông Tin Cá Nhân
      </Heading>
      <Text as="p" textAlign={"center"}>
        Hãy cho chúng mình xin thông tin cá <br />
        nhân của bạn nhé !
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="100%" p={8} gap={50}>
          <HStack gap={40}>
            <Stack gap={22}>
              <FormControl isInvalid={!!errors.ho} isRequired gap={"10"}>
                <FormLabel as="p">HỌ</FormLabel>
                <Input
                  w={"230px"}
                  p={"5px"}
                  h={"34px"}
                  border={"1px white solid"}
                  borderRadius="20px"
                  bgColor={"transparent"}
                  _placeholder={{ color: "white" }}
                  placeholder="Nhập họ của bạn"
                  {...register("ho", { required: "Trường này bắt buộc" })}
                />
                <FormErrorMessage>{errors.ho?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel as="p">BIỆT DANH (NẾU CÓ)</FormLabel>
                <Input
                  p={"5px"}
                  placeholder="Nhập biệt danh của bạn"
                  w={"230px"}
                  h={"34px"}
                  border={"1px white solid"}
                  borderRadius="20px"
                  bgColor={"transparent"}
                  _placeholder={{ color: "white" }}
                  {...register("bietDanh")}
                />
              </FormControl>

              <FormControl isInvalid={!!errors.gioSinh} isRequired>
                <FormLabel as="p">GIỜ SINH</FormLabel>

                <Select
                  as="select"
                  placeholder="Chọn giờ sinh"
                  w={"100%"}
                  h={"34px"}
                  icon={<></>}
                  border={"1px white solid"}
                  borderRadius="20px"
                  bgColor={"transparent"}
                  _placeholder={{ color: "white" }}
                  sx={{
                    appearance: "auto",
                    "& option": {
                      color: "black",
                      background: "white",
                    },
                    "& option:hover": {
                      background: "#e0e0e0",
                    },
                  }}
                  {...register("gioSinh", {
                    required: "Bắt buộc chọn giờ sinh",
                  })}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.gioSinh?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack gap={22}>
              <FormControl isInvalid={!!errors.ten} isRequired>
                <FormLabel as="p">TÊN</FormLabel>
                <Input
                  w={"230px"}
                  h={"34px"}
                  p={"5px"}
                  border={"1px white solid"}
                  borderRadius="20px"
                  bgColor={"transparent"}
                  _placeholder={{ color: "white" }}
                  placeholder="Nhập tên của bạn"
                  {...register("ten", { required: "Trường này bắt buộc" })}
                />
                <FormErrorMessage>{errors.ten?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.gioiTinh} isRequired>
                <FormLabel as="p">GIỚI TÍNH</FormLabel>
                <Select
                  as="select"
                  placeholder="Chọn giới tính"
                  w={"230px"}
                  h={"34px"}
                  icon={<></>}
                  border={"1px white solid"}
                  borderRadius="20px"
                  bgColor={"transparent"}
                  _placeholder={{ color: "white" }}
                  sx={{
                    appearance: "auto",
                    "& option": {
                      color: "black",
                      background: "white",
                    },
                    "& option:hover": {
                      background: "#e0e0e0",
                    },
                  }}
                  {...register("gioiTinh", {
                    required: "Bắt buộc chọn giới tính",
                  })}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </Select>

                <FormErrorMessage>{errors.gioiTinh?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.ngaySinh} isRequired>
                <FormLabel>NGÀY SINH</FormLabel>
                <Select
                  as="select"
                  placeholder="Chọn ngày sinh"
                  w={"230px"}
                  h={"34px"}
                  icon={<></>}
                  border={"1px white solid"}
                  borderRadius="20px"
                  bgColor={"transparent"}
                  _placeholder={{ color: "white" }}
                  sx={{
                    appearance: "auto",
                    "& option": {
                      color: "black",
                      background: "white",
                    },
                    "& option:hover": {
                      background: "#e0e0e0",
                    },
                  }}
                  {...register("ngaySinh", {
                    required: "Bắt buộc chọn ngày sinh",
                  })}
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.ngaySinh?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </HStack>
          <FormControl>
            <FormLabel as="p">NƠI SINH</FormLabel>
            <Textarea
              p={12}
              placeholder="Nhập nơi sinh"
              w={"100%"}
              border={"1px white solid"}
              borderRadius="20px"
              bgColor={"transparent"}
              _placeholder={{ color: "white" }}
              rows={4}
              {...register("noiSinh")}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            size="lg"
            borderRadius="full"
            w={{ base: "full", md: "auto" }}
            px={10}
            mx={{ md: "auto" }}
            display="block"
          >
            Gửi
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
