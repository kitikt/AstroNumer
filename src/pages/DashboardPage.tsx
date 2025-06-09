import Loading from "@/components/Loading";
import {
  Badge,
  Box,
  Button,
  Card,
  createListCollection,
  Flex,
  Heading,
  HStack,
  Icon,
  Portal,
  Select,
  Stack,
  Stat,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiRotateCcw,
  FiUsers,
  FiPackage,
  FiCheckCircle,
} from "react-icons/fi";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Area,
  BarChart,
  Bar,
  Tooltip,
} from "recharts";

// Define types for the data
type RevenueData = { date: string; revenue: number };
type ApplicationData = { month: string; application: number };
type ApiResponse<T> = {
  StatusCode: number;
  Success: boolean;
  Message: string;
  Data: T;
  Errors: unknown[];
  TraceId: string;
  Meta: any;
};

// API endpoints
const API_ENDPOINTS = {
  netRevenue:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/net-revenue",
  totalUsers:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/total-users",
  totalServices:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/total-services",
  remainingUsage:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/remaining-usage",
};

const type = createListCollection({
  items: [
    { label: "Tháng", value: "Month" },
    { label: "Năm", value: "Year" },
  ],
});

const monthNames = createListCollection({
  items: Array.from({ length: 12 }, (_, i) => ({
    label: `Tháng ${i + 1}`,
    value: (i + 1).toString(),
  })),
});

// Helper functions
const getDailyRevenueDataForMonth = (
  data: RevenueData[],
  month: number,
  year: number
) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    revenue: 0,
  }));

  data.forEach((entry) => {
    const entryDate = new Date(entry.date);
    if (
      entryDate.getMonth() + 1 === month &&
      entryDate.getFullYear() === year
    ) {
      dailyData[entryDate.getDate() - 1].revenue += entry.revenue;
    }
  });

  return dailyData;
};

const getMonthlyRevenueData = (data: RevenueData[]) => {
  const monthlyData = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames.items[index].label,
      revenue: 0,
    }));

  data.forEach((entry) => {
    const date = new Date(entry.date);
    const monthIndex = date.getMonth();
    monthlyData[monthIndex].revenue += entry.revenue;
  });

  return monthlyData;
};

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string[]>(["1"]);

  // State for API data
  const [netRevenue, setNetRevenue] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalServices, setTotalServices] = useState<number>(0);
  const [remainingUsage, setRemainingUsage] = useState<number>(0);
  const [summaryTotalLoading, setSummaryTotalLoading] = useState(false);

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
  const [revenueLoading, setRevenueLoading] = useState<boolean>(false);
  const [applicationLoading, setApplicationLoading] = useState<boolean>(false);

  const chartWidth = window.innerWidth - 470;

  // Fetch summary statistics
  const fetchSummaryData = async () => {
    setSummaryTotalLoading(true);
    try {
      const usersResponse = await fetch(API_ENDPOINTS.totalUsers);
      if (!usersResponse.ok)
        throw new Error(`HTTP error! status: ${usersResponse.status}`);
      const usersData: ApiResponse<number> = await usersResponse.json();
      if (usersData.Success) setTotalUsers(usersData.Data);

      const servicesResponse = await fetch(API_ENDPOINTS.totalServices);
      if (!servicesResponse.ok)
        throw new Error(`HTTP error! status: ${servicesResponse.status}`);
      const servicesData: ApiResponse<number> = await servicesResponse.json();
      if (servicesData.Success) setTotalServices(servicesData.Data);

      const usageResponse = await fetch(API_ENDPOINTS.remainingUsage);
      if (!usageResponse.ok)
        throw new Error(`HTTP error! status: ${usageResponse.status}`);
      const usageData: ApiResponse<number> = await usageResponse.json();
      if (usageData.Success) setRemainingUsage(usageData.Data);

      const revenueResponse = await fetch(API_ENDPOINTS.netRevenue);
      if (!revenueResponse.ok)
        throw new Error(`HTTP error! status: ${revenueResponse.status}`);
      const revenueData: ApiResponse<number> = await revenueResponse.json();
      if (revenueData.Success) setNetRevenue(revenueData.Data);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    } finally {
      setSummaryTotalLoading(false);
    }
  };

  const revenueRefetch = async () => {
    setRevenueLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.netRevenue);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: ApiResponse<number> = await response.json();
      if (data.Success) setNetRevenue(data.Data);

      const dummyRevenue: RevenueData[] = [];
      const year = 2024;
      for (let month = 0; month < 12; month++) {
        const days = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= days; day++) {
          dummyRevenue.push({
            date: `${year}-${(month + 1).toString().padStart(2, "0")}-${day
              .toString()
              .padStart(2, "0")}`,
            revenue: Math.floor(Math.random() * 0), // Random revenue for demo
          });
        }
      }
      setRevenueData(dummyRevenue);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    } finally {
      setRevenueLoading(false);
    }
  };

  const applicationRefetch = () => {
    setApplicationLoading(true);
    setTimeout(() => {
      const dummyApp: ApplicationData[] = Array.from(
        { length: 12 },
        (_, i) => ({
          month: `Tháng ${i + 1}`,
          application: Math.floor(Math.random() * 50),
        })
      );
      setApplicationData(dummyApp);
      setApplicationLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchSummaryData();
    revenueRefetch();
    applicationRefetch();
  }, []);

  const lastMonthData = getDailyRevenueDataForMonth(
    revenueData,
    parseInt(selectedMonth[0]),
    2024
  );
  const lastYearData = getMonthlyRevenueData(revenueData);

  return (
    <>
      <HStack justify={"center"} gap={10}>
        <Stat.Root
          borderWidth="1px"
          p="4"
          rounded="md"
          color={"white"}
          flex={1}
        >
          <HStack justify="space-between">
            <Stat.Label>Doanh thu</Stat.Label>
            <Icon as={FiDollarSign} />
          </HStack>
          <Stat.ValueText>
            {summaryTotalLoading ? (
              <Loading />
            ) : isNaN(netRevenue) ? (
              "Lỗi tải dữ liệu"
            ) : (
              `$${netRevenue.toLocaleString()}`
            )}
          </Stat.ValueText>
          <Badge colorPalette="red" variant="plain" px="0">
            <Stat.DownIndicator /> 12%
          </Badge>
        </Stat.Root>
        <Stat.Root
          borderWidth="1px"
          p="4"
          rounded="md"
          color={"white"}
          flex={1}
        >
          <HStack justify="space-between">
            <Stat.Label>Tổng người dùng</Stat.Label>
            <Icon as={FiUsers} />
          </HStack>
          <Stat.ValueText>
            {summaryTotalLoading ? (
              <Loading />
            ) : isNaN(totalUsers) ? (
              "Lỗi tải dữ liệu"
            ) : (
              totalUsers.toLocaleString()
            )}
          </Stat.ValueText>
          <Badge colorPalette="red" variant="plain" px="0">
            <Stat.DownIndicator /> 12%
          </Badge>
        </Stat.Root>
        <Stat.Root
          borderWidth="1px"
          p="4"
          rounded="md"
          color={"white"}
          flex={1}
        >
          <HStack justify="space-between">
            <Stat.Label>Tổng dịch vụ</Stat.Label>
            <Icon as={FiPackage} />
          </HStack>
          <Stat.ValueText>
            {summaryTotalLoading ? (
              <Loading />
            ) : isNaN(totalServices) ? (
              "Lỗi tải dữ liệu"
            ) : (
              totalServices.toLocaleString()
            )}
          </Stat.ValueText>
          <Badge colorPalette="red" variant="plain" px="0">
            <Stat.DownIndicator /> 12%
          </Badge>
        </Stat.Root>
        <Stat.Root
          borderWidth="1px"
          p="4"
          rounded="md"
          color={"white"}
          flex={1}
        >
          <HStack justify="space-between">
            <Stat.Label>Lượt sử dụng còn lại</Stat.Label>
            <Icon as={FiCheckCircle} />
          </HStack>
          <Stat.ValueText>
            {summaryTotalLoading ? (
              <Loading />
            ) : isNaN(remainingUsage) ? (
              "Lỗi tải dữ liệu"
            ) : (
              remainingUsage.toLocaleString()
            )}
          </Stat.ValueText>
          <Badge colorPalette="red" variant="plain" px="0">
            <Stat.DownIndicator /> 12%
          </Badge>
        </Stat.Root>
      </HStack>

      <Card.Root w="full" mt={10}>
        <Card.Body bg={"black"} borderRadius={"inherit"}>
          <Stack gap={10}>
            <Stack gap={8} mt={3}>
              <Heading as="h2" size="md">
                Biểu đồ doanh thu
              </Heading>
              <Box w="full">
                <HStack w="full" justify="space-between" mb={8}>
                  <Flex w="sm" gap={4}>
                    <Button onClick={revenueRefetch}>
                      <FiRotateCcw /> Tải lại
                    </Button>
                    <Select.Root
                      collection={type}
                      value={selectedPeriod}
                      onValueChange={(e) => setSelectedPeriod(e.value)}
                    >
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText
                            placeholder="Chọn kỳ"
                            color={"white"}
                          />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content bg={"black"} color={"white"}>
                            {type.items.map((framework) => (
                              <Select.Item
                                item={framework}
                                key={framework.value}
                              >
                                {framework.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                    {selectedPeriod[0] === "Month" && (
                      <Select.Root
                        collection={monthNames}
                        value={selectedMonth}
                        onValueChange={(e) => setSelectedMonth(e.value)}
                      >
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText
                              placeholder="Chọn tháng"
                              color={"white"}
                            />
                          </Select.Trigger>
                          <Select.IndicatorGroup>
                            <Select.Indicator />
                          </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                          <Select.Positioner>
                            <Select.Content bg={"black"} color={"white"}>
                              {monthNames.items.map((monthName) => (
                                <Select.Item
                                  item={monthName}
                                  key={monthName.value}
                                >
                                  {monthName.label}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Portal>
                      </Select.Root>
                    )}
                  </Flex>
                </HStack>
                {!revenueLoading ? (
                  <AreaChart
                    width={chartWidth}
                    height={300}
                    data={
                      selectedPeriod[0] === "Month"
                        ? lastMonthData
                        : lastYearData
                    }
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey={selectedPeriod[0] === "Month" ? "day" : "month"}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Doanh thu"
                    />
                  </AreaChart>
                ) : (
                  <Stack h={300}>
                    <Loading />
                  </Stack>
                )}
              </Box>
            </Stack>

            <Stack gap={8}>
              <Heading as="h2" size="md">
                Biểu đồ số lượng đơn
              </Heading>
              <Box w="full">
                <HStack w="full" justify="space-between" mb={5}>
                  <Flex w="sm" gap={4}>
                    <Button onClick={applicationRefetch}>
                      <FiRotateCcw /> Tải lại
                    </Button>
                  </Flex>
                </HStack>
                {!applicationLoading ? (
                  <BarChart
                    width={chartWidth}
                    height={300}
                    data={applicationData}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="application"
                      fill="#ff7300"
                      name="Số lượng đơn"
                    />
                  </BarChart>
                ) : (
                  <Stack h={300}>
                    <Loading />
                  </Stack>
                )}
              </Box>
            </Stack>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default DashboardPage;
