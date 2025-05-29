import React, { useState, useEffect } from "react";
import Divider from "@/components/Divider";

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

      // Fetch keywords for each number
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
          // Lấy dữ liệu từ free_version
          const summary =
            result.Data?.free_version?.summary || "Không có tóm tắt";
          const highlight =
            result.Data?.free_version?.highlight || "Không có điểm nổi bật";
          const fullDescription = `${summary}\n\nĐiểm nổi bật: ${highlight}`; // Kết hợp summary và highlight

          const updatedItem = {
            ...item,
            fullDescription,
          };
          setSelectedItem(updatedItem);

          // Cập nhật numerologyData để lưu fullDescription
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
      setSelectedItem(item); // Nếu đã có mô tả, sử dụng nó
    }
  };

  return (
    <div className="!w-full !px-6 !py-10 !text-center">
      {error && <div className="!text-red-600 !mb-4">{error}</div>}
      <div className="!mb-12">
        <h2 className="!text-4xl !text-indigo-700">KẾT QUẢ THẦN SỐ HỌC</h2>
        <p className="!mt-6 !text-white !max-w-2xl !mx-auto">
          Đây là phân tích chuyên sâu dựa trên thông tin cá nhân của bạn. Mỗi
          con số tiết lộ một khía cạnh quan trọng trong cuộc sống và hành trình
          phát triển bản thân.
        </p>
      </div>

      <Divider />

      <div className="!mt-12 !grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6">
        {numerologyData.map((item, idx) => (
          <div
            key={idx}
            className="!border !rounded-2xl !p-6 !shadow hover:!shadow-lg !transition !duration-300 !flex !flex-col !items-center !bg-white !text-black"
          >
            <p className="!text-lg !font-semibold !text-indigo-700 !mb-2 !text-center">
              {item.title}
            </p>
            <p className="!text-3xl !font-bold !text-indigo-600 !mb-2 !text-center">
              {item.value}
            </p>
            <p className="!text-sm !text-gray-700 !text-center">
              {item.keyword}
            </p>

            <button
              onClick={() => handleOpenModal(item)}
              className="!mt-4 !text-indigo-600 !text-sm hover:!underline"
            >
              Nhấn để xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="!fixed !inset-0 !bg-black !bg-opacity-50 !flex !items-center !justify-center !z-50">
          <div className="!bg-white !p-6 !rounded-xl !max-w-md !w-full !text-left">
            <h3 className="!text-xl !font-bold !text-indigo-700 !mb-4">
              {selectedItem.title}
            </h3>
            <p className="!text-3xl !font-bold !text-indigo-600 !mb-2 !text-center">
              {selectedItem.value}
            </p>
            <p className="!text-gray-700 !text-sm">
              {selectedItem.fullDescription || "Đang tải..."}
            </p>
            <button
              onClick={() => setSelectedItem(null)}
              className="!mt-6 !bg-indigo-600 !text-white !px-4 !py-2 !rounded hover:!bg-indigo-700 !transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumerologyResultPage;
