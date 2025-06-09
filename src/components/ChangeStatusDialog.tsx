import ApiClient from "@/services/apiClient";
import { Text } from "@chakra-ui/react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import { i } from "framer-motion/client";
import { use, useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { toaster } from "./ui/toaster";

interface ChangeStatusDialogProps {
    isActive: boolean;
    userId: string;
}

const ChangeStatusDialog = ({ isActive, userId }: ChangeStatusDialogProps) => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleChangeStatus = async (isActive: boolean, userId: string) => {
        setIsSubmitting(true);
        const api: ApiClient<any> = new ApiClient<any>(`/users`);
        let status: string;
        if (isActive) {
            status = 'deactivate';
        } else {
            status = 'activate';
        }
        try {
            const response = await api.patchStatus(userId, status);
            console.log("Response:", response);

            if (response.Success) {
                toaster.create({
                    title: "Success",
                    description: response.Message || `Tài khoản đã được ${status} thành công!`,
                    type: "success",
                    duration: 4000,
                });
                console.log("Status changed successfully:", response);
                setOpen(false);
            } else {
                toaster.create({
                    title: "Error",
                    description: response.Message || `Thất bại khi ${status} tài khoản!`,
                    type: "error",
                    duration: 4000,
                });
                console.error("Failed to change status:", response.message);
                // Handle failure (e.g., show an error message)
            }
        } catch (error: any) {
            toaster.create({
                title: "Error",
                description: `Thất bại khi ${status} tài khoản: ${error.message || "Đã xảy ra lỗi"}`,
                type: "error",
                duration: 4000,
            });
            console.error("Error changing status:", error);
            // Handle error (e.g., show an error message)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root role="alertdialog" placement="center" size="sm" open={open}>
            <Dialog.Trigger asChild onClick={() => setOpen(true)}>
                <Button
                    borderRadius="full"
                    px={1}
                    colorPalette={
                        isActive ? "red" : "green"
                    }
                    variant="ghost"
                >{isActive ? <FaLock /> : <FaLockOpen />}</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content bg="black">
                        <Dialog.Header>
                            <Dialog.Title>Bạn có chắc chắn?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            {isActive ? (
                                <Text>
                                    Bạn có chắc chắn muốn vô hiệu hóa tài khoản này không?
                                </Text>
                            ) : (
                                <Text>
                                    Bạn có chắc chắn muốn kích hoạt tài khoản này không?
                                </Text>
                            )}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild onClick={() => setOpen(false)}>
                                <Button variant="outline" color={'white'} _hover={{ bg: "#dcdcdc24" }}>Đóng</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="red"
                                onClick={() => handleChangeStatus(isActive, userId)}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Đang xử lí...' : isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ChangeStatusDialog;