import React from "react";
import { useNavigate } from "react-router-dom";

interface VipRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const VipRequiredModal: React.FC<VipRequiredModalProps> = ({
  isOpen,
  onClose,
  title = "Tính năng VIP",
  message = "Tính năng này chỉ dành cho thành viên VIP. Vui lòng nâng cấp tài khoản để sử dụng phân tích chuyên sâu và chi tiết hơn.",
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate("/service");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          maxWidth: "500px",
          textAlign: "center",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>🌟</div>
        <h2
          style={{ color: "#e91e63", marginBottom: "16px", fontSize: "24px" }}
        >
          {title}
        </h2>
        <p style={{ color: "#666", marginBottom: "24px", lineHeight: "1.6" }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={handleUpgrade}
            style={{
              background: "linear-gradient(135deg, #e91e63, #9c27b0)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Nâng cấp VIP
          </button>
          <button
            onClick={onClose}
            style={{
              background: "#f5f5f5",
              color: "#666",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default VipRequiredModal;
