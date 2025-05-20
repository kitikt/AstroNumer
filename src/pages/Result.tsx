import Divider from "@/components/Divider";
import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Result = () => {
  return (
    <Stack>
      <Heading as="h2">KẾT QUẢ DỰ ĐOÁN</Heading>
      <Text>
        Astro Numer dựa trên thông tin cá <br /> nhân mà bạn đã nhập trước đó để{" "}
        <br /> đưa ra kết quả
      </Text>
      <Divider />
      <Heading as="h2">
        CÁC KẾT QUẢ DỰ ĐOÁN <br />
        TỪNG DANH MỤC
      </Heading>
      <HStack>
        <Image
          src="/images/map.png"
          width={"300px"}
          height={"200px"}
          borderRadius={"20px"}
        />
        <Stack>
          <Heading>PHÂN TÍCH CHI TIẾT BẢN ĐỒ SAO</Heading>
          <Text>
            Thể hiện qua hình ảnh bản đồ sao, phân tích chi tiết nội dung{" "}
            <Text color="red.500">
              <Link to="#">Xem chi tiết</Link>
            </Text>
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};
export default Result;
