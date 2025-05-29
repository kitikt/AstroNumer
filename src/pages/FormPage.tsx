import FormHome from "@/components/ui/FormHome";
import { Stack } from "@chakra-ui/react";

const FormPage = () => {
  const handleClose = () => {
    console.log("Form closed");
  };

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  return (
    <Stack
      spacing={4}
      padding={4}
      height="81.2vh"
      overflowY="hidden" // This should hide the scrollbar for Stack
      align="center" // Center the FormHome component
    >
      <FormHome onClose={handleClose} onSubmit={handleSubmit} />
    </Stack>
  );
};

export default FormPage;
