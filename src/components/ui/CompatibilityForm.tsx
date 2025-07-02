import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkVipStatus } from "@/services/vipService";
import VipRequiredModal from "@/components/VipRequiredModal";
import { isVipError } from "@/utils/vipUtils";

type CompatibilityResult = {
  StatusCode: number;
  Success: boolean;
  Message?: string;
  Data?: string | Record<string, unknown>;
};

const days = [
  "Ngày",
  ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")),
];
const months = [
  "Tháng",
  ...Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
];
const currentYear = new Date().getFullYear();
const years = [
  "Năm",
  ...Array.from({ length: 100 }, (_, i) => String(currentYear - i)),
];

const CompatibilityForm: React.FC = () => {
  const [birthday1, setBirthday1] = useState({
    day: "Ngày",
    month: "Tháng",
    year: "Năm",
  });
  const [birthday2, setBirthday2] = useState({
    day: "Ngày",
    month: "Tháng",
    year: "Năm",
  });
  const [loading, setLoading] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);
  const navigate = useNavigate();

  const canSubmit =
    birthday1.day !== "Ngày" &&
    birthday1.month !== "Tháng" &&
    birthday1.year !== "Năm" &&
    birthday2.day !== "Ngày" &&
    birthday2.month !== "Tháng" &&
    birthday2.year !== "Năm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để sử dụng tính năng này.");
        setLoading(false);
        return;
      }

      // Kiểm tra VIP status trước khi cho phép sử dụng
      const vipStatus = await checkVipStatus();
      if (!vipStatus.hasVipPackage) {
        setLoading(false);
        setShowVipModal(true);
        return;
      }
      const b1 = `${birthday1.year}-${birthday1.month}-${birthday1.day}`;
      const b2 = `${birthday2.year}-${birthday2.month}-${birthday2.day}`;
      const params = new URLSearchParams({
        birthday1: b1,
        birthday2: b2,
      });
      const response = await fetch(
        `https://astronumer.info.vn/api/v1/compatibility/analysis?${params.toString()}`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: CompatibilityResult = await response.json();

      // Kiểm tra nếu API trả về lỗi về gói VIP
      if (isVipError(response, data)) {
        setLoading(false);
        setShowVipModal(true);
        return;
      }

      let parsedData = data;
      if (typeof data.Data === "string") {
        try {
          parsedData = {
            ...data,
            Data: JSON.parse(
              data.Data.replace(/^```json\s*|```\s*$/g, "").trim()
            ),
          };
        } catch {
          console.error("Error parsing compatibility data");
        }
      }
      localStorage.setItem("compatibilityResult", JSON.stringify(parsedData));
      navigate("/form/compatibility/result");
    } catch {
      alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
    setLoading(false);
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

  return (
    <div
      style={{
        background: "white",
        borderRadius: 24,
        padding: 32,
        maxWidth: 500,
        margin: "40px auto",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      }}
    >
      <h1
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        Phân Tích Tương Hợp Cặp Đôi
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Ngày sinh của bạn:</label>
          <div style={{ display: "flex", gap: "12px", marginTop: 4 }}>
            <select
              value={birthday1.day}
              onChange={(e) =>
                setBirthday1({ ...birthday1, day: e.target.value })
              }
              style={selectStyle}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={birthday1.month}
              onChange={(e) =>
                setBirthday1({ ...birthday1, month: e.target.value })
              }
              style={selectStyle}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={birthday1.year}
              onChange={(e) =>
                setBirthday1({ ...birthday1, year: e.target.value })
              }
              style={selectStyle}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>Ngày sinh của đối phương:</label>
          <div style={{ display: "flex", gap: "12px", marginTop: 4 }}>
            <select
              value={birthday2.day}
              onChange={(e) =>
                setBirthday2({ ...birthday2, day: e.target.value })
              }
              style={selectStyle}
            >
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={birthday2.month}
              onChange={(e) =>
                setBirthday2({ ...birthday2, month: e.target.value })
              }
              style={selectStyle}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={birthday2.year}
              onChange={(e) =>
                setBirthday2({ ...birthday2, year: e.target.value })
              }
              style={selectStyle}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={!canSubmit || loading}
          style={{
            width: "100%",
            padding: 16,
            background: canSubmit
              ? loading
                ? "#9ca3af"
                : "#18181B"
              : "#9ca3af",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: canSubmit
              ? loading
                ? "not-allowed"
                : "pointer"
              : "not-allowed",
          }}
        >
          {loading ? "Đang phân tích..." : "Phân Tích"}
        </button>
      </form>

      <VipRequiredModal
        isOpen={showVipModal}
        onClose={() => setShowVipModal(false)}
        title="Phân tích tương hợp VIP"
        message="Tính năng phân tích tương hợp chi tiết chỉ dành cho thành viên VIP. Vui lòng nâng cấp tài khoản để sử dụng."
      />
    </div>
  );
};

export default CompatibilityForm;
