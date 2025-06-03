import {
    Button,
    Card,
    HStack,
    Icon,
    Stack,
    Table,
    Tag,
} from "@chakra-ui/react";
import { FaChevronRight, FaLock, FaLockOpen } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ApiClient from "@/services/apiClient";

interface Account {
    Id: number;
    FullName: string
    Email: string;
    PhoneNumber: string;
    Roles: string[];
    IsActive: boolean;
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

const AccountManagementPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [id, setId] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();

    const getAllUser = async () => {
        const api = new ApiClient<any>("/users");
        try {
            const response = await api.getAuthen();
            console.log("Response:", response);
            if (response.Success) {
                setAccounts(response.Data.Data);
            } else {
                console.error("Failed to fetch accounts:", response.message);
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    }

    // Tạo 7 dòng dummy dữ liệu tài khoản
    // const generateDummyAccounts = (): Account[] => {
    //     const roles = ["admin", "user", "manager"];
    //     const statuses = ["ACTIVE", "INACTIVE"];

    //     return Array.from({ length: 7 }, (_, i) => ({
    //         id: i + 1,
    //         email: `user${i + 1}@example.com`,
    //         accountRole: roles[i % roles.length] as Account["accountRole"],
    //         status: statuses[i % statuses.length] as Status,
    //     }));
    // };

    const filteredAccounts = accounts.filter((account) =>
        account.Email.toLowerCase().includes(keyword.toLowerCase())
    );

    useEffect(() => {
        getAllUser();
        // setAccounts(dummyData);
    }, []);

    return (
        <Stack w={"full"} align="center" mx="auto" my={5} gap={10}>
            {/* <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Tìm kiếm Email..."
                    variant="filled"
                    border='1px solid gainsboro'
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                />
            </InputGroup> */}
            <Stack w={"full"}>
                <Card.Root bg={"black"}>
                    <Card.Header py={3} border={"1px solid gainsboro"}>
                        <HStack w={"full"} justify={"flex-end"} gap={5}>
                            <Button colorPalette="blue">
                                <FaPlus /> Tạo
                            </Button>
                        </HStack>
                    </Card.Header>
                    <Table.Root w="full" overflowY="auto" whiteSpace="normal">
                        <Table.Header>
                            <Table.Row bg={"black"} borderColor={"gainsboro"}>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    ID
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    Họ và Tên
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    Số Điện Thoại
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    Email
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    Vai Trò
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    Trạng thái
                                </Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center" color={"white"}>
                                    Hành Động
                                </Table.ColumnHeader>
                                <Table.ColumnHeader
                                    textAlign="center"
                                    color={"white"}
                                ></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body bg={"black"}>
                            {filteredAccounts.length !== 0 ? (
                                filteredAccounts.map((account, index) => (
                                    <Table.Row
                                        key={index}
                                        bg={"black"}
                                        _hover={{ bg: "#dcdcdc24" }}
                                    >
                                        <Table.Cell textAlign="center" color={"white"}>
                                            {account.Id}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" color={"white"}>
                                            {account.FullName}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" color={"white"}>
                                            {account.PhoneNumber}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" color={"white"}>
                                            {account.Email}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" color={"white"}>
                                            {account.Roles[0]}
                                        </Table.Cell>
                                        <Table.Cell textAlign="center" color={"white"}>
                                            <Tag.Root
                                                colorPalette={
                                                    account.IsActive ? "green" : "red"
                                                }
                                            >
                                                <Tag.Label>{account.IsActive ? "ACTIVE" : "INACTIVE"}</Tag.Label>
                                            </Tag.Root>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button
                                                borderRadius="full"
                                                px={1}
                                                colorPalette={
                                                    account.IsActive ? "red" : "green"
                                                }
                                                variant="ghost"
                                                onClick={() => {
                                                    setId(account.Id);
                                                    if (account.IsActive) {
                                                        setStatus(false);
                                                    } else {
                                                        setStatus(true);
                                                    }
                                                }}
                                            >{account.IsActive ? <FaLock /> : <FaLockOpen />}</Button>
                                        </Table.Cell>
                                        <Table.Cell
                                            textAlign="center"
                                            cursor="pointer"
                                            onClick={() => navigate(account.Id.toString())}
                                        >
                                            <Icon as={FaChevronRight} color={"white"} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row bg={"black"}>
                                    <Table.Cell colSpan={6} color={"white"} textAlign="center">
                                        Không có tài khoản nào
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Root>
                </Card.Root>
            </Stack>
        </Stack>
    );
};

export default AccountManagementPage;
