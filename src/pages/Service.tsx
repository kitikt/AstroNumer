import Divider from "@/components/Divider";
import {
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Box,
  Image,
  Flex,
  HStack,
} from "@chakra-ui/react";

const Service = () => {
  return (
    <Stack as="section" p={8} textAlign="center" width={"100%"}>
      <Stack>
        <Heading as="h2" fontSize={"x-large"}>
          DỊCH VỤ
        </Heading>
        <Text as="p" mt={"16"} mb={"20px"}>
          Astro Numer cung cấp cho bạn trọn vẹn dịch vụ về thần số học, bản đồ
          sao <br /> và tarot. bên cạnh đó, chúng tôi tự hào với bản kết hợp
          giữa thần số học và <br />
          bản đồ sao độc quyền chỉ có tại Astro Numer.
        </Text>
      </Stack>

      <Divider />
      <Grid
        mt={"30px"}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <Box h="100%" w="100%">
            <Flex justify="center" align="center" direction="column" h="100%">
              <Image src="/images/thansohoc.png" width="60%" />
              <Text mt={2}>BẢN ĐỒ SAO</Text>
            </Flex>
          </Box>
        </GridItem>

        <GridItem rowSpan={1} colSpan={2}>
          <Box h="100%" w="100%">
            <Heading as="h2" textAlign={"right"} mt="12">
              DỰ ĐOÁN VÀ <br /> PHÂN TÍCH VẬN <br /> MỆNH GẦN NHẤT
            </Heading>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3}>
          <Box h="100%" w="100%">
            <Flex justify="center" align="center" direction="column" h="100%">
              <Image src="/images/thansohoc.png" width="30%" />
              <Text mt={2}>THẦN SỐ HỌC</Text>
            </Flex>
          </Box>
        </GridItem>

        <GridItem rowSpan={1} colSpan={1}>
          <Box h="100%" w="100%">
            <Flex justify="center" align="center" direction="column" h="100%">
              <Image src="/images/thansohoc.png" width="60%" />
              <Text mt={2}>TEST MBTI</Text>
            </Flex>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Box h="100%" w="100%"></Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Box h="100%" w="100%">
            {/* border="2px solid green"  */}
            <Flex justify="center" align="center" direction="column" h="100%">
              <Image src="/images/thansohoc.png" width="60%" />
              <Text mt={2}>BẢN KẾT HỢP</Text>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
      <Stack>
        <Heading as="h2">TƯƠNG TÁC CÙNG AI ASTROBOT</Heading>
      </Stack>
      <Divider />
      <HStack justifyContent={"center"}>
        <Image src="/images/robot.png" width="60%" />
      </HStack>
      <Heading>CÙNG AI DỰ ĐOÁN VẬN MỆNH CỦA BẠN</Heading>
      <HStack justifyContent={"space-evenly"}>
        <Image src="/images/doublefish.png" />
        <Heading as="p">BẢN ĐỒ SAO</Heading>
        <Image src="/images/Vector.png" />
        <Heading as="p">BẢN ĐỒ SAO</Heading>
        <Image src="/images/scale.png" />
        <Heading as="p">BẢN ĐỒ SAO</Heading>
      </HStack>
    </Stack>
  );
};

export default Service;
