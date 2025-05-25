import { Flex, Spinner, Text } from "@chakra-ui/react"

const Loading = () => {
    return (
        <Flex
            m={'auto'}
            gap={10}
            align='center'
            justify='center'
        >
            <Spinner w='50px' h='50px' />
            <Text fontSize='20px'>Vui lòng chờ...</Text>
        </Flex>
    )
}

export default Loading