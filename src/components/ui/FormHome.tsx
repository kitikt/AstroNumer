import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormHome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    day: "DD",
    month: "MM",
    year: "YYYY",
    fullName: "",
  });

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

  const currentYear = new Date().getFullYear();
  const years = [
    "Năm",
    ...Array.from({ length: 100 }, (_, i) => String(currentYear - i)),
  ];

  const handleSelectChange = (
    field: "month" | "day" | "year",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      fullName: e.target.value,
    }));
  };

  const canContinueFromPage1 =
    formData.month !== "MM" &&
    formData.day !== "DD" &&
    formData.year !== "YYYY";
  const canContinueFromPage2 = formData.fullName.trim().length > 0;

  const handleContinue = async () => {
    localStorage.setItem("userInfo", JSON.stringify(formData));
    if (currentPage === 1 && canContinueFromPage1) {
      setCurrentPage(2);
    } else if (currentPage === 2 && canContinueFromPage2) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/numerology/calculate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              day: formData.day,
              month: formData.month,
              year: formData.year,
              fullName: formData.fullName,
            }),
          }
        );

        const result = await response.json();

        if (result.StatusCode === 200 && result.Success) {
          localStorage.setItem("numerologyData", JSON.stringify(result.Data));
          console.log("Numerology data saved successfully!", result.Data);

          navigate("/numerology");
        } else {
          console.error("API call failed:", result.Message);
          alert("Có lỗi xảy ra khi tính toán số học. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("Error calling API:", error);
        alert("Đã có lỗi xảy ra. Vui lòng kiểm tra kết nối và thử lại!");
      }
    }
  };

  const handleBack = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent any default behavior (e.g., form submission if wrapped in a form)
      if (currentPage === 1 && canContinueFromPage1) {
        handleContinue();
      } else if (currentPage === 2 && canContinueFromPage2) {
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

  const primaryButtonStyle = {
    width: "100%",
    padding: "16px",
    backgroundColor:
      canContinueFromPage1 || canContinueFromPage2 ? "#18181B" : "#9ca3af",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor:
      canContinueFromPage1 || canContinueFromPage2 ? "pointer" : "not-allowed",
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
      {/* Page 1: Birthday */}
      {currentPage === 1 && (
        <div>
          <h1 style={titleStyle}>
            Cho Chúng Tớ Xin Ngày Tháng Năm Sinh Của Bạn !
          </h1>
          <p style={descriptionStyle}>
            Chúng tớ sử dụng thông tin này để xác minh độ tuổi và cá nhân hóa
            trải nghiệm của bạn. Chúng tớ cam kết không chia sẻ ngày sinh của
            bạn công khai nếu không có sự cho phép từ bạn.
          </p>

          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
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

          <button
            onClick={handleContinue}
            disabled={!canContinueFromPage1}
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              if (canContinueFromPage1) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#7c2d12";
              }
            }}
            onMouseLeave={(e) => {
              if (canContinueFromPage1) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#181a1b";
              }
            }}
          >
            Tiếp Tục
          </button>
        </div>
      )}

      {currentPage === 2 && (
        <div>
          <h1 style={titleStyle}>Cho Chúng Tớ Xin Tên Đầy Đủ Của Bạn</h1>
          <p style={descriptionStyle}>
            Nhập đầy đủ họ tên của bạn (giống trên giấy tờ tùy thân nhé!) Thông
            tin này giúp tụi mình xác minh danh tính và mang đến trải nghiệm phù
            hợp hơn cho bạn.
          </p>

          <input
            type="text"
            placeholder="Nhập tên đầy đủ của bạn"
            value={formData.fullName}
            onChange={handleInputChange}
            style={inputStyle}
          />

          <button
            onClick={handleContinue}
            disabled={!canContinueFromPage2}
            style={{
              ...primaryButtonStyle,
              backgroundColor: canContinueFromPage2 ? "#18181B" : "#9ca3af",
              cursor: canContinueFromPage2 ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (canContinueFromPage2) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#7c2d12";
              }
            }}
            onMouseLeave={(e) => {
              if (canContinueFromPage2) {
                (e.target as HTMLButtonElement).style.backgroundColor =
                  "#181a1b";
              }
            }}
          >
            Tiếp Tục
          </button>

          <button onClick={handleBack} style={secondaryButtonStyle}>
            Quay Lại
          </button>
        </div>
      )}
    </div>
  );
};

export default FormHome;
