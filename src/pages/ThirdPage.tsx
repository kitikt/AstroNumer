import { Heading, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";

const ThirdPage = () => {
    return (
        <Stack gap={20} align={'center'} mt={20} >
            <HStack gap={20} mx={64} bg="transparent">
                {/* Cột trái */}
                <Stack gap={10} flex="1">
                    <Stack
                        align="center"
                        border="2px solid gray"
                        // bg="rgba(0, 0, 0, 0.5)"

                        padding={4}
                        borderRadius="md"
                        minH="300px"
                    >
                        <Image
                            src="/images/thansohoc.png"
                            width="90%"
                            height="150px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <Heading fontSize="2xl" color="white" textTransform="uppercase">
                            THẦN SỐ HỌC
                        </Heading>
                        <Text fontSize="sm" color="gray.400" textAlign="center">
                            HÃY CÙNG ASTRONUMER KHÁM PHÁ CUỘC ĐỜI BẠN, CON SỐ CỦA BẠN TIẾT LỘ ĐIỀU GÌ?
                        </Text>
                    </Stack>
                    <Stack
                        align="center"
                        border="2px solid gray"
                        padding={4}
                        borderRadius="md"
                        minH="300px"
                    >
                        <Image
                            src="/images/thansohoc.png"
                            width="90%"
                            height="150px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <Heading fontSize="2xl" color="white" textTransform="uppercase">
                            BẢN ĐỒ SAO
                        </Heading>
                        <Text fontSize="sm" color="gray.400" textAlign="center">
                            HÃY CÙNG ASTRONUMER KHÁM PHÁ BẢN THÂN BẠN, NHỮNG VÌ SAO NÓI GÌ VỀ CON NGƯỜI CỦA BẠN?
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
                    >
                        <Image
                            src="/images/thansohoc.png"
                            width="90%"
                            height="150px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <Heading fontSize="2xl" color="white" textTransform="uppercase">
                            MBTI
                        </Heading>
                        <Text fontSize="sm" color="gray.400" textAlign="center">
                            HÃY CÙNG ASTRONUMER GIẢI NGHĨA VỀ TÍNH CÁCH VÀ MẪU NGƯỜI CỦA BẠN CŨNG NHƯ CÔNG VIỆC PHÙ HỢP VỚI BẠN NHÉ
                        </Text>
                    </Stack>
                    <Stack
                        align="center"
                        border="2px solid gray"
                        padding={4}
                        borderRadius="md"
                        minH="300px"
                    >
                        <Image
                            src="/images/thansohoc.png"
                            width="90%"
                            height="150px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <Heading fontSize="2xl" color="white" textTransform="uppercase">
                            BẢN KẾT HỢP
                        </Heading>
                        <Text fontSize="sm" color="gray.400" textAlign="center">
                            HÃY CÙNG ASTRONUMER KHÁM PHÁ HÀNH TRÌNH VÀ BẢN THÂN BẠN GIỮA CÁC VÌ SAO VÀ NHỮNG CON SỐ
                        </Text>
                    </Stack>

                </Stack>


            </HStack>

            <Stack>
                <Heading fontSize={40} lineHeight={1.6}>
                    TẠI SAO BẠN NÊN CHỌN ASTRONUMER?
                </Heading>
            </Stack>
            <HStack gap={40} textAlign={'center'}>
                <Stack align={'center'}>
                    <Image src="/images/arrow.png" width={'30%'} />
                    <Heading>
                        TRẢI NGHIỆM TRỌN VẸN
                    </Heading>
                    <Text>
                        CHÚ TRỌNG VÀO SỰ TRẢI NGHIỆM, CHÚNG MÌNH CUNG CẤP TRỌN VẸN CÁC DỊCH VỤ
                    </Text>
                </Stack>
                <Stack align={'center'}>
                    <Image src="/images/eyehand.png" width={'30%'} />
                    <Heading>
                        TRẢI NGHIỆM TRỌN VẸN
                    </Heading>
                    <Text>
                        CHÚ TRỌNG VÀO SỰ RIÊNG TƯ, CHÚNG MÌNH LUÔN ĐẶT QUYỀN LỢI KHÁCH HÀNG LÊN ĐẦU
                    </Text>
                </Stack>
                <Stack align={'center'}>
                    <Image src="/images/head.png" width={'30%'} />
                    <Heading>
                        BÊN BẠN MỌI LÚC MỌI NƠI
                    </Heading>
                    <Text>
                        CHÚ TRỌNG VÀO KHÁCH HÀNG, CHÚNG MÌNH LUÔN CÓ MẶT Ở MỌI THỜI ĐIỂM MÀ BẠN CẦN
                    </Text>
                </Stack>
            </HStack>
        </Stack>

    );
};

export default ThirdPage;