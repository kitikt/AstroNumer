import ApiClient from "@/services/apiClient";
import { Field } from "@chakra-ui/react";
import { Dialog, Button, Input, Stack, CloseButton } from "@chakra-ui/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toaster } from "@/components/ui/toaster";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { fi } from "zod/v4/locales";
import splitFullName from "@/services/splitName";

const updateDetailAccountSchema = z.object({
    FullName: z.string().optional(),
    LastName: z.string().min(1, "Họ không được để trống"),
    FirstName: z.string().min(1, "Tên không được để trống"),
    PhoneNumber: z.string().min(1, "Số điện thoại không được để trống"),
    Email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
    Roles: z.string().min(1, "Vai trò không được để trống"),
});

type UpdateDetailAccountInputs = z.infer<typeof updateDetailAccountSchema>;

interface UpdateDetailAccountDialogProps {
    userId: string;
    type: "detail" | "update";
}

const UpdateDetailAccountDialog = ({ userId, type }: UpdateDetailAccountDialogProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [fetching, setFetching] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<UpdateDetailAccountInputs>({
        resolver: zodResolver(updateDetailAccountSchema),
        defaultValues: {
            FullName: "",
            LastName: "",
            FirstName: "",
            PhoneNumber: "",
            Email: "",
            Roles: "",
        },
    });

    let FirstName: string = "";
    let LastName: string = "";

    const fetchAccountDetail = async () => {
        const api = new ApiClient<any>("/users");
        try {
            const response = await api.getDetail(userId);

            if (response.Success) {
                ({ FirstName, LastName } = splitFullName(response.Data.FullName));
                reset({ ...response.Data, FirstName, LastName });
                setValue("Roles", response.Data.Roles[0]);
            } else {
                toaster.create({
                    title: "Lỗi",
                    description: response.message || "Không thể lấy thông tin người dùng",
                    type: "error",
                    duration: 4000,
                });
            }
        } catch {
            toaster.create({
                title: "Lỗi",
                description: "Đã xảy ra lỗi khi lấy thông tin người dùng",
                type: "error",
                duration: 4000,
            });
        }
    };

    useEffect(() => {
        if (open && userId) {
            fetchAccountDetail();
        }
    }, [open, userId, type, reset]);

    const updateAccount = async (data: UpdateDetailAccountInputs) => {
        const api = new ApiClient<any>("/users");
        try {
            const response = await api.updateWithIdAndData(userId, data);
            console.log(response);

            if (response.Success) {
                toaster.create({
                    title: "Cập nhật thành công",
                    description: "Tài khoản đã được cập nhật",
                    type: "success",
                    duration: 4000,
                });
                setOpen(false);
            } else {
                toaster.create({
                    title: "Thao tác thất bại",
                    description: response.message || "Đã xảy ra lỗi",
                    type: "error",
                    duration: 4000,
                });
            }
        } catch {
            toaster.create({
                title: "Lỗi",
                description: "Đã xảy ra lỗi, vui lòng thử lại sau",
                type: "error",
                duration: 4000,
            });
        }
    };

    return (
        <Dialog.Root open={open} placement="center" motionPreset="slide-in-bottom" size="md" isLazy>
            <Dialog.Trigger asChild>
                <Button
                    onClick={() => setOpen(true)}
                    borderRadius="full"
                    px={1}
                    colorPalette={type === "detail" ? "cyan" : "yellow"}
                    variant="ghost"
                >
                    {type === "detail" ? <FaUser /> : <FaUserEdit />}
                </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bg="black" color="white" borderRadius="md">
                    <Dialog.CloseTrigger asChild>
                        <CloseButton
                            onClick={() => setOpen(false)}
                            color="white"
                            _hover={{ bg: "#dcdcdc24" }}
                            borderRadius="full"
                        />
                    </Dialog.CloseTrigger>
                    <Dialog.Header justifyContent="center" alignItems="center">
                        <Dialog.Title textAlign="center" color="white">
                            {type === "detail" ? "Thông tin tài khoản" : "Cập nhật tài khoản"}
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body mx={4}>
                        <form onSubmit={handleSubmit(updateAccount)}>
                            <Stack gap={2}>
                                <Field.Root invalid={!!errors.FirstName}>
                                    <Field.Label color="white">Tên <Field.RequiredIndicator /></Field.Label>
                                    <Input placeholder="Nhập tên" {...register("FirstName")} readOnly={type === 'detail' && true} />
                                    <Field.ErrorText>{errors.FirstName?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.LastName}>
                                    <Field.Label color="white">Họ <Field.RequiredIndicator /></Field.Label>
                                    <Input placeholder="Nhập họ" {...register("LastName")} readOnly={type === 'detail' && true} />
                                    <Field.ErrorText>{errors.LastName?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.PhoneNumber}>
                                    <Field.Label color="white">Số điện thoại <Field.RequiredIndicator /></Field.Label>
                                    <Input placeholder="Nhập số điện thoại" {...register("PhoneNumber")} readOnly={type === 'detail' && true} />
                                    <Field.ErrorText>{errors.PhoneNumber?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.Email}>
                                    <Field.Label color="white">Email <Field.RequiredIndicator /></Field.Label>
                                    <Input type="email" placeholder="Nhập email" {...register("Email")} readOnly={type === 'detail' && true} />
                                    <Field.ErrorText>{errors.Email?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label color="white">Vai trò <Field.RequiredIndicator /></Field.Label>
                                    <Input type="text" {...register("Roles")} readOnly />
                                </Field.Root>
                                {type === "update" && (
                                    <Button colorScheme="teal" type="submit" mt={4} isLoading={isSubmitting}>
                                        Cập nhật tài khoản
                                    </Button>
                                )}
                            </Stack>
                        </form>
                    </Dialog.Body>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root >
    );
};

export default UpdateDetailAccountDialog;
