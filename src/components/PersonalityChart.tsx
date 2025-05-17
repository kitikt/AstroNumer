// PersonalityChart.tsx
import { Box, Text, VStack } from "@chakra-ui/react";

const personalityLabels = [
  "MẠNH MẼ - ĐỘC LẬP - TỰ TIN",
  "LẮNG NGHE - KHÉO LÉO - NHẠY CẢM",
  "SÁNG TẠO - HOẠT BÁT - LẠC QUAN",
  "CẨN THẬN - CẦU TOÀN - THỰC TẾ",
  "QUAN TÂM - YÊU THƯƠNG - KIỂM SOÁT",
];

const PersonalityChart = ({ data }: { data: number[] }) => {
  return (
    <VStack align="start" w="100%">
      {data.map((value, idx) => (
        <Box key={idx} w="100%">
          <Text fontWeight="bold" mb={2}>
            {personalityLabels[idx]}
          </Text>
          {/* Outer bar */}
          <Box
            w="100%"
            bg="gray.200"
            borderRadius="md"
            h="12px"
            overflow="hidden"
          >
            {/* Inner fill */}
            <Box
              w={`${value}%`}
              bg="purple.500"
              h="100%"
              transition="width 0.6s ease"
            />
          </Box>
        </Box>
      ))}
    </VStack>
  );
};

export default PersonalityChart;
