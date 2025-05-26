import { Box, Stack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token, email } = useParams();

  const decodedToken = token ? decodeURIComponent(token) : "";
  const decodedEmail = email ? decodeURIComponent(email) : "";

  const [inputEmail, setInputEmail] = useState(decodedEmail);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!inputEmail || !newPassword || !confirmPassword) {
      alert("Điền đầy đủ thông tin đi bạn ơi 😤");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu không khớp kìa 😭");
      return;
    }

    if (!decodedToken) {
      alert("Token không hợp lệ hoặc hết hạn 😵‍💫");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: inputEmail,
            Token: decodedToken,
            NewPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đổi mật khẩu thất bại 😢");
      }

      alert("✅ Đổi mật khẩu thành công, quay lại đăng nhập nha bạn!");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        alert("❌ Lỗi: " + error.message);
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

        <input
          type="email"
          placeholder="Nhập lại email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={loading}
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#7c587c")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#552954")
          }
        >
          {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
        </button>
      </Box>
    </Stack>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "white",
  color: "#070707",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#552954",
  color: "white",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.2s",
};
