import { Box, HStack, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import styles from "@/styles/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Nhập đầy đủ Username và Password vào cha nội 😤");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login thất bại 😭");
      }

      console.log("✅ Login thành công:", data);
      if (data.Data.Token) {
        localStorage.setItem("token", data.Data.Token);
        setIsLoggedIn(true);
        alert("Đăng nhập thành công! 🚀");
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Lỗi login:", error.message);
        alert("Login thất bại: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.form}>
      <Image src="/images/logo.png" alt="Logo" width="80px" height="80px" />

      <Box className={styles.inputGroup}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>

      <Box className={styles.inputGroup}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <button
        type="button"
        className={styles.loginButton}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>
      <HStack fontSize="sm" mt={4}>
        <Text>Chưa có tài khoản? </Text>
        <Link href="/register" color="blue.500">
          Đăng ký ngay
        </Link>
      </HStack>
    </Box>
  );
}
