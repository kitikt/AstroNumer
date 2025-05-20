import Divider from "@/components/Divider";
import LatestArticlesCarousel from "@/components/LatestArticlesCarousel";
import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";

const DailyDestiny = () => {
  return (
    <Stack align={"center"} maxW={"100%"}>
      <Heading as="h2" textStyle={"5xl"}>
        VẬN MỆNH HẰNG NGÀY
      </Heading>
      <Text textAlign={"center"} mt={"20px"}>
        Astro Numer luôn cập nhật vận mệnh <br /> hằng ngày theo Bản đồ sao /
        Thần số học
      </Text>
      <Divider />
      <Image
        borderRadius={"20px"}
        src="/images/thansohoc.png"
        w="500px"
        h="300px"
        mb="50px"
      ></Image>
      <HStack
        maxW={"100%"}
        justifyContent={"space-evenly"}
        alignItems="stretch"
      >
        <Stack w={"50%"}>
          <Heading>[TIÊU ĐỀ BÀI VIẾT]</Heading>
          <Text w={"100%"}>
            Lorem ipsum dolor sit amet consectetur. Pellentesque nascetur sed
            tellus ut vehicula eu consectetur elit at. Nulla erat nunc nisl dui
            sed cras semper vitae. Tempor odio ullamcorper non sed dignissim eu
            egestas fusce arcu. Sagittis ut tellus faucibus nunc sed nibh risus
            dig turpis sit. Lorem pretium feugiat tincidunt laoreet. Vitae
            volutpat augue libero a.Vulputate tincidunt augue scelerisque elit
            facilisi feugiat mauris. Rhoncus id ultricies orci diam ornare eu
            habitant. Vel non augue vitae lectus ut volutpat integer quis ut.
            Quis in egestas arcu convallis nisl. Vitae proin in amet consequat.
            Pellentesque dictum tincidunt imperdiet tortor odio in suspendisse.
            Dolor fermentum porttitor lectus commodo. Elementum risus fermentum
            tellus odio viverra. Tristique porta sodales condimentum placerat.
            Tincidunt sagittis aliquet sapien in a. Nunc enim varius lorem
            cursus nisi egestas vitae. Euismod dignissim donec vitae ut nullam
            sit.
          </Text>
        </Stack>
        <Stack gap="10">
          <Heading> CÁC BÀI VIẾT TƯƠNG TỰ</Heading>
          <HStack>
            <Image src="/images/image37.png " w={"30%"}></Image>
            <Stack>
              <Heading>[TIÊU ĐỀ BÀI VIẾT]</Heading>

              <Text>[SAPO]</Text>
            </Stack>
          </HStack>
          <HStack>
            <Image src="/images/image37.png " w={"30%"}></Image>
            <Stack>
              <Heading>[TIÊU ĐỀ BÀI VIẾT]</Heading>

              <Text>[SAPO]</Text>
            </Stack>
          </HStack>
          <HStack>
            <Image src="/images/image37.png " w={"30%"}></Image>
            <Stack>
              <Heading>[TIÊU ĐỀ BÀI VIẾT]</Heading>

              <Text>[SAPO]</Text>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <Heading mt={"20px"}>BÀI VIẾT MỚI NHẤT</Heading>
      <LatestArticlesCarousel />
    </Stack>
  );
};
export default DailyDestiny;
