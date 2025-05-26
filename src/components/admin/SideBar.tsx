import { Box, Button, Stack, HStack, Text, Icon } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiShoppingBag,
  FiAlignRight,
  FiAlignLeft,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { icon: FiHome, label: "Dashboard", url: "dashboard" },
  { icon: FiUsers, label: "Tài khoản", url: "accounts" },
  { icon: FiShoppingBag, label: "Đơn hàng", url: "" },
  { icon: FiSettings, label: "Cài đặt", url: "" },
];

interface Prop {
  isCollapse: boolean;
  setIsCollapse: Dispatch<SetStateAction<boolean>>;
}

const AdminSidebar = ({ isCollapse, setIsCollapse }: Prop) => {
  const navigate = useNavigate();

  return (
    <Box
      marginTop={20}
      bg="black"
      transition="width 0.8s ease"
      w={isCollapse ? "80px" : "240px"}
      overflow="hidden"
      position={"fixed"}
    >
      <Stack py={5} gap={4}>
        <HStack
          justify={isCollapse ? "center" : "flex-end"}
          pr={isCollapse ? 0 : 4}
        >
          <Button
            size="sm"
            onClick={() => setIsCollapse(!isCollapse)}
            variant={"ghost"}
            _hover={{ bg: "#ffffff2b" }}
          >
            <Icon
              as={isCollapse ? FiAlignLeft : FiAlignRight}
              color={"white"}
            />
          </Button>
        </HStack>

        {menuItems.map(({ icon, label, url }, index) => (
          <Button key={index} bg={"none"} p={0} onClick={() => navigate(url)}>
            <HStack
              px={4}
              py={4}
              position="relative"
              _hover={{ bg: "#ffffff2b" }}
              w={isCollapse ? "80px" : "240px"}
              align="center"
              gap={0}
              borderRadius={10}
            >
              <Box
                transition="margin 2s ease-in-out"
                ml={isCollapse ? "auto" : "0"}
                mr={isCollapse ? "auto" : "12px"}
              >
                <Icon as={icon} boxSize={5} color="white" />
              </Box>

              <Text
                opacity={isCollapse ? 0 : 1}
                transition="opacity 1s ease-in-out"
                whiteSpace="nowrap"
                overflow="hidden"
                w={isCollapse ? "0px" : "100%"}
              >
                {label}
              </Text>
            </HStack>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminSidebar;
