import { Box, Stack, Image, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toaster } from "@/components/ui/toaster";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toaster.create({
        title: "Thiếu email",
        description: "Nhập email vào cái đã 🫠",
      });
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
        throw new Error(data.message || "Gửi email thất bại");
      }

      toaster.create({
        title: "Gửi email thành công 📩",
        description: "Vào mail để đổi mật khẩu nha bạn ơi",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        toaster.create({
          title: "Lỗi gửi email 😓",
          description: error.message,
        });
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
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="30%"
        backgroundColor="#0707077a"
        padding="40px"
        borderRadius="32px"
        gap="24px"
      >
        <Image src="/images/logo.png" alt="Logo" width="80px" height="80px" />
        <Text fontSize="lg" color="white">
          Quên mật khẩu?
        </Text>

        <Input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          backgroundColor="white"
        />

        <Button
          colorScheme="purple"
          hoverColor="purple.600"
          onClick={handleForgotPassword}
          isLoading={loading as boolean}
          width="100%"
        >
          {loading ? "Đang xử lí..." : "Gửi yêu cầu đặt lại mật khẩu"}
        </Button>
      </Box>
    </Stack>
  );
}
