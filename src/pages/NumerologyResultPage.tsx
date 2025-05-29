import React, { useState, useEffect } from "react";
import { Box, Text, Grid, Button } from "@chakra-ui/react";
import Divider from "@/components/Divider";
import "@/styles/NumerologyResultPage.css";

interface NumerologyResult {
  title: string;
  keyword: string;
  fullDescription?: string;
  value: string | number;
  apiEndpoint: string;
}

const NumerologyResultPage = () => {
  const [numerologyData, setNumerologyData] = useState<NumerologyResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<NumerologyResult | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("numerologyData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const initialNumerologyData: NumerologyResult[] = [
        {
          title: "Số Đường Đời (Life Path Number)",
          value: parsedData.LifePathNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/core-numbers/free/${
            parsedData.LifePathNumber || 0
          }`,
        },
        {
          title: "Số Định Mệnh (Destiny Number)",
          value: parsedData.DestinyNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/destiny-numbers/${
            parsedData.DestinyNumber || 0
          }`,
        },
        {
          title: "Số Linh Hồn (Soul Urge Number)",
          value: parsedData.SoulUrgeNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/core-numbers/free/${
            parsedData.SoulUrgeNumber || 0
          }`,
        },
        {
          title: "Số Nhân Cách (Personality Number)",
          value: parsedData.PersonalityNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/core-numbers/free/${
            parsedData.PersonalityNumber || 0
          }`,
        },
        {
          title: "Số Ngày Sinh (Birthday Number)",
          value: parsedData.BirthdayNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/core-numbers/free/${
            parsedData.BirthdayNumber || 0
          }`,
        },
        {
          title: "Số Trưởng Thành (Maturity Number)",
          value: parsedData.MaturityNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/core-numbers/free/${
            parsedData.MaturityNumber || 0
          }`,
        },
        {
          title: "Số Thử Thách (Challenge Numbers)",
          value: parsedData.ChallengeNumbers || "N/A",
          keyword: "",
          apiEndpoint:
            parsedData.ChallengeNumbers && parsedData.ChallengeNumbers !== "N/A"
              ? `/api/v1/numerology/destiny-numbers/${parsedData.ChallengeNumbers}`
              : "",
        },
      ];

      const fetchKeywords = async () => {
        try {
          const updatedData = await Promise.all(
            initialNumerologyData.map(async (item) => {
              if (!item.apiEndpoint || item.value === "N/A") {
                return { ...item, keyword: "Không có dữ liệu" };
              }
              try {
                const response = await fetch(
                  `${import.meta.env.VITE_API_URL}${item.apiEndpoint}`
                );
                if (!response.ok) {
                  throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
                }
                const result = await response.json();
                if (result.StatusCode === 200 && result.Success) {
                  return {
                    ...item,
                    keyword: result.Data?.keyword || result.Data?.Keyword,
                  };
                }
                return { ...item, keyword: "Lỗi khi tải dữ liệu" };
              } catch (error) {
                console.error(`Lỗi khi lấy từ khóa cho ${item.title}:`, error);
                return { ...item, keyword: "Lỗi khi tải dữ liệu" };
              }
            })
          );
          setNumerologyData(updatedData);
        } catch (error) {
          console.error("Lỗi tổng quát khi lấy dữ liệu:", error);
          setError("Không thể tải dữ liệu thần số học. Vui lòng thử lại sau.");
        }
      };

      fetchKeywords();
    }
  }, []);

  const handleOpenModal = async (item: NumerologyResult) => {
    if (!item.fullDescription) {
      try {
        if (!item.apiEndpoint || item.value === "N/A") {
          setSelectedItem({
            ...item,
            fullDescription: "Không có dữ liệu chi tiết",
          });
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}${item.apiEndpoint}`
        );
        if (!response.ok) {
          throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
        }
        const result = await response.json();
        if (result.StatusCode === 200 && result.Success) {
          const summary =
            result.Data?.free_version?.summary || "Không có tóm tắt";
          const highlight =
            result.Data?.free_version?.highlight || "Không có điểm nổi bật";
          const fullDescription = `${summary}\n\nĐiểm nổi bật: ${highlight}`;

          const updatedItem = { ...item, fullDescription };
          setSelectedItem(updatedItem);

          setNumerologyData((prevData) =>
            prevData.map((dataItem) =>
              dataItem.title === item.title ? updatedItem : dataItem
            )
          );
        } else {
          setSelectedItem({
            ...item,
            fullDescription: "Lỗi khi tải mô tả chi tiết",
          });
        }
      } catch (error) {
        console.error(`Lỗi khi lấy mô tả chi tiết cho ${item.title}:`, error);
        setSelectedItem({
          ...item,
          fullDescription: "Lỗi khi tải mô tả chi tiết",
        });
      }
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <Box w="full" px={6} py={10} textAlign="center">
      {error && (
        <Text color="red.600" mb={4}>
          {error}
        </Text>
      )}
      <Box mb={12}>
        <Text fontSize="4xl" color="indigo.700">
          KẾT QUẢ THẦN SỐ HỌC
        </Text>
        <Text mt={6} color="white" maxW="2xl" mx="auto">
          Đây là phân tích chuyên sâu dựa trên thông tin cá nhân của bạn. Mỗi
          con số tiết lộ một khía cạnh quan trọng trong cuộc sống và hành trình
          phát triển bản thân.
        </Text>
      </Box>

      <Divider />

      <Grid
        mt={12}
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {numerologyData.map((item, idx) => (
          <Box
            key={idx}
            borderWidth={1}
            borderRadius="2xl"
            p={6}
            shadow="md"
            _hover={{ shadow: "lg" }}
            transition="all 0.3s"
            bg="transparent"
            backdropFilter="blur(20px)"
            color="black"
            textAlign="center"
          >
            <Text fontSize="lg" fontWeight="semibold" color="pink.200" mb={2}>
              {item.title}
            </Text>
            <Text fontSize="3xl" fontWeight="bold" color="purple.300" mb={2}>
              {item.value}
            </Text>
            <Text fontSize="sm" color="red.400">
              {item.keyword}
            </Text>
            <Button
              mt={4}
              variant="link"
              color="white"
              fontSize="sm"
              _hover={{ textDecoration: "underline" }}
              onClick={() => handleOpenModal(item)}
            >
              Nhấn để xem chi tiết
            </Button>
          </Box>
        ))}
      </Grid>

      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{selectedItem.title}</h3>
            <div className="modal-value-container">
              <p className="modal-value">{selectedItem.value}</p>
            </div>
            <p className="modal-description">
              {selectedItem.fullDescription || "Đang tải..."}
            </p>
            <button
              className="modal-close-button"
              onClick={() => setSelectedItem(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </Box>
  );
};

export default NumerologyResultPage;
