import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";
import styles from "@/styles/LoginForm.module.css";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("Login clicked", { username, password });
    };

    return (
        <Box className={styles.form}>
            {/* <img src="/images/logo.png" alt="" /> */}
            <Image src="/images/logo.png" alt="" width={'80px'} height={'80px'} />
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
            >
                Login
            </button>
        </Box>
    );
}