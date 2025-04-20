import { Badge, Box, Button, Heading, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react"
import styles from '@/styles/SecondPage.module.css';
import { Link } from "react-router-dom";

const FourthPage = () => {

    const data = {
        imageUrl: "",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        title: "Modern home in city center in the heart of historic Los Angeles",
        formattedPrice: "$435",
        reviewCount: 34,
        rating: 4.5,
    }
    return (
        // <Box maxW="sm" borderWidth="1px">
        //     <Image src={data.imageUrl} alt={data.imageAlt} />

        //     <Box p="4" spaceY="2">
        //         <HStack>
        //             <Badge colorPalette="teal" variant="solid">
        //                 Superhost
        //             </Badge>
        //             <HStack gap="1" fontWeight="medium">
        //                 <Icon color="orange.400">
        //                     <HiStar />
        //                 </Icon>
        //                 <Text>
        //                     {data.rating} ({data.reviewCount})
        //                 </Text>
        //             </HStack>
        //         </HStack>
        //         <Text fontWeight="medium" color="fg">
        //             {data.title}
        //         </Text>
        //         <HStack color="fg.muted">
        //             {data.formattedPrice} • {data.beds} beds
        //         </HStack>
        //     </Box>
        // </Box>
        <HStack width={'100%'} gap={20} padding={20} flex={1} align={"center"} >
            <Stack gap={10} >
                <Heading fontSize={50} lineHeight={1.6} mt={20}>
                    TƯƠNG TÁC CÙNG AI
                </Heading>
                <Text  >Là AI độc quyền của Astronumer, như một trợ lý thay thế chúng mình ở bên bạn mọi lúc.  </Text>
                <Text>

                    Được đào tạo riêng để giải quyết các vấn đề liên quan đến Thần số học và Bản đồ sao
                    Có tính năng xem Tarot và Cung hoàng đạo hàng ngày</Text>
            </Stack>
            <Stack gap={5} width={'100%'} align={'center'} mt={20} >
                <HStack justifyContent="center" >
                    <Image src={'/images/testimage.png'} alt={data.imageAlt} width={'50%'} />

                </HStack>
                <Heading >ASTRONUMER</Heading>
                <Link to="/login" >
                    <Button color={'8a2be2'}>Đăng Nhập</Button>
                </Link>

            </Stack>

        </HStack >
    )
}


export default FourthPage;