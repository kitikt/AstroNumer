import { Stack } from "@chakra-ui/react";
import { ComponentType } from "react";

interface FormPageProps {
  FormComponent: ComponentType;
}

const FormPage = ({ FormComponent }: FormPageProps) => {
  return (
    <Stack
      spacing={4}
      padding={4}
      height="81.2vh"
      overflowY="hidden"
      align="center"
    >
      <FormComponent />
    </Stack>
  );
};

export default FormPage;
