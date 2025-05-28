import React, { useState, useEffect } from "react";
import Divider from "@/components/Divider";

interface NumerologyResult {
  title: string;
  description: string;
  value: string | number;
}

const NumerologyResultPage = () => {
  const [numerologyData, setNumerologyData] = useState<NumerologyResult[]>([]);
  const [selectedItem, setSelectedItem] = useState<NumerologyResult | null>(
    null
  );

  // Lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const storedData = localStorage.getItem("numerologyData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const updatedNumerologyData: NumerologyResult[] = [
        {
          title: "Số Đường Đời (Life Path Number)",
          value: parsedData.LifePathNumber || 0,
          description:
            "Mục đích sống và bài học chính trong cuộc đời. Đây là con số nền tảng tiết lộ con đường bạn nên đi và những bài học bạn cần trải qua.",
        },
        {
          title: "Số Định Mệnh (Destiny Number)",
          value: parsedData.DestinyNumber || 0,
          description:
            "Tiềm năng, khả năng và con đường phát triển trong cuộc đời. Con số này cho thấy bạn có thể trở thành ai và bạn cần phát triển điều gì.",
        },
        {
          title: "Số Linh Hồn (Soul Urge Number)",
          value: parsedData.SoulUrgeNumber || 0,
          description:
            "Mong muốn sâu thẳm, động lực nội tâm. Đây là tiếng gọi từ trái tim bạn, điều bạn thật sự khao khát.",
        },
        {
          title: "Số Nhân Cách (Personality Number)",
          value: parsedData.PersonalityNumber || 0,
          description:
            "Cách bạn được người khác nhìn nhận, hình ảnh bạn thể hiện ra bên ngoài.",
        },
        {
          title: "Số Ngày Sinh (Birthday Number)",
          value: parsedData.BirthdayNumber || 0,
          description:
            "Tài năng và điểm mạnh bẩm sinh, những gì bạn mang theo từ lúc mới sinh.",
        },
        {
          title: "Số Trưởng Thành (Maturity Number)",
          value: parsedData.MaturityNumber || 0,
          description:
            "Thành tựu và sự phát triển khi trưởng thành. Đây là những gì bạn sẽ đạt được khi trải nghiệm đủ các bài học cuộc sống.",
        },
        {
          title: "Số Thử Thách (Challenge Numbers)",
          value: parsedData.ChallengeNumbers || "N/A",
          description:
            "Những khó khăn chính trong các giai đoạn cuộc đời, cho thấy những bài học khó nhằn bạn cần vượt qua.",
        },
      ];
      setNumerologyData(updatedNumerologyData);
    }
  }, []);

  return (
    <div className="!w-full !px-6 !py-10 !text-center">
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
              {item.description}
            </p>

            <button
              onClick={() => setSelectedItem(item)}
              className="!mt-4 !text-indigo-600 !text-sm hover:!underline"
            >
              Nhấn để xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {/* Modal hiển thị chi tiết */}
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
              {selectedItem.description}
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
