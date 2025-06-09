import { Box, Flex, Text, Heading, HStack, Icon } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [netRevenue, setNetRevenue] = useState<number | null>(null);
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalServices, setTotalServices] = useState<number | null>(null);
  const [remainingUsage, setRemainingUsage] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Kiểm tra cơ bản ngay từ đầu
  console.log("Dashboard Component Mounted");

  // Fetch all data from APIs
  useEffect(() => {
    console.log("useEffect Started");

    const fetchData = async () => {
      try {
        // Kiểm tra và log API base URL
        const apiBaseUrl = import.meta.env.VITE_API_URL;
        console.log("Checking VITE_API_URL:", apiBaseUrl);
        if (!apiBaseUrl) {
          throw new Error("VITE_API_URL không được thiết lập trong .env");
        }
        console.log("API Base URL:", apiBaseUrl);

        // Fetch Net Revenue
        const revenueResponse = await fetch(
          `${apiBaseUrl}/api/v1/dashboard/statistics/net-revenue?from=2025-06-01&to=2025-06-03`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!revenueResponse.ok) {
          throw new Error(
            `Lỗi HTTP cho Net Revenue: ${revenueResponse.status}`
          );
        }
        const revenueData = await revenueResponse.json();
        console.log("Net Revenue Response:", revenueData);
        if (revenueData.Success) {
          setNetRevenue(revenueData.Data);
        } else {
          throw new Error(
            revenueData.Message || "Không thể lấy dữ liệu doanh thu"
          );
        }

        // Fetch Total Users
        const usersResponse = await fetch(
          `${apiBaseUrl}/api/v1/dashboard/statistics/total-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!usersResponse.ok) {
          throw new Error(`Lỗi HTTP cho Total Users: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        console.log("Total Users Response:", usersData);
        if (usersData.Success) {
          setTotalUsers(usersData.Data);
        } else {
          throw new Error(
            usersData.Message || "Không thể lấy dữ liệu người dùng"
          );
        }

        // Fetch Total Services
        const servicesResponse = await fetch(
          `${apiBaseUrl}/api/v1/dashboard/statistics/total-services`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!servicesResponse.ok) {
          throw new Error(
            `Lỗi HTTP cho Total Services: ${servicesResponse.status}`
          );
        }
        const servicesData = await servicesResponse.json();
        console.log("Total Services Response:", servicesData);
        if (servicesData.Success) {
          setTotalServices(servicesData.Data);
        } else {
          throw new Error(
            servicesData.Message || "Không thể lấy dữ liệu dịch vụ"
          );
        }

        // Fetch Remaining Usage
        const usageResponse = await fetch(
          `${apiBaseUrl}/api/v1/dashboard/statistics/remaining-usage`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!usageResponse.ok) {
          throw new Error(
            `Lỗi HTTP cho Remaining Usage: ${usageResponse.status}`
          );
        }
        const usageData = await usageResponse.json();
        console.log("Remaining Usage Response:", usageData);
        if (usageData.Success) {
          setRemainingUsage(usageData.Data);
        } else {
          throw new Error(
            usageData.Message || "Không thể lấy dữ liệu lượt sử dụng"
          );
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? "Lỗi khi lấy dữ liệu: " + err.message
            : "Lỗi khi lấy dữ liệu."
        );
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
        console.log("Fetch Data Finished");
      }
    };

    fetchData();
  }, []);

  // Log state values to check if they are updated
  useEffect(() => {
    console.log("State Values:", {
      netRevenue,
      totalUsers,
      totalServices,
      remainingUsage,
    });
  }, [netRevenue, totalUsers, totalServices, remainingUsage]);

  const formatRevenue = (value) => {
    if (value === null || value === undefined) return "N/A";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <Box p="6" bg="gray.50" h="100vh">
      {/* Header */}
      <Heading size="lg" mb="8">
        THỐNG KẾ
      </Heading>

      {/* Metrics Section */}
      <Flex justify="space-between" mb="6">
        {/* Net Revenue */}
        <Box w="24%" bg="white" p="6" rounded="lg" shadow="sm">
          <Text color="gray.500" fontSize="sm">
            Doanh thu
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <>
              <HStack align="baseline">
                <Heading size="lg">{formatRevenue(netRevenue)}</Heading>
                <HStack color="red.500" fontSize="sm">
                  <Icon as={ChevronDown} boxSize="4" />
                  <Text>12% so với tuần trước</Text>
                </HStack>
              </HStack>
              <Text color="gray.500" fontSize="xs" mt="1">
                doanh thu từ 1 tới 3/6/2025
              </Text>
            </>
          )}
        </Box>

        {/* Total Users */}
        <Box w="24%" bg="white" p="6" rounded="lg" shadow="sm">
          <Text color="gray.500" fontSize="sm">
            Tổng người dùng
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <>
              <HStack align="baseline">
                <Heading size="lg">{totalUsers ?? "N/A"}</Heading>
                <HStack color="red.500" fontSize="sm">
                  <Icon as={ChevronDown} boxSize="4" />
                  <Text>12% so với tuần trước</Text>
                </HStack>
              </HStack>
              <Text color="gray.500" fontSize="xs" mt="1">
                tổng số người dùng
              </Text>
            </>
          )}
        </Box>

        {/* Total Services */}
        <Box w="24%" bg="white" p="6" rounded="lg" shadow="sm">
          <Text color="gray.500" fontSize="sm">
            Tổng dịch vụ
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <>
              <HStack align="baseline">
                <Heading size="lg">{totalServices ?? "N/A"}</Heading>
                <HStack color="red.500" fontSize="sm">
                  <Icon as={ChevronDown} boxSize="4" />
                  <Text>12% so với tuần trước</Text>
                </HStack>
              </HStack>
              <Text color="gray.500" fontSize="xs" mt="1">
                tổng số gói dịch vụ
              </Text>
            </>
          )}
        </Box>

        {/* Remaining Usage */}
        <Box w="24%" bg="white" p="6" rounded="lg" shadow="sm">
          <Text color="gray.500" fontSize="sm">
            Lượt sử dụng còn lại
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <>
              <HStack align="baseline">
                <Heading size="lg">{remainingUsage ?? "N/A"}</Heading>
                <HStack color="red.500" fontSize="sm">
                  <Icon as={ChevronDown} boxSize="4" />
                  <Text>12% so với tuần trước</Text>
                </HStack>
              </HStack>
              <Text color="gray.500" fontSize="xs" mt="1">
                tổng số lượt đã mua dịch vụ
              </Text>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
