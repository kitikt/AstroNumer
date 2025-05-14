import { Button, Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import styles from "@/styles/FourthPage.module.css";
import { Link } from "react-router-dom";

const FourthSection = () => {
  const data = {
    imageUrl: "",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$435",
    reviewCount: 34,
    rating: 4.5,
  };
  return (
    <HStack
      width={"100%"}
      gap={20}
      padding={20}
      flex={1}
      align={"center"}
      className={styles.autoRotate}
    >
      <Stack gap={10}>
        <Heading fontSize={50} lineHeight={1.6} mt={20}>
          TƯƠNG TÁC CÙNG AI
        </Heading>
        <Text>
          Là AI độc quyền của Astronumer, như một trợ lý thay thế chúng mình ở
          bên bạn mọi lúc.{" "}
        </Text>
        <Text>
          Được đào tạo riêng để giải quyết các vấn đề liên quan đến Thần số học
          và Bản đồ sao Có tính năng xem Tarot và Cung hoàng đạo hàng ngày
        </Text>
      </Stack>
      <Stack
        gap={5}
        width={"100%"}
        align={"center"}
        mt={20}
        justifyContent={"space-between"}
      >
        <HStack justifyContent="center">
          <Image
            src={"/images/testimage.png"}
            alt={data.imageAlt}
            width={"50%"}
          />
        </HStack>
        <Heading fontSize={50} lineHeight={1.6} mt={15}>
          ASTROBOT
        </Heading>
        <Link to="/login" className={styles.buttonWrapper}>
          <Button>Xem Thêm</Button>
        </Link>
      </Stack>
    </HStack>
  );
};

export default FourthSection;
