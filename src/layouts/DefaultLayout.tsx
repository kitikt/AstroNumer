import Header from "@/components/Header";
import FloatingFeedbackButton from "@/components/FloatingFeedbackButton";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div
      style={{
        backgroundImage: `url('./images/background.png')`,
        minHeight: "100v",
      }}
    >
      <Header />
      <Outlet />
      <FloatingFeedbackButton />
    </div>
  );
}

export default DefaultLayout;
