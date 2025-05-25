import Divider from "@/components/Divider";
import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Result = () => {
  return (
    <Stack alignItems={"center"}>
      <Heading as="h2" textStyle={"5xl"} mb={"30px"}>
        KẾT QUẢ DỰ ĐOÁN
      </Heading>
      <Text textAlign={"center"}>
        Astro Numer dựa trên thông tin cá <br /> nhân mà bạn đã nhập trước đó để{" "}
        <br /> đưa ra kết quả
      </Text>
      <Divider />

      <Stack gap={"30px"} minHeight="200px">
        <Heading as="h2" textAlign={"center"}>
          CÁC KẾT QUẢ DỰ ĐOÁN <br />
          TỪNG DANH MỤC
        </Heading>
        <HStack justifyContent={"space-between"} alignItems="stretch">
          <Image
            src="/images/map.png"
            width={"200px"}
            height={"200px"}
            borderRadius={"20px"}
          />

          <Stack minHeight="250px">
            <Heading>
              PHÂN TÍCH CHI <br /> TIẾT BẢN ĐỒ <br /> SAO
            </Heading>
            <Text>
              Thể hiện qua hình ảnh
              <br />
              bản đồ sao, phân tích <br />
              chi tiết nội dung{" "}
              <Text color="red.500">
                <Link to="#">Xem chi tiết</Link>
              </Text>
            </Text>
          </Stack>
          <Image
            src="/images/starmap.png"
            width={"200px"}
            height={"200px"}
            borderRadius={"20px"}
          />
          <Stack minHeight="250px">
            <Heading>
              PHÂN TÍCH CHI <br /> TIẾT THẦN SỐ <br />
              HỌC{" "}
            </Heading>
            <Text>
              Thể hiện qua các con <br /> số, phân tích chi tiết <br /> nội dung{" "}
              <Text color="red.500">
                <Link to="#">Xem chi tiết</Link>
              </Text>
            </Text>
          </Stack>
        </HStack>
        <HStack gap="20px" justifyContent="space-between" alignItems="stretch">
          <Image
            src="/images/map.png"
            width={"200px"}
            height={"200px"}
            borderRadius={"20px"}
          />
          <Stack minHeight="250px">
            <Heading>
              KẾT HỢP GIỮA <br />
              BẢN ĐỒ SAO <br />
              VÀ THẦN SỐ HỌC
            </Heading>
            <Text>
              Phân tích chi tiết giữa <br /> 2 công cụ bói toán <br />
              khác nhau{" "}
              <Text color="red.500">
                <Link to="#">Xem chi tiết</Link>
              </Text>
            </Text>
          </Stack>
          <Image
            src="/images/map.png"
            width={"200px"}
            height={"200px"}
            borderRadius={"20px"}
            marginLeft={"36px"}
          />

          <Stack minHeight="250px">
            <Heading>
              PHÂN TÍCH <br /> CHUYÊN SÂU <br /> CÙNG CHUYÊN GIA{" "}
            </Heading>
            <Text>
              Phân tích chi tiết 1:1 <br /> cùng chuyên gia{" "}
              <Text color="red.500">
                <Link to="#">Xem chi tiết</Link>
              </Text>
            </Text>
          </Stack>
        </HStack>
      </Stack>
      <Divider />
    </Stack>
  );
};
export default Result;
