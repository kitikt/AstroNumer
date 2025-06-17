import Loading from "@/components/Loading";
import { toaster } from "@/components/ui/toaster";
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
type ServiceUsageData = { Label: string; Value: number };
type RevenuePeriodData = { Label: string; Value: number };
type ApiResponse<T> = {
  StatusCode: number;
  Success: boolean;
  Message: string;
  Data: T;
  Errors: unknown[];
  TraceId: string;
  Meta: any;
};

type PeriodType = "ngay" | "thang" | "nam";

// API endpoints
const API_ENDPOINTS = {
  netRevenue:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/net-revenue",
  revenueByPeriod:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/revenue-by-period",
  totalUsers:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/total-users",
  totalServices:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/total-services",
  remainingUsage:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/remaining-usage",
  serviceUsageByMonth:
    "https://astronumer.info.vn/api/v1/dashboard/statistics/service-usage-by-month",
};

const type = createListCollection({
  items: [
    { label: "Ngày", value: "ngay" },
    { label: "Tháng", value: "thang" },
    { label: "Năm", value: "nam" },
  ],
});

const monthNames = createListCollection({
  items: Array.from({ length: 12 }, (_, i) => ({
    label: `Tháng ${i + 1}`,
    value: (i + 1).toString(),
  })),
});

// Helper functions
const formatDateForAPI = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const formatDateFromLabel = (label: string, year: string) => {
  const [day, month] = label.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const getDailyRevenueDataForMonth = (
  data: RevenueData[],
  month: number,
  year: number
) => {
  if (!data || data.length === 0) return [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    revenue: 0,
  }));

  data.forEach((entry) => {
    if (entry && entry.revenue !== undefined) {
      const entryDate = new Date(entry.date);
      if (entryDate.getMonth() === month && entryDate.getFullYear() === year) {
        dailyData[entryDate.getDate() - 1].revenue += entry.revenue;
      }
    }
  });

  return dailyData;
};

const getMonthlyRevenueData = (data: RevenueData[]) => {
  if (!data || data.length === 0) return [];
  const monthlyData = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames.items[index].label,
      revenue: 0,
    }));

  data.forEach((entry) => {
    if (entry && entry.revenue !== undefined) {
      const date = new Date(entry.date);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex].revenue += entry.revenue;
    }
  });

  return monthlyData;
};

const getMonthRange = (month: string, year: string) => {
  const monthNum = parseInt(month) - 1; // Tháng trong JS bắt đầu từ 0
  const firstDay = new Date(parseInt(year), monthNum, 1)
    .toISOString()
    .split("T")[0];
  const lastDay = new Date(parseInt(year), monthNum + 1, 0)
    .toISOString()
    .split("T")[0];
  return { from: firstDay, to: lastDay };
};

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string[]>(["ngay"]); // Default to "ngay" for testing
  const [selectedMonth, setSelectedMonth] = useState<string[]>(["5"]); // Default to May
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString()
  );

  // State for API data
  const [netRevenue, setNetRevenue] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalServices, setTotalServices] = useState<number>(0);
  const [remainingUsage, setRemainingUsage] = useState<number>(0);
  const [summaryTotalLoading, setSummaryTotalLoading] = useState(false);

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
  const [serviceUsageData, setServiceUsageData] = useState<ServiceUsageData[]>(
    []
  );
  const [revenueLoading, setRevenueLoading] = useState<boolean>(false);
  const [applicationLoading, setApplicationLoading] = useState<boolean>(false);
  const [serviceUsageLoading, setServiceUsageLoading] =
    useState<boolean>(false);

  const chartWidth = window.innerWidth - 470;
  const [fromDate, setFromDate] = useState<string>("2025-05-01");
  const [toDate, setToDate] = useState<string>("2025-06-17");

  // Fetch summary statistics
  const fetchSummaryData = async () => {
    setSummaryTotalLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không tìm thấy token trong localStorage");
      toaster.create({
        title: "Lỗi Xác Thực",
        description: "Vui lòng đăng nhập để truy cập dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setSummaryTotalLoading(false);
      return;
    }

    try {
      const usersResponse = await fetch(API_ENDPOINTS.totalUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (usersResponse.status === 401) {
        console.error("Không được phép: Token không hợp lệ hoặc thiếu");
        toaster.create({
          title: "Lỗi Xác Thực",
          description:
            "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setSummaryTotalLoading(false);
        return;
      }
      if (!usersResponse.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${usersResponse.status}`);
      }
      const usersData: ApiResponse<number> = await usersResponse.json();
      if (usersData.Success) setTotalUsers(usersData.Data);

      const servicesResponse = await fetch(API_ENDPOINTS.totalServices, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!servicesResponse.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${servicesResponse.status}`);
      }
      const servicesData: ApiResponse<number> = await servicesResponse.json();
      if (servicesData.Success) setTotalServices(servicesData.Data);

      const usageResponse = await fetch(API_ENDPOINTS.remainingUsage, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!usageResponse.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${usageResponse.status}`);
      }
      const usageData: ApiResponse<number> = await usageResponse.json();
      if (usageData.Success) setRemainingUsage(usageData.Data);

      const revenueResponse = await fetch(API_ENDPOINTS.netRevenue, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!revenueResponse.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${revenueResponse.status}`);
      }
      const revenueData: ApiResponse<number> = await revenueResponse.json();
      if (revenueData.Success) setNetRevenue(revenueData.Data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tổng quan:", error);
      toaster.create({
        title: "Lỗi",
        description: "Không tải được dữ liệu tổng quan. Vui lòng thử lại.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSummaryTotalLoading(false);
    }
  };

  const revenueRefetch = async () => {
    setRevenueLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không tìm thấy token trong localStorage");
      toaster.create({
        title: "Lỗi Xác Thực",
        description: "Vui lòng đăng nhập để truy cập dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRevenueLoading(false);
      return;
    }

    try {
      const period: PeriodType =
        (selectedPeriod[0]?.toLowerCase() as PeriodType) || "thang";
      let formattedFromDate = formatDateForAPI(fromDate);
      let formattedToDate = formatDateForAPI(toDate);

      // Điều chỉnh fromDate và toDate dựa trên selectedMonth khi kỳ là "thang"
      if (period === "thang" && selectedMonth[0]) {
        const { from, to } = getMonthRange(selectedMonth[0], selectedYear);
        formattedFromDate = formatDateForAPI(from);
        formattedToDate = formatDateForAPI(to);
      }

      const params = new URLSearchParams({
        period,
        from: formattedFromDate,
        to: formattedToDate,
      });

      console.log("Gọi API với params:", params.toString());
      const response = await fetch(
        `${API_ENDPOINTS.revenueByPeriod}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
        }
      );

      if (response.status === 401) {
        console.error("Không được phép: Token không hợp lệ hoặc thiếu");
        toaster.create({
          title: "Lỗi Xác Thực",
          description:
            "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setRevenueLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }

      const data: ApiResponse<RevenuePeriodData[]> = await response.json();
      console.log("Phản hồi API:", data);
      if (data.Success) {
        const formattedData = data.Data.map((item) => {
          if (period === "ngay") {
            return {
              date: formatDateFromLabel(item.Label, selectedYear),
              revenue: item.Value,
            };
          }
          return {
            date: item.Label, // Giữ nguyên Label cho "thang" và "nam"
            revenue: item.Value,
          };
        });
        console.log("Dữ liệu đã định dạng:", formattedData);
        setRevenueData(formattedData);
      } else {
        setRevenueData([]);
        console.warn("Thành công không đúng, Thông báo:", data.Message);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu doanh thu:", error);
      toaster.create({
        title: "Lỗi",
        description: "Không tải được dữ liệu doanh thu. Vui lòng thử lại.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setRevenueData([]);
    } finally {
      setRevenueLoading(false);
    }
  };
  const serviceUsageRefetch = async () => {
    setServiceUsageLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Không tìm thấy token trong localStorage");
      toaster.create({
        title: "Lỗi Xác Thực",
        description: "Vui lòng đăng nhập để truy cập dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setServiceUsageLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        year: selectedYear,
      });

      const response = await fetch(
        `${API_ENDPOINTS.serviceUsageByMonth}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
        }
      );

      if (response.status === 401) {
        console.error("Không được phép: Token không hợp lệ hoặc thiếu");
        toaster.create({
          title: "Lỗi Xác Thực",
          description:
            "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setServiceUsageLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Lỗi HTTP! Trạng thái: ${response.status}`);
      }

      const data: ApiResponse<ServiceUsageData[]> = await response.json();
      if (data.Success) {
        setServiceUsageData(data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sử dụng dịch vụ:", error);
      toaster.create({
        title: "Lỗi",
        description:
          "Không tải được dữ liệu sử dụng dịch vụ. Vui lòng thử lại.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setServiceUsageLoading(false);
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
    serviceUsageRefetch();
    applicationRefetch();
  }, [selectedPeriod, selectedMonth, fromDate, toDate, selectedYear]);

  const chartData = () => {
    if (selectedPeriod[0] === "thang") {
      // Sử dụng getMonthlyRevenueData để tạo dữ liệu cho 12 tháng
      const monthlyData = getMonthlyRevenueData(revenueData);
      return monthlyData.map((item, index) => ({
        month: item.month,
        revenue: item.revenue || 0, // Đảm bảo giá trị revenue không undefined
      }));
    } else if (selectedPeriod[0] === "ngay") {
      return revenueData.map((item) => ({
        date: item.date,
        revenue: item.revenue,
      }));
    } else if (selectedPeriod[0] === "nam") {
      return getMonthlyRevenueData(revenueData);
    }
    return revenueData;
  };

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
                      onValueChange={(e) => {
                        setSelectedPeriod(e.value);
                        if (e.value[0] === "ngay") {
                          setFromDate("2025-05-01");
                          setToDate("2025-06-17");
                        } else if (e.value[0] === "thang") {
                          setSelectedMonth(["5"]);
                          const { from, to } = getMonthRange("5", selectedYear);
                          setFromDate(from);
                          setToDate(to);
                        } else if (e.value[0] === "nam") {
                          setFromDate("2025-01-01");
                          setToDate("2025-12-31");
                        }
                      }}
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
                    {selectedPeriod[0] === "thang" && (
                      <Select.Root
                        collection={monthNames}
                        value={selectedMonth}
                        onValueChange={(e) => {
                          setSelectedMonth(e.value);
                          const { from, to } = getMonthRange(
                            e.value[0],
                            selectedYear
                          );
                          setFromDate(from);
                          setToDate(to);
                        }}
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
                    {(selectedPeriod[0] === "ngay" ||
                      selectedPeriod[0] === "nam") && (
                      <>
                        <input
                          type="date"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          style={{
                            background: "black",
                            color: "white",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid white",
                          }}
                        />
                        <input
                          type="date"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          style={{
                            background: "black",
                            color: "white",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid white",
                          }}
                        />
                      </>
                    )}
                  </Flex>
                </HStack>
                {!revenueLoading ? (
                  <AreaChart
                    width={chartWidth}
                    height={300}
                    data={chartData()}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
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

            <Stack gap={8}>
              <Heading as="h2" size="md">
                Biểu đồ lượt sử dụng dịch vụ theo tháng
              </Heading>
              <Box w="full">
                <HStack w="full" justify="space-between" mb={5}>
                  <Flex w="sm" gap={4}>
                    <Button onClick={serviceUsageRefetch}>
                      <FiRotateCcw /> Tải lại
                    </Button>
                    <Select.Root
                      value={[selectedYear]}
                      onValueChange={(e) => setSelectedYear(e.value[0])}
                    >
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText
                            placeholder="Chọn năm"
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
                            {Array.from({ length: 5 }, (_, i) => {
                              const year = new Date().getFullYear() - 2 + i;
                              return (
                                <Select.Item
                                  item={{
                                    label: year.toString(),
                                    value: year.toString(),
                                  }}
                                  key={year}
                                >
                                  {year}
                                  <Select.ItemIndicator />
                                </Select.Item>
                              );
                            })}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Flex>
                </HStack>
                {!serviceUsageLoading ? (
                  <BarChart
                    width={chartWidth}
                    height={300}
                    data={serviceUsageData}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" fill="#8884d8" name="Lượt sử dụng" />
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
