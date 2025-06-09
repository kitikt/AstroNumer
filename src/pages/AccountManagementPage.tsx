import {
    Button,
    Card,
    HStack,
    Icon,
    Stack,
    Table,
    Tag,
} from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "@/services/apiClient";
import CreateAccountDialog from "./CreateAccountDialog";
import ChangeStatusDialog from "@/components/ChangeStatusDialog";
import UpdateDetailAccountDialog from "./UpdateDetailAccountDialog";

interface Account {
    Id: string;
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
    const [keyword, setKeyword] = useState<string>("");
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();

    const getAllUser = async () => {
        const api = new ApiClient<any>("/users");
        try {
            const response = await api.getAuthen();
            if (response.Success) {
                setAccounts(response.Data.Data);
            } else {
                console.error("Failed to fetch accounts:", response.message);
            }
        } catch (error) {
            console.error("Error fetching accounts:", error);
        }
    }

    const filteredAccounts = accounts.filter((account) =>
        account.Email.toLowerCase().includes(keyword.toLowerCase())
    );

    useLayoutEffect(() => {
        getAllUser();
    }, [accounts]);

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
                            <CreateAccountDialog />
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
                                            <ChangeStatusDialog
                                                isActive={account.IsActive}
                                                userId={account.Id}
                                            />
                                            <UpdateDetailAccountDialog
                                                userId={account.Id}
                                                type="detail"
                                            />
                                            {account.Roles[0] === "Admin" && (
                                                <UpdateDetailAccountDialog
                                                    userId={account.Id}
                                                    type="update"
                                                />
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row bg={"black"}>
                                    <Table.Cell colSpan={7} color={"white"} textAlign="center">
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
