import ApiClient from "@/services/apiClient";
import { Field } from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";
import * as z from "zod";
import { CloseButton } from "@chakra-ui/react";
import { Button, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { toaster } from "@/components/ui/toaster";

const createAccountSchema = z.object({
    lastName: z.string().min(1, "Họ không được để trống"),
    firstName: z.string().min(1, "Tên không được để trống"),
    phone: z.string().min(1, "Số điện thoại không được để trống"),
    email: z.string().min(1, "Email không được để trống").email("Email không hợp lệ"),
});

type CreateAccountInputs = z.infer<typeof createAccountSchema>;

const CreateAccountDialog = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAccountInputs>(
        {
            resolver: zodResolver(createAccountSchema),
            defaultValues: {
                lastName: "",
                firstName: "",
                phone: "",
                email: "",
            },
        }
    );

    const onSubmit = async (data: any) => {
        const api = new ApiClient<any>("/users");
        try {
            const response = await api.create(data);
            console.log("Response:", response);

            if (response.Success) {
                toaster.create({
                    title: "Tạo tài khoản thành công",
                    description: "Tài khoản đã được tạo thành công",
                    type: "success",
                    duration: 4000,
                });
            } else {
                toaster.create({
                    title: "Tạo tài khoản thất bại",
                    description: response.message || "Đã xảy ra lỗi khi tạo tài khoản",
                    type: "error",
                    duration: 4000,
                });
            }
        } catch (error) {
            toaster.create({
                title: "Lỗi khi tạo tài khoản",
                description: "Đã xảy ra lỗi khi tạo tài khoản, vui lòng thử lại sau",
                type: "error",
                duration: 4000,
            });
        }
    };

    return (
        <Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
            size="md"
        >
            <Dialog.Trigger asChild>
                <Button variant="ghost" color={"white"} _hover={{ bg: "#dcdcdc24" }}>
                    <FaPlus /> Tạo mới
                </Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content bg="black" color="white" borderRadius="md">
                    <Dialog.CloseTrigger asChild>
                        <CloseButton color={"white"} _hover={{ bg: "#dcdcdc24" }} borderRadius={'full'} />
                    </Dialog.CloseTrigger>
                    <Dialog.Header justifyContent="center" alignItems="center">
                        <Dialog.Title textAlign="center" color="white">Tạo mới tài khoản</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body mx={4}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack gap={2}>
                                <Field.Root invalid={!!errors.firstName}>
                                    <Field.Label color="white">
                                        Tên
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Nhập tên"
                                        {...register("firstName")}
                                    />
                                    <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={!!errors.lastName}>
                                    <Field.Label color="white">
                                        Họ
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Nhập họ"
                                        {...register("lastName")}
                                    />
                                    <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={!!errors.phone}>
                                    <Field.Label color="white">
                                        Số điện thoại
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Nhập số điện thoại"
                                        {...register("phone")}
                                    />
                                    <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                                </Field.Root>
                                <Field.Root invalid={!!errors.email}>
                                    <Field.Label color="white">
                                        Email
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        type="email"
                                        placeholder="Nhập email"
                                        {...register("email")}
                                    />
                                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                                </Field.Root>
                                <Button colorScheme="teal" type="submit" mt={4} disabled={isSubmitting}>
                                    {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
                                </Button>
                            </Stack>
                        </form>
                    </Dialog.Body>
                    <Dialog.Footer />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}

export default CreateAccountDialog;