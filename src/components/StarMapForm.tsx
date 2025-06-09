import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StarMapForm: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    day: "DD",
    month: "MM",
    year: "YYYY",
    hour: "HH",
    minute: "MM",
    fullName: "",
    placeOfBirth: "",
    isCustomPlace: false,
  });

  useEffect(() => {
    setError(null);
  }, [currentPage]);

  const months = [
    "Tháng",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const days = [
    "Ngày",
    ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")),
  ];

  const currentYear = 2025;
  const years = [
    "Năm",
    ...Array.from({ length: 100 }, (_, i) => String(currentYear - i)),
  ];

  const hours = [
    "Giờ",
    ...Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")),
  ];

  const minutes = [
    "Phút",
    ...Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")),
  ];

  const provinces = [
    "Nơi sinh",
    "An Giang",
    "Bà Rịa – Vũng Tàu",
    "Bạc Liêu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Dương",
    "Bình Định",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Cần Thơ",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "TP Hồ Chí Minh",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lạng Sơn",
    "Lào Cai",
    "Lâm Đồng",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
    "Khác",
  ];

  const handleSelectChange = (
    field: "month" | "day" | "year" | "hour" | "minute" | "placeOfBirth",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "placeOfBirth" && { isCustomPlace: value === "Khác" }),
    }));
    setError(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "fullName" | "placeOfBirth"
  ) => {
    const value = e.target.value;
    let normalizedValue = value;

    if (field === "placeOfBirth") {
      const lowerCaseProvinces = provinces.map((p) => p.toLowerCase());
      const lowerCaseValue = value.toLowerCase();
      const index = lowerCaseProvinces.indexOf(lowerCaseValue);
      if (
        index !== -1 &&
        provinces[index] !== "Nơi sinh" &&
        provinces[index] !== "Khác"
      ) {
        normalizedValue = provinces[index];
      } else {
        normalizedValue = value
          .toLowerCase()
          .replace(/(^|\s)\w/g, (char) => char.toUpperCase());
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: normalizedValue,
    }));
    setError(null);
  };

  const canContinueFromPage1 =
    formData.month !== "MM" &&
    formData.day !== "DD" &&
    formData.year !== "YYYY" &&
    formData.hour !== "HH" &&
    formData.minute !== "MM" &&
    formData.month !== "Tháng" &&
    formData.day !== "Ngày" &&
    formData.year !== "Năm" &&
    formData.hour !== "Giờ" &&
    formData.minute !== "Phút";

  const canContinueFromPage2 =
    formData.fullName.trim().length > 0 &&
    formData.placeOfBirth !== "" &&
    formData.placeOfBirth !== "Nơi sinh";

  const handleContinue = async () => {
    if (currentPage === 1 && canContinueFromPage1) {
      setCurrentPage(2);
    } else if (currentPage === 2 && canContinueFromPage2) {
      setLoading(true);
      setError(null);

      try {
        if (!import.meta.env.VITE_API_URL) {
          throw new Error(
            "Biến môi trường VITE_API_URL không được định nghĩa!"
          );
        }

        const birthDateTime = new Date(
          `${formData.year}-${formData.month}-${formData.day}T${formData.hour}:${formData.minute}:00+07:00`
        );

        if (isNaN(birthDateTime.getTime())) {
          setError("Ngày giờ sinh không hợp lệ. Vui lòng kiểm tra lại!");
          setLoading(false);
          return;
        }

        const birthTimeUtc = birthDateTime.toISOString();

        console.log("Request body:", {
          BirthTimeUtc: birthTimeUtc,
          PlaceOfBirth: formData.placeOfBirth,
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/birth-chart/chart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              BirthTimeUtc: birthTimeUtc,
              PlaceOfBirth: formData.placeOfBirth,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Yêu cầu API thất bại với mã trạng thái ${response.status}: ${errorText}`
          );
        }

        const result = await response.json();
        console.log("API response:", result);

        // Kiểm tra cấu trúc API mới với Data
        if (result.Success && result.Data) {
          const starMapData = result.Data;
          const isValidStarMapData =
            typeof starMapData === "object" &&
            starMapData !== null &&
            typeof starMapData.AscendantSign === "string" &&
            starMapData.AscendantSign.length > 0 &&
            typeof starMapData.PlanetInSigns === "object" &&
            starMapData.PlanetInSigns !== null &&
            Object.keys(starMapData.PlanetInSigns).length > 0 &&
            typeof starMapData.PlanetInHouses === "object" &&
            starMapData.PlanetInHouses !== null &&
            Object.keys(starMapData.PlanetInHouses).length > 0;

          if (isValidStarMapData) {
            // Lưu toàn bộ dữ liệu (formData + API response) vào localStorage
            const combinedData = {
              day: formData.day,
              month: formData.month,
              year: formData.year,
              hour: formData.hour,
              minute: formData.minute,
              fullName: formData.fullName,
              placeOfBirth: formData.placeOfBirth,
              isCustomPlace: formData.isCustomPlace,
              Ascendant: starMapData.Ascendant,
              AscendantSign: starMapData.AscendantSign,
              PlanetInSigns: starMapData.PlanetInSigns,
              PlanetInHouses: starMapData.PlanetInHouses,
            };
            localStorage.setItem("starMapData", JSON.stringify(combinedData));
            navigate("/starmap-result");
          } else {
            setError(
              `Dữ liệu từ API không hợp lệ. Vui lòng kiểm tra lại thông tin!`
            );
          }
        } else {
          setError(`Lỗi từ API: ${result.Message || "Dữ liệu không hợp lệ"}`);
        }
      } catch (error) {
        const errorMessage = (error as Error).message || "Lỗi không xác định";
        console.error("Error calling API:", errorMessage);
        setError(`Đã có lỗi xảy ra: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
      setError(null);
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        placeOfBirth: "",
        isCustomPlace: false,
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (currentPage === 1 && canContinueFromPage1) {
        handleContinue();
      } else if (currentPage === 2 && canContinueFromPage2 && !loading) {
        handleContinue();
      }
    }
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "448px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
    textAlign: "center",
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.6",
    textAlign: "center",
    marginBottom: "32px",
  };

  const selectStyle = {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "white",
    color: "#374151",
    outline: "none",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    marginBottom: "32px",
  };

  const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "16px",
  };

  const primaryButtonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor:
      (canContinueFromPage1 || canContinueFromPage2) && !loading
        ? "#18181B"
        : "#9ca3af",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor:
      (canContinueFromPage1 || canContinueFromPage2) && !loading
        ? "pointer"
        : "not-allowed",
    transition: "all 0.2s",
    marginBottom: "12px",
  };

  const secondaryButtonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor: "transparent",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "24px",
  };

  return (
    <div style={cardStyle} onKeyDown={handleKeyDown} tabIndex={0}>
      {error && <p style={errorStyle}>{error}</p>}

      {currentPage === 1 && (
        <div>
          <h1 style={titleStyle}>Cho Chúng Tớ Xin Ngày Giờ Sinh Của Bạn!</h1>
          <p style={descriptionStyle}>
            Chúng tớ sử dụng thông tin này để xác minh độ tuổi và cá nhân hóa
            trải nghiệm của bạn. Chúng tớ cam kết không chia sẻ thông tin này
            công khai nếu không có sự cho phép từ bạn.
          </p>

          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <select
              value={formData.day}
              onChange={(e) => handleSelectChange("day", e.target.value)}
              style={selectStyle}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            <select
              value={formData.month}
              onChange={(e) => handleSelectChange("month", e.target.value)}
              style={selectStyle}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={formData.year}
              onChange={(e) => handleSelectChange("year", e.target.value)}
              style={selectStyle}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            <select
              value={formData.hour}
              onChange={(e) => handleSelectChange("hour", e.target.value)}
              style={selectStyle}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>

            <select
              value={formData.minute}
              onChange={(e) => handleSelectChange("minute", e.target.value)}
              style={selectStyle}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleContinue}
            disabled={!canContinueFromPage1 || loading}
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              if (canContinueFromPage1 && !loading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#7c2d12";
              }
            }}
            onMouseLeave={(e) => {
              if (canContinueFromPage1 && !loading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#181a1b";
              }
            }}
          >
            {loading ? "Đang xử lý..." : "Tiếp Tục"}
          </button>
        </div>
      )}

      {currentPage === 2 && (
        <div>
          <h1 style={titleStyle}>Cho Chúng Tớ Xin Tên và Nơi Sinh Của Bạn</h1>
          <p style={descriptionStyle}>
            Nhập đầy đủ họ tên và nơi sinh của bạn (giống trên giấy tờ tùy thân
            nhé!) Thông tin này giúp tụi mình xác minh danh tính và mang đến
            trải nghiệm phù hợp hơn cho bạn.
          </p>

          <input
            type="text"
            placeholder="Nhập tên đầy đủ của bạn"
            value={formData.fullName}
            onChange={(e) => handleInputChange(e, "fullName")}
            style={inputStyle}
            disabled={loading}
          />

          {formData.isCustomPlace ? (
            <input
              type="text"
              placeholder="Nhập nơi sinh của bạn"
              value={formData.placeOfBirth}
              onChange={(e) => handleInputChange(e, "placeOfBirth")}
              style={inputStyle}
              disabled={loading}
            />
          ) : (
            <select
              value={formData.placeOfBirth}
              onChange={(e) =>
                handleSelectChange("placeOfBirth", e.target.value)
              }
              style={{ ...inputStyle, marginBottom: "32px" }}
              disabled={loading}
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleContinue}
            disabled={!canContinueFromPage2 || loading}
            style={{
              ...primaryButtonStyle,
              backgroundColor:
                canContinueFromPage2 && !loading ? "#18181B" : "#9ca3af",
              cursor:
                canContinueFromPage2 && !loading ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (canContinueFromPage2 && !loading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#7c2d12";
              }
            }}
            onMouseLeave={(e) => {
              if (canContinueFromPage2 && !loading) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#181a1b";
              }
            }}
          >
            {loading ? "Đang xử lý..." : "Tiếp Tục"}
          </button>

          <button
            onClick={handleBack}
            style={secondaryButtonStyle}
            disabled={loading}
          >
            Quay Lại
          </button>
        </div>
      )}
    </div>
  );
};

export default StarMapForm;
