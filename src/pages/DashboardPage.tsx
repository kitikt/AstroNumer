import Loading from "@/components/Loading";
import { Badge, Box, Button, Card, CardBody, createListCollection, Flex, Heading, HStack, Icon, Portal, Select, Stack, Stat } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiDollarSign, FiRotateCcw } from "react-icons/fi";
import { AreaChart, CartesianGrid, XAxis, YAxis, Legend, Area, BarChart, Bar, Tooltip } from "recharts";

// Define a type for the revenue data
type RevenueData = { date: string; revenue: number };
type ApplicationData = { month: string; application: number };

const type = createListCollection({
    items: [
        { label: "Tháng", value: "Month" },
        { label: "Năm", value: "Year" },
    ],
})

const monthNames = createListCollection({
    items: Array.from({ length: 12 }, (_, i) => ({
        label: `Tháng ${i + 1}`,
        value: (i + 1).toString(),
    }))
});


// Helper functions
const getDailyRevenueDataForMonth = (data: RevenueData[], month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
        day: i + 1,
        revenue: 0,
    }));

    data.forEach(entry => {
        const entryDate = new Date(entry.date);
        if (entryDate.getMonth() + 1 === month && entryDate.getFullYear() === year) {
            dailyData[entryDate.getDate() - 1].revenue += entry.revenue;
        }
    });

    return dailyData;
};

const getMonthlyRevenueData = (data: RevenueData[]) => {

    const monthlyData = Array(12).fill(0).map((_, index) => ({
        month: monthNames.items[index],
        revenue: 0
    }));

    data.forEach(entry => {
        const date = new Date(entry.date);
        const monthIndex = date.getMonth();
        monthlyData[monthIndex].revenue += entry.revenue;
    });

    return monthlyData;
};

const DashboardPage = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string[]>(['1']);

    // --- Dummy state ---
    const [summaryTotalData, setSummaryTotalData] = useState({
        "user-count": 122,
        "application-count": 35,
        "sum-revenue": 275000000,
    });
    const [summaryTotalLoading, setSummaryTotalLoading] = useState(false);

    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [applicationData, setApplicationData] = useState<ApplicationData[]>([]);
    const [revenueLoading, setRevenueLoading] = useState<boolean>(false);
    const [applicationLoading, setApplicationLoading] = useState<boolean>(false);

    const chartWidth = window.innerWidth - 470;

    const summaryTotalRefetch = () => {
        setSummaryTotalLoading(true);
        setTimeout(() => {
            setSummaryTotalData({
                "user-count": 120 + Math.floor(Math.random() * 20),
                "application-count": 30 + Math.floor(Math.random() * 10),
                "sum-revenue": 250000000 + Math.floor(Math.random() * 50000000),
            });
            setSummaryTotalLoading(false);
        }, 1000);
    };

    const revenueRefetch = () => {
        setRevenueLoading(true);
        setTimeout(() => {
            const dummy: RevenueData[] = [];
            const year = 2024;
            for (let month = 0; month < 12; month++) {
                const days = new Date(year, month + 1, 0).getDate();
                for (let day = 1; day <= days; day++) {
                    dummy.push({
                        date: `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
                        revenue: Math.floor(Math.random() * 20000000),
                    });
                }
            }
            setRevenueData(dummy);
            setRevenueLoading(false);
        }, 1000);
    };

    const applicationRefetch = () => {
        setApplicationLoading(true);
        setTimeout(() => {
            const dummyApp: ApplicationData[] = Array.from({ length: 12 }, (_, i) => ({
                month: `Month ${i + 1}`,
                application: Math.floor(Math.random() * 50),
            }));
            setApplicationData(dummyApp);
            setApplicationLoading(false);
        }, 1000);
    };

    useEffect(() => {
        summaryTotalRefetch();
        revenueRefetch();
        applicationRefetch();
    }, []);

    const lastMonthData = getDailyRevenueDataForMonth(revenueData, parseInt(selectedMonth[0]), 2024);
    const lastYearData = getMonthlyRevenueData(revenueData);

    return (
        <>
            <HStack justify={'center'} gap={10}>
                <Stat.Root borderWidth="1px" p="4" rounded="md" color={'white'} flex={1}>
                    <HStack justify="space-between">
                        <Stat.Label>Doanh thu</Stat.Label>
                        <Icon as={FiDollarSign} />
                    </HStack>
                    <Stat.ValueText>$4.24k</Stat.ValueText>
                    <Badge colorPalette="red" variant="plain" px="0">
                        <Stat.DownIndicator /> 12%
                    </Badge>
                </Stat.Root>
                <Stat.Root borderWidth="1px" p="4" rounded="md" color={'white'} flex={1}>
                    <HStack justify="space-between">
                        <Stat.Label>Doanh thu</Stat.Label>
                        <Icon as={FiDollarSign} />
                    </HStack>
                    <Stat.ValueText>$4.24k</Stat.ValueText>
                    <Badge colorPalette="red" variant="plain" px="0">
                        <Stat.DownIndicator /> 12%
                    </Badge>
                </Stat.Root>
                <Stat.Root borderWidth="1px" p="4" rounded="md" color={'white'} flex={1}>
                    <HStack justify="space-between">
                        <Stat.Label>Doanh thu</Stat.Label>
                        <Icon as={FiDollarSign} />
                    </HStack>
                    <Stat.ValueText>$4.24k</Stat.ValueText>
                    <Badge colorPalette="red" variant="plain" px="0">
                        <Stat.DownIndicator /> 12%
                    </Badge>
                </Stat.Root >
                <Stat.Root borderWidth="1px" p="4" rounded="md" color={'white'} flex={1}>
                    <HStack justify="space-between">
                        <Stat.Label>Doanh thu</Stat.Label>
                        <Icon as={FiDollarSign} />
                    </HStack>
                    <Stat.ValueText>$4.24k</Stat.ValueText>
                    <Badge colorPalette="red" variant="plain" px="0">
                        <Stat.DownIndicator /> 12%
                    </Badge>
                </Stat.Root >
            </HStack>

            <Card.Root w="full" mt={10}>
                <Card.Body bg={'black'} borderRadius={'inherit'}>
                    <Stack gap={10}>
                        <Stack gap={8} mt={3}>
                            <Heading as="h2" size="md">Biểu đồ doanh thu</Heading>
                            <Box w="full">
                                <HStack w="full" justify="space-between" mb={8}>
                                    <Flex w="sm" gap={4}>
                                        <Button onClick={revenueRefetch}><FiRotateCcw /> Tải lại</Button>
                                        <Select.Root
                                            collection={type}
                                            value={selectedPeriod}
                                            onValueChange={(e) => setSelectedPeriod(e.value)}
                                        >
                                            <Select.Control>
                                                <Select.Trigger>
                                                    <Select.ValueText placeholder="Chọn kỳ" color={'white'} />
                                                </Select.Trigger>
                                                <Select.IndicatorGroup>
                                                    <Select.Indicator />
                                                </Select.IndicatorGroup>
                                            </Select.Control>
                                            <Portal>
                                                <Select.Positioner>
                                                    <Select.Content bg={'black'} color={'white'}>
                                                        {type.items.map((framework) => (
                                                            <Select.Item item={framework} key={framework.value}>
                                                                {framework.label}
                                                                <Select.ItemIndicator />
                                                            </Select.Item>
                                                        ))}
                                                    </Select.Content>
                                                </Select.Positioner>
                                            </Portal>
                                        </Select.Root>
                                        {selectedPeriod[0] === 'Month' && (
                                            <Select.Root
                                                collection={monthNames}
                                                value={selectedMonth}
                                                onValueChange={(e) => setSelectedMonth(e.value)}
                                            >
                                                <Select.Control>
                                                    <Select.Trigger>
                                                        <Select.ValueText placeholder="Chọn tháng" color={'white'} />
                                                    </Select.Trigger>
                                                    <Select.IndicatorGroup>
                                                        <Select.Indicator />
                                                    </Select.IndicatorGroup>
                                                </Select.Control>
                                                <Portal>
                                                    <Select.Positioner>
                                                        <Select.Content bg={'black'} color={'white'}>
                                                            {monthNames.items.map((monthName) => (
                                                                <Select.Item item={monthName} key={monthName.value}>
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
                                        data={selectedPeriod[0] === 'Month' ? lastMonthData : lastYearData}
                                        margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey={selectedPeriod[0] === 'Month' ? "day" : "month"} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" name="Doanh thu" />
                                    </AreaChart>
                                ) : (
                                    <Stack h={300}><Loading /></Stack>
                                )}
                            </Box>
                        </Stack>

                        <Stack gap={8}>
                            <Heading as="h2" size="md">Biểu đồ ...</Heading>
                            <Box w="full">
                                <HStack w="full" justify="space-between" mb={5}>
                                    <Flex w="sm" gap={4}>
                                        <Button onClick={applicationRefetch}><FiRotateCcw /> Tải lại</Button>
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
                                        <Bar dataKey="application" fill="#ff7300" name="..." />
                                    </BarChart>
                                ) : (
                                    <Stack h={300}><Loading /></Stack>
                                )}
                            </Box>
                        </Stack>
                    </Stack>
                </Card.Body>
            </Card.Root>
        </>
    )
}

export default DashboardPage;