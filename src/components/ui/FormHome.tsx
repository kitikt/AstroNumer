import React, { useState } from "react";

interface FormHomeProps {
  onClose: () => void;
  onSubmit: () => void;
}

const FormHome: React.FC<FormHomeProps> = ({ onClose, onSubmit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    month: "MM",
    day: "DD",
    year: "YYYY",
    fullName: "",
  });

  const months = [
    "MM",
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
    "DD",
    ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")),
  ];

  const currentYear = new Date().getFullYear();
  const years = [
    "YYYY",
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
        // Gọi API
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

        // Kiểm tra nếu API trả về thành công
        if (result.StatusCode === 200 && result.Success) {
          // Lưu dữ liệu từ API vào localStorage
          localStorage.setItem("numerologyData", JSON.stringify(result.Data));
          console.log("Numerology data saved successfully!", result.Data);

          // Gọi onSubmit để đóng form
          onSubmit();
        } else {
          // Xử lý lỗi nếu API thất bại
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

  const linkButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "underline",
  };

  return (
    <div style={cardStyle}>
      {/* Page 1: Birthday */}
      {currentPage === 1 && (
        <div>
          <h1 style={titleStyle}>When's your birthday</h1>
          <p style={descriptionStyle}>
            We use this information for age verification and to personalize your
            experience. We won't share your birthday publicly without your
            permission.
          </p>

          <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
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
            Continue
          </button>

          <div style={{ textAlign: "center" }}>
            <button onClick={onClose} style={linkButtonStyle}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Page 2: Full Name */}
      {currentPage === 2 && (
        <div>
          <h1 style={titleStyle}>What's your full name</h1>
          <p style={descriptionStyle}>
            Please enter your full name as it appears on your official
            documents. This helps us verify your identity and personalize your
            experience.
          </p>

          <input
            type="text"
            placeholder="Enter your full name"
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
            Continue
          </button>

          <button onClick={handleBack} style={secondaryButtonStyle}>
            Back
          </button>

          <div style={{ textAlign: "center" }}>
            <button onClick={onClose} style={linkButtonStyle}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormHome;
