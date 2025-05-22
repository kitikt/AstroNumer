import {
    Button, Card, HStack, Icon, Input, InputGroup,
    Stack, Table, Tag, TagLabel
} from "@chakra-ui/react";
import { FaArrowRightArrowLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { Tooltip } from "@/components/Tooltip";

interface Account {
    id: number;
    email: string;
    accountRole: 'admin' | 'user' | 'manager';
    status: Status;
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}


const AccountManagementPage = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [id, setId] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>('');
    const [status, setStatus] = useState<Status>(Status.INACTIVE);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();

    // Tạo 7 dòng dummy dữ liệu tài khoản
    const generateDummyAccounts = (): Account[] => {
        const roles = ['admin', 'user', 'manager'];
        const statuses = ["ACTIVE", "INACTIVE"];

        return Array.from({ length: 7 }, (_, i) => ({
            id: i + 1,
            email: `user${i + 1}@example.com`,
            accountRole: roles[i % roles.length] as any,
            status: statuses[i % statuses.length] as any,
        }));
    };

    let filteredAccounts = accounts.filter((account) =>
        account.email.toLowerCase().includes(keyword.toLowerCase())
    );


    useEffect(() => {
        const dummyData = generateDummyAccounts();
        setAccounts(dummyData);
    }, []);

    return (
        <Stack w={'full'} align='center' mx='auto' my={5} gap={10}>
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
            <Stack w={'full'}>
                <Card.Root bg={'black'}>
                    <Card.Header py={3} border={'1px solid gainsboro'}>
                        <HStack w={'full'} justify={'flex-end'} gap={5}>
                            <Button colorPalette="blue"><AddIcon /> Tạo</Button>
                        </HStack>
                    </Card.Header>
                    <Table.Root w='full' overflowY="auto" whiteSpace='normal'>
                        <Table.Header>
                            <Table.Row bg={'black'} borderColor={'gainsboro'}>
                                <Table.ColumnHeader textAlign='center' color={'white'}>ID</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign='center' color={'white'}>Email</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign='center' color={'white'}>Vai Trò</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign='center' color={'white'}>Trạng thái</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign='center' color={'white'}>Hành Động</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign='center' color={'white'}></Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body bg={'black'}>
                            {filteredAccounts.length !== 0 ? (
                                filteredAccounts.map((account, index) => (
                                    <Table.Row key={index} bg={'black'} _hover={{ bg: 'gray.100' }}>
                                        <Table.Cell textAlign="center" color={'white'}>{account.id}</Table.Cell>
                                        <Table.Cell textAlign="center" color={'white'}>{account.email}</Table.Cell>
                                        <Table.Cell textAlign="center" color={'white'}>{account.accountRole}</Table.Cell>
                                        <Table.Cell textAlign="center" color={'white'}>
                                            <Tag.Root colorPalette={account.status === Status.ACTIVE ? "green" : "red"}>
                                                <Tag.Label>{account.status}</Tag.Label>
                                            </Tag.Root>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button
                                                borderRadius="full"
                                                px={3}
                                                colorPalette={account.status === Status.INACTIVE ? 'red' : 'green'}
                                                variant="ghost"
                                                onClick={() => {
                                                    setId(account.id);
                                                    if (account.status === Status.ACTIVE) {
                                                        setStatus(Status.INACTIVE);
                                                    } else {
                                                        setStatus(Status.ACTIVE);
                                                    }
                                                }}
                                            >
                                                <Tooltip
                                                    content={account.status === Status.INACTIVE ? 'Activate user' : 'Deactivate user'}
                                                >
                                                    <span><Icon as={FaArrowRightArrowLeft} /></span>
                                                </Tooltip>
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell
                                            textAlign="center"
                                            cursor="pointer"
                                            onClick={() => navigate(account.id.toString())}
                                        >
                                            <Icon as={FaChevronRight} color={'white'} />
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell colSpan={6} textAlign="center">
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
