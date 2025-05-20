import { useState, useEffect } from "react";
import { Box, Flex, Text, Link, HStack } from "@chakra-ui/react";

const LatestArticlesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const articles = [
    {
      id: 1,
      title: "[TIÊU ĐỀ BÀI VIẾT]",
      sapo: "[Sapo]",
      image: "/images/image37.png",
      link: "#",
    },
    {
      id: 2,
      title: "[TIÊU ĐỀ BÀI VIẾT]",
      sapo: "[Sapo]",
      image: "/images/image4.png",
      link: "#",
    },
    {
      id: 3,
      title: "[TIÊU ĐỀ BÀI VIẾT]",
      sapo: "[Sapo]",
      image: "/images/image5.png",
      link: "#",
    },
    {
      id: 4,
      title: "[TIÊU ĐỀ BÀI VIẾT]",
      sapo: "[Sapo]",
      image: "/images/thansohoc.png",
      link: "#",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  const showArticles = () => {
    const visibleArticles = [];
    for (let i = 0; i < 4; i++) {
      const index = (currentIndex + i) % articles.length;
      visibleArticles.push(articles[index]);
    }
    return visibleArticles;
  };

  return (
    <Box w="full" mt={8}>
      <Flex justifyContent="center">
        <HStack justifyContent="center" maxW="1200px" overflow="hidden">
          {showArticles().map((article) => (
            <Box
              key={article.id}
              w="270px"
              borderRadius="lg"
              overflow="hidden"
              bg="purple.900"
              position="relative"
            >
              <Box
                bgImage={`url(${article.image})`}
                bgSize="cover"
                w="full"
                h="200px"
                borderRadius="lg"
              />
              <Box p={4}>
                <Text fontSize="lg" fontWeight="bold" color="white" mb={2}>
                  {article.title}
                </Text>
                <Flex justify="space-between" align="center">
                  <Text color="gray.300">{article.sapo}</Text>
                  <Link color="blue.300" href={article.link}>
                    xem thêm
                  </Link>
                </Flex>
              </Box>
            </Box>
          ))}
        </HStack>
      </Flex>

      {/* Navigation dots */}
      <Flex justify="center" mt={4}>
        {articles.map((_, index) => (
          <Box
            key={index}
            w={2}
            h={2}
            borderRadius="full"
            bg={currentIndex === index ? "blue.500" : "gray.400"}
            mx={1}
            cursor="pointer"
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default LatestArticlesCarousel;
