import { Box } from "@chakra-ui/react";
import { DividerProps } from "./VerticalDivider";

const Divider: React.FC<DividerProps> = () => {
  return (
    <Box
      height="2px"
      width="100%"
      background="linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(237, 250, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)"
      boxShadow="0 0 15px rgba(255, 255, 255, 0.7)"
      margin="30px auto"
    />
  );
};

export default Divider;
