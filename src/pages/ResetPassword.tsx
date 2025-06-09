import { Box, Stack, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toaster } from "@/components/ui/toaster";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const queryParams: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    queryParams[key] = value.replace(/ /g, "+");
  }

  const token = decodeURIComponent(queryParams["token"] || "");
  const email = decodeURIComponent(queryParams["email"] || "");
  console.log(token);

  const [inputEmail] = useState(email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!inputEmail || !newPassword || !confirmPassword) {
      toaster.create({
        title: "Thiếu thông tin",
        description: "Điền đầy đủ email và mật khẩu mới nha 🫠",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toaster.create({
        title: "Mật khẩu không khớp",
        description:
          "Hãy chắc chắn rằng mật khẩu mới và xác nhận mật khẩu khớp nhau.",
        type: "error",
        duration: 3000,
      });
      return;
    }

    if (!token) {
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
            Token: token,
            NewPassword: newPassword,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Đổi mật khẩu thất bại 😢");
      }

      toaster.create({
        title: "Đổi mật khẩu thành công 🎉",
        description: "Bạn có thể đăng nhập lại ngay bây giờ.",
        type: "success",
        duration: 3000,
      });

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
      <Toaster />
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}
          style={{ width: "100%" }}
        >
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
            type="submit"
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
        </form>
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
  marginBottom: "16px",
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
