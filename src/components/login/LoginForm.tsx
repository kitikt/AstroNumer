"use client";

import { Box, HStack, Image, Text, chakra } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "@/styles/LoginForm.module.css";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ChakraRouterLink = chakra(RouterLink);

const loginSchema = z.object({
  username: z.string().min(1, "Username không được để trống"),
  password: z.string().min(1, "Password không được để trống"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Login thất bại 😭");

      if (resData.Data.Token) {
        localStorage.setItem("token", resData.Data.Token);
        setIsLoggedIn(true);

        toaster.create({
          title: "Đăng nhập thành công",
          description: "Bạn đã đăng nhập thành công! 🚀",
          type: "success",
          duration: 4000,
        });

        setTimeout(() => {
          navigate("/");
        }, 1200);
      }
    } catch (error) {
      if (error instanceof Error) {
        toaster.create({
          title: "Lỗi đăng nhập",
          description: error.message,
          type: "error",
          duration: 4000,
        });
      }
    }
  };

  return (
    <Box className={styles.form}>
      <Toaster />

      <Image src="/images/logo.png" alt="Logo" width="80px" height="80px" />

      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box
          className={styles.inputGroup}
          display="flex"
          flexDirection="column"
          gap="4px"
          mb="4"
        >
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className={styles.input}
            {...register("username")}
          />
          <Text
            color="red.500"
            fontSize="sm"
            minH="20px"
            mt={1}
            aria-live="polite"
          >
            {errors.username ? errors.username.message : "\u00A0"}
          </Text>
        </Box>

        <Box
          className={styles.inputGroup}
          display="flex"
          flexDirection="column"
          gap="4px"
          mb="4"
        >
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={styles.input}
            {...register("password")}
          />

          <Text
            color="red.500"
            fontSize="sm"
            minH="20px"
            mt={1}
            aria-live="polite"
          >
            {errors.password ? errors.password.message : "\u00A0"}
          </Text>
        </Box>
        <button
          type="submit"
          className={styles.loginButton}
          disabled={isSubmitting}
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "150px",
          }}
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
        </button>
      </form>

      <ChakraRouterLink
        to="/forgot-password"
        mt={2}
        fontSize="sm"
        color="blue.400"
        display="inline-block"
      >
        Quên mật khẩu?
      </ChakraRouterLink>

      <HStack fontSize="sm" mt={4}>
        <Text>Chưa có tài khoản? </Text>
        <ChakraRouterLink to="/register" color="blue.500">
          Đăng ký ngay
        </ChakraRouterLink>
      </HStack>
    </Box>
  );
}
