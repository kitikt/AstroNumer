import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div style={{ backgroundImage: `url('./images/background.png')`, minHeight: '100v' }}>
      <Header />
      <Outlet />
    </div>
  );
}


export default DefaultLayout;