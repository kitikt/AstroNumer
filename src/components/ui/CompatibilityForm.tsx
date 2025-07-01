import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type CompatibilityResult = {
  StatusCode: number;
  Success: boolean;
  Message?: string;
  Data?: any;
};

const CompatibilityForm: React.FC = () => {
  const [birthday1, setBirthday1] = useState("");
  const [birthday2, setBirthday2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để sử dụng tính năng này.");
        setLoading(false);
        return;
      }
      const params = new URLSearchParams({
        birthday1,
        birthday2,
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
      let parsedData = data;
      if (typeof data.Data === "string") {
        // Xử lý trường hợp Data là JSON string
        try {
          parsedData = {
            ...data,
            Data: JSON.parse(data.Data.replace(/^```json\\n|```$/g, "")),
          };
        } catch {
          // fallback nếu parse lỗi
        }
      }
      localStorage.setItem("compatibilityResult", JSON.stringify(parsedData));
      navigate("/form/compatibility/result");
    } catch {
      alert("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
    setLoading(false);
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
          <label>Ngày sinh người 1 (dd/mm/yyyy):</label>
          <input
            type="text"
            value={birthday1}
            onChange={(e) => setBirthday1(e.target.value)}
            placeholder="10/02/2003"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              marginTop: 4,
            }}
            required
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label>Ngày sinh người 2 (dd/mm/yyyy):</label>
          <input
            type="text"
            value={birthday2}
            onChange={(e) => setBirthday2(e.target.value)}
            placeholder="10/02/2003"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              marginTop: 4,
            }}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 16,
            background: loading ? "#9ca3af" : "#18181B",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Đang phân tích..." : "Phân Tích"}
        </button>
      </form>
    </div>
  );
};

export default CompatibilityForm;
