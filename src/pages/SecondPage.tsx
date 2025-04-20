import { Badge, Box, Heading, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react"
import styles from '@/styles/SecondPage.module.css';

const SecondPage = () => {

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

        <HStack width={'100%'} gap={20} padding={20} className={styles.autoRotate}>
            <Stack flex={1} gap={16}>
                <Heading fontSize={60} lineHeight={1.6} >
                    CHÚNG MÌNH LÀ
                </Heading>
                <Text  >Nơi giao mã những bí ẩn cuộc đời qua Thần Số Học, Bàn
                    Đồ Sao và Tarot. Khám phá con số vận mệnh, hành trình
                    chiêm tinh và những thông điệp từ vũ trụ để hiểu hiện
                    bản thân sâu sắc hơn. Hãy để chúng tôi giúp bạn tìm ra
                    hướng đi và khám mở tiềm năng ẩn giấu!</Text>
            </Stack>
            <Stack flex={1} gap={5} align={'center'}>
                <HStack gap={10} >
                    <Image src={'/images/testimage.png'} alt={data.imageAlt} width={'40%'} flex={1} />
                    <Image src={'/images/testimage.png'} alt={data.imageAlt} width={'40%'} flex={1} />
                </HStack>
                <Heading fontSize={60} lineHeight={1.6} >ASTRONUMER</Heading>


            </Stack>

        </HStack >
    )
}


export default SecondPage;