import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  Divider,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  Button,
  useColorModeValue,
} from "";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Icons import
import {
  Activity,
  User,
  Users,
  Settings,
  Calendar,
  LogOut,
  ChevronUp,
  ChevronDown,
  Bell,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function Dashboard() {
  // Sample data
  const revenueData = [
    { day: "01", ngay: "01", revenue: 18000, target: 20000 },
    { day: "02", ngay: "02", revenue: 22000, target: 20000 },
    { day: "03", ngay: "03", revenue: 19000, target: 20000 },
    { day: "04", ngay: "04", revenue: 23000, target: 20000 },
    { day: "05", ngay: "05", revenue: 20000, target: 20000 },
    { day: "06", ngay: "06", revenue: 25000, target: 20000 },
    { day: "07", ngay: "07", revenue: 21000, target: 20000 },
    { day: "08", ngay: "08", revenue: 18000, target: 20000 },
    { day: "09", ngay: "09", revenue: 22000, target: 20000 },
    { day: "10", ngay: "10", revenue: 19000, target: 20000 },
    { day: "11", ngay: "11", revenue: 24000, target: 20000 },
    { day: "12", ngay: "12", revenue: 23000, target: 20000 },
  ];

  const visitorData = [
    { day: "01", visitors: 150 },
    { day: "02", visitors: 230 },
    { day: "03", visitors: 180 },
    { day: "04", visitors: 240 },
    { day: "05", visitors: 200 },
    { day: "06", visitors: 190 },
    { day: "07", visitors: 250 },
    { day: "08", visitors: 220 },
    { day: "09", visitors: 170 },
    { day: "10", visitors: 230 },
  ];

  const customers = [
    { name: "Nguyen Van A", phone: "0912123123" },
    { name: "Nguyen Van B", phone: "0134123123" },
    { name: "Nguyen Van C", phone: "0124122233" },
    { name: "Nguyen Van D", phone: "0124123153" },
  ];

  const meetingData = [
    { time: "Trưa", value: 40 },
    { time: "Chiều", value: 30 },
    { time: "Tối", value: 30 },
  ];

  const COLORS = ["#6366F1", "#60A5FA", "#F87171"];

  const sidebarItems = [
    { name: "Thống kê", icon: Activity, active: true },
    { name: "Dịch vụ", icon: Settings },
    { name: "Tài Khoản", icon: User },
    { name: "Khách hàng liên hệ", icon: Users },
    { name: "Lịch tư vấn", icon: Calendar },
    { name: "Cài đặt", icon: Settings },
    { name: "Đăng xuất", icon: LogOut },
  ];

  return (
    <Flex w="full" h="100vh" bg="gray.50">
      {/* Sidebar */}
      <VStack
        w="64"
        h="full"
        bg="white"
        p="4"
        spacing="4"
        align="start"
        borderRight="1px"
        borderColor="gray.200"
      >
        <Box p="4">
          <Box w="8" h="8" bg="purple.400" rounded="full"></Box>
        </Box>
        <VStack spacing="2" align="start" w="full">
          {sidebarItems.map((item, index) => (
            <Flex
              key={index}
              py="2"
              px="4"
              rounded="md"
              w="full"
              align="center"
              bg={item.active ? "blue.50" : "transparent"}
              color={item.active ? "blue.600" : "gray.600"}
              fontWeight={item.active ? "medium" : "normal"}
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
            >
              <Icon as={item.icon} mr="3" boxSize="5" />
              <Text>{item.name}</Text>
            </Flex>
          ))}
        </VStack>
      </VStack>

      {/* Main Content */}
      <Box flex="1" overflow="auto" p="6">
        {/* Header */}
        <Flex justify="space-between" align="center" mb="8">
          <Heading size="lg">THỐNG KÊ</Heading>
          <HStack spacing="4">
            <Icon as={Bell} boxSize="6" color="gray.500" />
            <Icon as={MessageSquare} boxSize="6" color="gray.500" />
            <Box w="10" h="10" rounded="full" bg="gray.300" />
          </HStack>
        </Flex>

        {/* Revenue Section */}
        <Flex mb="6" justify="space-between" align="start">
          <Box w="62%" bg="white" p="6" rounded="lg" shadow="sm">
            <Flex justify="space-between" mb="4">
              <Box>
                <Text color="gray.500" fontSize="sm">
                  Revenue
                </Text>
                <HStack align="baseline">
                  <Heading size="lg">VND 23.500.000</Heading>
                  <HStack color="green.500" fontSize="sm">
                    <Icon as={ChevronUp} boxSize="4" />
                    <Text>3.1% so với tuần trước</Text>
                  </HStack>
                </HStack>
                <Text color="gray.500" fontSize="xs" mt="1">
                  doanh thu từ 1 tới 4/2025
                </Text>
              </Box>
              <Button size="sm" color="blue.600" variant="link">
                xem báo cáo
              </Button>
            </Flex>
            <Box h="64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f0f0f0"
                  />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar
                    dataKey="revenue"
                    fill="#6366F1"
                    radius={[5, 5, 0, 0]}
                    barSize={12}
                  />
                  <Bar
                    dataKey="target"
                    fill="#E2E8F0"
                    radius={[5, 5, 0, 0]}
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Flex justify="center" mt="2">
              <HStack spacing="4">
                <HStack>
                  <Box w="3" h="3" rounded="full" bg="blue.600" />
                  <Text fontSize="sm">$ ngày trước</Text>
                </HStack>
                <HStack>
                  <Box w="3" h="3" rounded="full" bg="gray.300" />
                  <Text fontSize="sm">Tuần trước</Text>
                </HStack>
              </HStack>
            </Flex>
          </Box>

          {/* Calendar/Schedule Section */}
          <Box w="36%" bg="white" p="6" rounded="lg" shadow="sm">
            <Flex justify="space-between" mb="4">
              <Text fontWeight="medium">Lịch hẹn</Text>
              <Button size="sm" color="blue.600" variant="link">
                xem báo cáo
              </Button>
            </Flex>
            <Text color="gray.500" fontSize="sm">
              From 1-8 June, 2024
            </Text>

            <Box h="64" mt="6" position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={meetingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {meetingData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                textAlign="center"
                bg="blue.900"
                color="white"
                p="3"
                rounded="md"
              >
                <Text fontSize="sm">Afternoon</Text>
                <Text fontSize="sm">1PM - 4PM</Text>
                <Text fontWeight="bold">2 Meetings</Text>
              </Box>
            </Box>

            <Flex justify="center" mt="4">
              <HStack spacing="6">
                {meetingData.map((entry, index) => (
                  <HStack key={index}>
                    <Box w="3" h="3" rounded="full" bg={COLORS[index]} />
                    <Text fontSize="sm">{entry.time}</Text>
                  </HStack>
                ))}
              </HStack>
            </Flex>
          </Box>
        </Flex>

        {/* Bottom Section */}
        <Flex justify="space-between" mb="4">
          {/* Ratings Section */}
          <Box w="32%" bg="white" p="6" rounded="lg" shadow="sm">
            <Text fontWeight="medium" mb="2">
              Đánh giá từ khách hàng
            </Text>
            <Text color="gray.500" fontSize="xs">
              Statistics rate from customer, vendors...
            </Text>

            <Flex justify="center" h="56" mt="4">
              <Box position="relative" w="full" h="full">
                {/* Customer Rating */}
                <Box
                  position="absolute"
                  top="20%"
                  left="20%"
                  textAlign="center"
                >
                  <CircularProgress
                    value={85}
                    color="purple.400"
                    size="100px"
                    thickness="4px"
                  >
                    <CircularProgressLabel>
                      <Text fontWeight="bold" fontSize="xl">
                        85%
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Customers
                      </Text>
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>

                {/* Vendor Rating */}
                <Box
                  position="absolute"
                  top="30%"
                  right="20%"
                  textAlign="center"
                >
                  <CircularProgress
                    value={85}
                    color="orange.400"
                    size="140px"
                    thickness="4px"
                  >
                    <CircularProgressLabel>
                      <Text fontWeight="bold" fontSize="xl">
                        85%
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Vendors
                      </Text>
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>

                {/* Revenue Rating */}
                <Box
                  position="absolute"
                  bottom="15%"
                  left="30%"
                  textAlign="center"
                >
                  <CircularProgress
                    value={92}
                    color="cyan.400"
                    size="120px"
                    thickness="4px"
                  >
                    <CircularProgressLabel>
                      <Text fontWeight="bold" fontSize="xl">
                        92%
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        Revenue
                      </Text>
                    </CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Box>
            </Flex>
          </Box>

          {/* New Customers Section */}
          <Box w="32%" bg="white" p="6" rounded="lg" shadow="sm">
            <Text fontWeight="medium" mb="2">
              Khách hàng mới
            </Text>
            <Text color="gray.500" fontSize="xs">
              Adipisicing elit, sed do eiusmod tempor
            </Text>

            <VStack spacing="4" mt="4" align="stretch">
              {customers.map((customer, index) => (
                <Flex key={index} justify="space-between" align="center" py="2">
                  <Text fontWeight="medium">{customer.name}</Text>
                  <Text color="gray.500">{customer.phone}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Visitors Section */}
          <Box w="32%" bg="white" p="6" rounded="lg" shadow="sm">
            <Flex justify="space-between" mb="2">
              <Text fontWeight="medium">Số lượng khách ghé thăm</Text>
              <Button size="sm" color="blue.600" variant="link">
                xem báo cáo
              </Button>
            </Flex>

            <HStack align="baseline">
              <Heading size="lg">2,568</Heading>
              <HStack color="red.500" fontSize="sm">
                <Icon as={ChevronDown} boxSize="4" />
                <Text>4.75% so với tuần trước</Text>
              </HStack>
            </HStack>
            <Text color="gray.500" fontSize="xs">
              doanh thu từ 10/10/2025
            </Text>

            <Box h="40" mt="4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={visitorData}
                  margin={{ top: 20, right: 20, bottom: 20, left: -20 }}
                >
                  <CartesianGrid stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#6366F1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Flex justify="center" mt="2">
              <HStack spacing="4">
                <HStack>
                  <Box w="3" h="3" rounded="full" bg="blue.600" />
                  <Text fontSize="sm">$ ngày trước</Text>
                </HStack>
                <HStack>
                  <Box w="3" h="3" rounded="full" bg="gray.300" />
                  <Text fontSize="sm">Tuần trước</Text>
                </HStack>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
