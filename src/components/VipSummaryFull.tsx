import React from "react";
import { chakra, Box, Flex, Text, Icon } from "@chakra-ui/react";
import Divider from "@/components/Divider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { HiSparkles } from "react-icons/hi";

interface VipSummaryFullProps {
  content: string;
}

// Giải mã các ký tự HTML đã escape trong chuỗi content
const decodeEscaped = (text: string): string =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const VipSummaryFull: React.FC<VipSummaryFullProps> = ({ content }) => {
  const decoded = decodeEscaped(content);

  return (
    <Box
      w="full"
      p={{ base: 6, md: 8 }}
      bg="blackAlpha.600"      // nền đen hơi trong
      color="white"            // chữ trắng rõ
      borderLeft="4px solid"
      borderLeftColor="red.400" // accent đỏ
      borderRadius="lg"
      boxShadow="lg"
      textAlign="left"
      mb={8}
    >
      <Flex align="center" mb={4}>
        <Icon as={HiSparkles} boxSize={6} color="red.300" mr={2} />
        <Text fontSize="2xl" fontWeight="bold" color="red.300">
          🌟 Tóm tắt VIP
        </Text>
      </Flex>

      {/* Divider custom nếu Divider từ Chakra không tồn tại */}
      <Divider borderColor="whiteAlpha.300" mb={6} />
    

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <Text mb={4} lineHeight="tall">
              {children}
            </Text>
          ),
          ol: ({ children }) => (
            <chakra.ol
              mt={2}
              ml={6}
              mb={4}
              sx={{
                counterReset: "item",
                listStyle: "none",
                "& > li": {
                  counterIncrement: "item",
                  position: "relative",
                  paddingLeft: "1.5em",
                  marginBottom: 3,
                },
                "& > li::before": {
                  content: 'counter(item) "."',
                  position: "absolute",
                  left: 0,
                  color: "red.400",   // marker đỏ
                  fontWeight: "bold",
                },
              }}
            >
              {children}
            </chakra.ol>
          ),
          ul: ({ children }) => (
            <chakra.ul
              mt={2}
              ml={6}
              mb={4}
              sx={{ listStyleType: "disc", "& > li::marker": { color: "red.400" } }}
            >
              {children}
            </chakra.ul>
          ),
          li: ({ children }) => (
            <Text as="li" mb={2}>
              {children}
            </Text>
          ),
          strong: ({ children }) => (
            <Text as="strong" color="red.400">
              {children}
            </Text>
          ),
        }}
      >
        {decoded}
      </ReactMarkdown>
    </Box>
  );
};

export default VipSummaryFull;
