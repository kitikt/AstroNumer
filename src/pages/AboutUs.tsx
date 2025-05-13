import Divider from "@/components/Divider";
import { Stack, Heading, Image, HStack, Text, VStack } from "@chakra-ui/react";
// import styles from "@/styles/AboutUs.module.css";
import VerticalDivider from "@/components/VerticalDivider";

const AboutUs = () => {
  return (
    <Stack as="section" p={8} textAlign="center" width={"100%"}>
      <Heading fontSize={50} lineHeight={1.6} mt={10} mb={20}>
        VỀ CHÚNG TÔI
      </Heading>
      <Divider />
      <HStack justifyContent={"space-evenly"} mt={20}>
        <Image
          src="/images/about.png"
          alt="About Us"
          maxW="300px"
          mb={4}
          pl={0}
          borderRadius={22}
        />
        <VerticalDivider height="150px" />

        <Heading as="h2" size="2xl">
          CÁC VÌ SAO <br /> SẼ QUYẾT ĐỊNH <br /> VẬN MỆNH CỦA BẠN
        </Heading>
      </HStack>
      <HStack className="welcome" justifyContent={"space-evenly"} mt={10}>
        <Heading as="h2" size="2xl">
          CHÀO MỪNG BẠN ĐẾN <br /> VỚI ASTRO NUMER
        </Heading>
        <VerticalDivider height="150px" ml={120} />
        <Image
          src="/images/about.png"
          alt="About Us"
          maxW="300px"
          mb={4}
          pl={0}
          borderRadius={22}
        />
      </HStack>
      <HStack justifyContent={"space-around"} mt={20}>
        <VStack mr={108}>
          <Heading as="h2" size="2xl">
            TẦM NHÌN
          </Heading>
          <Text as="p" mt={5}>
            Trở thành dịch vụ bói <br />
            toán được yêu thích nhất
          </Text>
        </VStack>
        <VStack>
          <Heading as="h2" size="2xl">
            SỨ MỆNH
          </Heading>
          <Text as="p" mt={5}>
            Mang đến trải nghiệm <br />
            tuyệt vời cho khách hàng
          </Text>
        </VStack>
      </HStack>

      <Stack mt={"20"}>
        <Heading>
          TẠI SAO LẠI CHỌN <br /> ASTRONUMER
        </Heading>
        <Stack align="flex-end">
          <Image src="/images/head.png" width={"10%"} mr="20" />
          <Heading>HỖ TRỢ KHÁCH HÀNG TỐT NHẤT</Heading>
        </Stack>
        <Stack align={"center"}>
          <Image src="/images/eyehand.png" width={"10%"} />
          <Heading>BẢO MẬT DỮ LIỆU KHÁCH HÀNG</Heading>
        </Stack>
        <Stack align={"flex-start"}>
          <Image src="/images/arrow.png" width={"10%"} ml="20" />
          <Heading>MANG ĐẾN SỰ TRẢI NGHIỆM MỚI LẠ</Heading>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AboutUs;
