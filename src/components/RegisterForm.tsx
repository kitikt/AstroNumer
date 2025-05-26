import { Box, HStack, Image, Text, chakra } from "@chakra-ui/react";
import { useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";

import styles from "@/styles/LoginForm.module.css";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const ChakraRouterLink = chakra(RouterLink);

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
      toaster.create({
        title: "Thiếu thông tin",
        description: "Điền đầy đủ thông tin vào bạn ơi! 😅",
        type: "warning",
        duration: 4000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toaster.create({
        title: "Sai mật khẩu",
        description: "Password nhập lại không khớp! 😵",
        type: "error",
        duration: 4000,
      });
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
        throw new Error(data.message || "Đăng ký thất bại 😢");
      }

      alert("✅ Đăng ký thành công, mời đăng nhập lại!");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Lỗi đăng ký:", error);
        alert("❌ Lỗi đăng ký: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.form}>
      <Toaster />
      <Image src="/images/logo.png" alt="Logo" width="80px" height="80px" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        style={{ width: "100%" }}
      >
        <Box className={styles.inputGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="First Name"
            className={styles.input}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Box>

        <Box className={styles.inputGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Last Name"
            className={styles.input}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>

        <Box className={styles.inputGroup}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Phone Number"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>

        <Box className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Box className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>

        <button
          type="submit"
          disabled={loading}
          className={styles.loginButton}
          style={{
            display: "block",
            marginLeft: "auto",
            marginTop: "20px",
            marginRight: "auto",
            width: "150px",
          }}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <HStack fontSize="sm" mt={4}>
        <Text>Đã có tài khoản? </Text>
        <ChakraRouterLink to="/" color="blue.500">
          Đăng nhập
        </ChakraRouterLink>
      </HStack>
    </Box>
  );
}
