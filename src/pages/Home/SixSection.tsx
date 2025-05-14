import { Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import styles from "@/styles/SixPage.module.css";
import { Link } from "react-router-dom";

const SixSection = () => {
  // const data = {
  //     imageUrl: "",
  //     imageAlt: "Rear view of modern home with pool",
  //     beds: 3,
  //     title: "Modern home in city center in the heart of historic Los Angeles",
  //     formattedPrice: "$435",
  //     reviewCount: 34,
  //     rating: 4.5,
  // }
  return (
    <HStack
      width={"100%"}
      gap={20}
      padding={20}
      className={styles.autoRotate}
      textAlign={"center"}
    >
      <Stack flex={1} gap={16}>
        <Heading fontSize={60} lineHeight={1.6}>
          ƯU ĐÃI CỦA MEMBERSHIP
        </Heading>
        <Text>
          Trở thành membership để nhận ngay những phân tích chuyên sâu về Thần
          Số Học, Bản Đồ Sao và Tarot! Đặc quyền dành riêng cho bạn: dự báo cá
          nhân, tư vấn chuyên biệt và nhiều ưu đãi hấp dẫn.
        </Text>
        <Link to={"/login"} className={styles.buttonWrapper}>
          <Button>XEM THÊM</Button>
        </Link>
      </Stack>
    </HStack>
  );
};

export default SixSection;
