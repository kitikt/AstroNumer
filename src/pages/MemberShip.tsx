import Divider from "@/components/Divider";
import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { SiTicktick } from "react-icons/si";

const plans = [
  {
    name: "GÓI XEM NHANH",
    price: "29,000/Ngày",
    features: [
      "Bao gồm gói ngày",
      "Có thể dùng Astrobot 5 lần",
      "Mỗi dịch vụ dùng 1 lần duy nhất",
    ],
  },
  {
    name: "GÓI THÔNG DỤNG",
    price: "179,000/Tháng",
    features: [
      "Bao gồm gói tháng",
      "Xem Thần số học với reader cơ bản",
      "Có thể dùng Astrobot 5 lần",
      "1 người dùng",
    ],
  },
  {
    name: "GÓI CAO CẤP",
    price: "579,000/Tháng",
    features: [
      "Bao gồm gói tháng",
      "Có thể dùng Astrobot không giới hạn",
      "Xem Bản đồ sao với reader cao cấp",
      "4 người dùng",
    ],
  },
];

const MemberShip = () => {
  return (
    <Stack width="100%" alignItems="center" minHeight={"100vh"}>
      <Heading as="h2">MEMBERSHIP</Heading>
      <Text textAlign="center">
        Hãy trở thành một trong những tín đồ <br /> mê Astro Numer nhé!
      </Text>
      <Divider />
      <Heading as="h2">GÓI DỊCH VỤ DÀNH CHO THÀNH VIÊN</Heading>

      <HStack justifyContent="space-evenly" width="100%" flexWrap="wrap">
        {plans.map((plan, idx) => (
          <Box
            key={idx}
            p="6"
            bg={idx === 1 ? "#8A4AF3" : "transparent"}
            borderWidth="1px"
            borderColor="white"
            color="white"
            minW="250px"
            borderRadius="20px"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          >
            <Text fontWeight="bold" fontSize="2xl" textAlign="center" mb={4}>
              {plan.name}
            </Text>
            <Text fontSize="xl" textAlign="center" mb={6}>
              {plan.price}
            </Text>
            {plan.features.map((feature, i) => (
              <HStack key={i} alignItems="center" mb={2}>
                <SiTicktick color="white" size={18} />
                <Text as="p" fontSize="md">
                  {feature}
                </Text>
              </HStack>
            ))}
            <Button
              mt={6}
              width="100%"
              bg="white"
              color={idx === 1 ? "#8A4AF3" : "#631ea4"}
              borderRadius="20px"
              _hover={{ bg: "#e0d7ff" }}
            >
              CHỌN NGAY
            </Button>
          </Box>
        ))}
      </HStack>

      <Stack
        mt={"50px"}
        width={"90%"}
        alignItems={"center"}
        padding={"20px"}
        backgroundImage="url('/images/membership.png')"
        backgroundSize={"cover"}
      >
        <Heading>HÃY TRỞ THÀNH THÀNH VIÊN CỦA ASTRO NUMER</Heading>
        <Button
          width="120px"
          height="45px"
          border="none"
          borderRadius="50px"
          bg="#631ea4"
          color="white"
          fontWeight="600"
          _hover={{ bg: "#4c1580" }}
          cursor="pointer"
        >
          THAM GIA
        </Button>
      </Stack>
    </Stack>
  );
};

export default MemberShip;
