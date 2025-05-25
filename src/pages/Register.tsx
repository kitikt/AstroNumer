import RegisterForm from "@/components/RegisterForm";

const RegisterPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(/images/loginbackground.png)`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
