import React, { useState, useEffect } from "react";
import { Box, Text, Grid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Divider from "@/components/Divider";
import "@/styles/NumerologyResultPage.css";

// Mock API response for Destiny Number 1
const mockApiResponse = {
  StatusCode: 200,
  Success: true,
  Message: "Lấy thông tin số định mệnh 1 thành công",
  Data: {
    Number: 1,
    Keyword: "Lãnh đạo",
    Career: "Doanh nhân, nhà cải cách, quản lý cấp cao, sáng lập startup",
    Mission: "Dẫn dắt, truyền cảm hứng và khơi nguồn sáng tạo mới",
    Traits: "Quyết đoán, có ý chí mạnh mẽ, định hướng rõ ràng",
    Lesson: "Tin tưởng vào bản thân, biết cách lãnh đạo không độc đoán",
    Challenges: "Cứng đầu, ích kỷ, ngại hợp tác",
  },
  Errors: [],
  TraceId: "0HND2ADQH5RER:00000001",
  Meta: null,
};

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
  const navigate = useNavigate(); // Initialize useNavigate
  const [vipAnalysis, setVipAnalysis] = useState<Record<string, string>>({});

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
          apiEndpoint: `/api/v1/numerology/soul-urge-numbers/${
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
          apiEndpoint: `/api/v1/numerology/birthday-numbers/${
            parsedData.BirthdayNumber || 0
          }`,
        },
        {
          title: "Số Trưởng Thành (Maturity Number)",
          value: parsedData.MaturityNumber || 0,
          keyword: "",
          apiEndpoint: `/api/v1/numerology/maturity-numbers/${
            parsedData.MaturityNumber || 0
          }`,
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
                // Simulate API call for Destiny Number 1
                if (
                  item.title === "Số Định Mệnh (Destiny Number)" &&
                  item.value === 1
                ) {
                  return {
                    ...item,
                    keyword: mockApiResponse.Data.Keyword || "Không có từ khóa",
                  };
                }
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
                    keyword:
                      result.Data?.keyword ||
                      result.Data?.Keyword ||
                      "Không có từ khóa",
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

    const vip = localStorage.getItem("numerologyVipAnalysis");
    if (vip) {
      setVipAnalysis(JSON.parse(vip));
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

        let result;
        // Use mock API response for Destiny Number 1
        if (
          item.title === "Số Định Mệnh (Destiny Number)" &&
          item.value === 1
        ) {
          result = mockApiResponse;
        } else {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}${item.apiEndpoint}`
          );
          if (!response.ok) {
            throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
          }
          result = await response.json();
        }

        if (result.StatusCode === 200 && result.Success) {
          let fullDescription = "";

          if (item.title === "Số Định Mệnh (Destiny Number)") {
            const { Mission, Traits, Lesson, Challenges, Career } = result.Data;

            fullDescription = `
🎯 Sứ mệnh: ${Mission}

🧬 Đặc điểm tính cách: ${Traits}

📚 Bài học cuộc sống: ${Lesson}

⚠️ Thử thách cá nhân: ${Challenges}

💼 Nghề nghiệp phù hợp: ${Career}
  `.trim();
          } else if (item.title === "Số Linh Hồn (Soul Urge Number)") {
            const { Description, inner_motivation, Challenges, deep_analysis } =
              result.Data;

            fullDescription = `
📝 Mô tả tổng quan: ${Description}

💓 Động lực bên trong: ${inner_motivation}

⚠️ Thử thách nội tâm: ${Challenges}

🔍 Phân tích chuyên sâu: ${deep_analysis}
  `.trim();
          } else if (item.title === "Số Ngày Sinh (Birthday Number)") {
            const { Description, Challenge } = result.Data;

            fullDescription = `
📆 Ý nghĩa ngày sinh: ${Description}

⚠️ Thử thách cuộc đời: ${Challenge}
  `.trim();
          } else if (item.title === "Số Trưởng Thành (Maturity Number)") {
            const { Description } = result.Data;

            fullDescription = `
🌟 Ý nghĩa số trưởng thành: ${Description}
  `.trim();
          } else {
            const description = result.Data?.description || "Không có mô tả";
            const summary =
              result.Data?.free_version?.summary || "Không có mô tả";
            const highlight =
              result.Data?.free_version?.highlight || "Không có điểm nổi bật";
            const strength = result.Data?.strength || "Không có dữ liệu";
            const weakness = result.Data?.weakness || "Không có dữ liệu";

            fullDescription = `📘 Mô tả: ${description}

🔹 Tóm tắt: ${summary}

✨ Điểm nổi bật: ${highlight}

💪 Điểm mạnh: ${strength}

⚠️ Điểm yếu: ${weakness}
  `;
          }

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

  // Function to clear localStorage and navigate to form
  const handleRecalculate = () => {
    localStorage.removeItem("numerologyData"); // Clear numerology data
    localStorage.removeItem("userInfo"); // Clear user info
    navigate("/form/numerology"); // Navigate to the form page
  };

  const typeNameMap: Record<string, number> = {
    "Số Đường Đời (Life Path Number)": 0,
    "Số Định Mệnh (Destiny Number)": 1,
    "Số Linh Hồn (Soul Urge Number)": 2,
    "Số Nhân Cách (Personality Number)": 3,
    "Số Ngày Sinh (Birthday Number)": 4,
    "Số Trưởng Thành (Maturity Number)": 5,
    Summary: 6,
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

      {/* Add Recalculate Button */}
      <Box mt={8}>
        <Button colorScheme="teal" size="lg" onClick={handleRecalculate}>
          Tra Cứu Lại
        </Button>
      </Box>

      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">{selectedItem.title}</h3>
            <div className="modal-value-container">
              <p className="modal-value">{selectedItem.value}</p>
            </div>
            <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid #eee",
                  paddingRight: 16,
                }}
              >
                <h4 style={{ color: "#6366f1", marginBottom: 8 }}>
                  Phân tích thường
                </h4>
                <p className="modal-description">
                  {selectedItem.fullDescription || "Đang tải..."}
                </p>
              </div>
              {vipAnalysis &&
                typeof typeNameMap[selectedItem.title] !== "undefined" &&
                vipAnalysis[typeNameMap[selectedItem.title]] && (
                  <div style={{ flex: 1, paddingLeft: 16 }}>
                    <h4 style={{ color: "#f59e42", marginBottom: 8 }}>
                      Phân tích VIP
                    </h4>
                    <p className="modal-description">
                      {vipAnalysis[typeNameMap[selectedItem.title]]}
                    </p>
                  </div>
                )}
            </div>
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
