import backgroundVideo from "@/assets/login-background.mp4";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          width: "100%",
          padding: "0 20px",
        }}
      >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
