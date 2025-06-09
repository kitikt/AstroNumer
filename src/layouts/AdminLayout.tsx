import AdminHeader from "@/components/admin/Header";
import AdminSidebar from "@/components/admin/SideBar";
import { useAuth } from "@/hooks/useAuth";
import { Box, HStack, Stack } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Stack bg={"black"} minH={"100vh"}>
      <AdminHeader />
      <HStack align={"flex-start"} mt="65px" minH="calc(100vh - 65px)">
        <Box w={isCollapse ? "80px" : "240px"}>
          <AdminSidebar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
        </Box>
        <Stack flex={1} mt={10} align={"center"} transition="margin 0.3s ease">
          <Stack w={"6xl"} transition={"all 55s ease-in-out"}>
            <Outlet />
          </Stack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default memo(AdminLayout);
