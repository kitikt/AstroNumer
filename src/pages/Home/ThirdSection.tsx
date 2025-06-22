import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ThirdSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Stack gap={20} align={"center"} mt={20}>
      <HStack gap={20} mx={64} bg="transparent">
        {/* Cột trái */}
        <Stack gap={10} flex="1">
          <Stack
            align="center"
            border="2px solid gray"
            padding={4}
            borderRadius="md"
            minH="300px"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              borderColor: "blue.400",
            }}
            transition="all 0.3s ease-in-out"
            animation="fadeInLeft 0.8s ease-out"
            cursor="pointer"
            onClick={() => handleCardClick("/form/numerology")}
            sx={{
              "@keyframes fadeInLeft": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(-50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Image
              src="/images/thansohoc.png"
              width="90%"
              height="150px"
              objectFit="cover"
              borderRadius="md"
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.3s ease"
            />
            <Heading
              fontSize="2xl"
              color="white"
              textTransform="uppercase"
              _hover={{ color: "blue.300" }}
              transition="color 0.3s ease"
            >
              THẦN SỐ HỌC
            </Heading>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              HÃY CÙNG ASTRONUMER KHÁM PHÁ CUỘC ĐỜI BẠN, CON SỐ CỦA BẠN TIẾT LỘ
              ĐIỀU GÌ?
            </Text>
          </Stack>
          <Stack
            align="center"
            border="2px solid gray"
            padding={4}
            borderRadius="md"
            minH="300px"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              borderColor: "purple.400",
            }}
            transition="all 0.3s ease-in-out"
            animation="fadeInLeft 1s ease-out"
            cursor="pointer"
            onClick={() => handleCardClick("/form/starmap")}
            sx={{
              "@keyframes fadeInLeft": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(-50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Image
              src="/images/thansohoc.png"
              width="90%"
              height="150px"
              objectFit="cover"
              borderRadius="md"
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.3s ease"
            />
            <Heading
              fontSize="2xl"
              color="white"
              textTransform="uppercase"
              _hover={{ color: "purple.300" }}
              transition="color 0.3s ease"
            >
              BẢN ĐỒ SAO
            </Heading>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              HÃY CÙNG ASTRONUMER KHÁM PHÁ BẢN THÂN BẠN, NHỮNG VÌ SAO NÓI GÌ VỀ
              CON NGƯỜI CỦA BẠN?
            </Text>
          </Stack>
        </Stack>
        {/* Cột phải */}
        <Stack gap={10} flex="1">
          <Stack
            align="center"
            border="2px solid gray"
            padding={4}
            borderRadius="md"
            minH="300px"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              borderColor: "green.400",
            }}
            transition="all 0.3s ease-in-out"
            animation="fadeInRight 0.8s ease-out"
            cursor="pointer"
            onClick={() => handleCardClick("/mbti")}
            sx={{
              "@keyframes fadeInRight": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Image
              src="/images/thansohoc.png"
              width="90%"
              height="150px"
              objectFit="cover"
              borderRadius="md"
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.3s ease"
            />
            <Heading
              fontSize="2xl"
              color="white"
              textTransform="uppercase"
              _hover={{ color: "green.300" }}
              transition="color 0.3s ease"
            >
              MBTI
            </Heading>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              HÃY CÙNG ASTRONUMER GIẢI NGHĨA VỀ TÍNH CÁCH VÀ MẪU NGƯỜI CỦA BẠN
              CŨNG NHƯ CÔNG VIỆC PHÙ HỢP VỚI BẠN NHÉ
            </Text>
          </Stack>
          <Stack
            align="center"
            border="2px solid gray"
            padding={4}
            borderRadius="md"
            minH="300px"
            _hover={{
              transform: "translateY(-10px)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              borderColor: "orange.400",
            }}
            transition="all 0.3s ease-in-out"
            animation="fadeInRight 1s ease-out"
            cursor="pointer"
            onClick={() => handleCardClick("/ban-ket-hop")}
            sx={{
              "@keyframes fadeInRight": {
                "0%": {
                  opacity: 0,
                  transform: "translateX(50px)",
                },
                "100%": {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Image
              src="/images/thansohoc.png"
              width="90%"
              height="150px"
              objectFit="cover"
              borderRadius="md"
              _hover={{ transform: "scale(1.05)" }}
              transition="transform 0.3s ease"
            />
            <Heading
              fontSize="2xl"
              color="white"
              textTransform="uppercase"
              _hover={{ color: "orange.300" }}
              transition="color 0.3s ease"
            >
              BẢN KẾT HỢP
            </Heading>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              HÃY CÙNG ASTRONUMER KHÁM PHÁ HÀNH TRÌNH VÀ BẢN THÂN BẠN GIỮA CÁC
              VÌ SAO VÀ NHỮNG CON SỐ
            </Text>
          </Stack>
        </Stack>
      </HStack>

      <Stack
        animation="fadeInUp 1.2s ease-out"
        sx={{
          "@keyframes fadeInUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(30px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Heading
          fontSize={40}
          lineHeight={1.6}
          _hover={{
            transform: "scale(1.02)",
            color: "blue.300",
          }}
          transition="all 0.3s ease"
        >
          TẠI SAO BẠN NÊN CHỌN ASTRONUMER?
        </Heading>
      </Stack>
      <HStack
        gap={40}
        textAlign={"center"}
        animation="fadeInUp 1.4s ease-out"
        sx={{
          "@keyframes fadeInUp": {
            "0%": {
              opacity: 0,
              transform: "translateY(30px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        <Stack
          align={"center"}
          _hover={{
            transform: "translateY(-10px) scale(1.05)",
            filter: "brightness(1.1)",
          }}
          transition="all 0.3s ease-in-out"
          cursor="pointer"
        >
          <Image
            src="/images/arrow.png"
            width={"30%"}
            _hover={{ transform: "rotate(10deg)" }}
            transition="transform 0.3s ease"
          />
          <Heading _hover={{ color: "blue.300" }} transition="color 0.3s ease">
            TRẢI NGHIỆM TRỌN VẸN
          </Heading>
          <Text>
            CHÚ TRỌNG VÀO SỰ TRẢI NGHIỆM, CHÚNG MÌNH CUNG CẤP TRỌN VẸN CÁC DỊCH
            VỤ
          </Text>
        </Stack>
        <Stack
          align={"center"}
          _hover={{
            transform: "translateY(-10px) scale(1.05)",
            filter: "brightness(1.1)",
          }}
          transition="all 0.3s ease-in-out"
          cursor="pointer"
        >
          <Image
            src="/images/eyehand.png"
            width={"30%"}
            _hover={{ transform: "rotate(-10deg)" }}
            transition="transform 0.3s ease"
          />
          <Heading
            _hover={{ color: "purple.300" }}
            transition="color 0.3s ease"
          >
            BẢO MẬT THÔNG TIN
          </Heading>
          <Text>
            CHÚ TRỌNG VÀO SỰ RIÊNG TƯ, CHÚNG MÌNH LUÔN ĐẶT QUYỀN LỢI KHÁCH HÀNG
            LÊN ĐẦU
          </Text>
        </Stack>
        <Stack
          align={"center"}
          _hover={{
            transform: "translateY(-10px) scale(1.05)",
            filter: "brightness(1.1)",
          }}
          transition="all 0.3s ease-in-out"
          cursor="pointer"
        >
          <Image
            src="/images/head.png"
            width={"30%"}
            _hover={{ transform: "scale(1.1)" }}
            transition="transform 0.3s ease"
          />
          <Heading _hover={{ color: "green.300" }} transition="color 0.3s ease">
            BÊN BẠN MỌI LÚC MỌI NƠI
          </Heading>
          <Text>
            CHÚ TRỌNG VÀO KHÁCH HÀNG, CHÚNG MÌNH LUÔN CÓ MẶT Ở MỌI THỜI ĐIỂM MÀ
            BẠN CẦN
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default ThirdSection;
