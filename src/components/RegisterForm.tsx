import { Box, HStack, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import styles from "@/styles/LoginForm.module.css";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Điền đầy đủ thông tin vào nghen! 😤");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password nhập lại không khớp! 😵");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: firstName,
            LastName: lastName,
            PhoneNumber: phoneNumber,
            Email: email,
            Password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Đăng ký thất bại 😭");
      }

      console.log("✅ Đăng ký thành công:", data);
      alert("Đăng ký thành công! Đăng nhập ngay nào! 🚀");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Lỗi đăng ký:", error.message);
        alert("Lỗi: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.form}>
      <Image src="/images/logo.png" alt="Logo" width="80px" height="80px" />

      <Box className={styles.inputGroup}>
        <label className={styles.label}>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          className={styles.input}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </Box>

      <Box className={styles.inputGroup}>
        <label className={styles.label}>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          className={styles.input}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </Box>

      <Box className={styles.inputGroup}>
        <label className={styles.label}>Phone Number</label>
        <input
          type="tel"
          placeholder="Số điện thoại"
          className={styles.input}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Box>

      <Box className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box className={styles.inputGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      <Box className={styles.inputGroup}>
        <label className={styles.label}>Nhập lại Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>

      <button
        type="button"
        className={styles.loginButton}
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đăng ký"}
      </button>

      <HStack fontSize="sm" mt={4}>
        <Text>Đã có tài khoản?</Text>
        <Link href="/login" color="blue.500">
          Đăng nhập
        </Link>
      </HStack>
    </Box>
  );
}
