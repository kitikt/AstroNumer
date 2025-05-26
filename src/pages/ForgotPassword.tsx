import { Box, Stack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Nhập email vào đi");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Email: email }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Lỗi gửi email 😢");
      }

      alert("✅ Đã gửi email khôi phục. Check mail liền tay Sếp nhé 📬");
    } catch (error) {
      if (error instanceof Error) {
        alert("❌ Gửi thất bại: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="100vh"
      backgroundImage={`url('/images/background.png')`}
    >
      <Box
        style={{
          display: "flex",
          width: "40%",
          flexDirection: "column",
          backgroundColor: "#0707077a",
          gap: "24px",
          padding: "40px",
          borderRadius: "50px",
          alignItems: "center",
        }}
      >
        <Image src="/images/logo.png" alt="Logo" width="80px" height="80px" />

        <Link
          to="/"
          style={{
            color: "#4299e1", // blue.400
            fontSize: "14px",
            alignSelf: "flex-start",
            textDecoration: "underline",
          }}
        >
          ← Quay lại trang đăng nhập
        </Link>

        <input
          type="email"
          placeholder="Nhập email của bạn"
          style={{
            width: "100%",
            padding: "12px 16px",
            backgroundColor: "white",
            color: "#070707",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#552954",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#7c587c";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#552954";
          }}
        >
          {loading ? "Đang gửi..." : "Gửi Email Khôi Phục"}
        </button>
      </Box>
    </Stack>
  );
}
