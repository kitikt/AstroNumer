import { Box, BoxProps } from "@chakra-ui/react";

export interface DividerProps extends BoxProps {
  width?: string;

  height?: string;
}

const VerticalDivider: React.FC<DividerProps> = ({
  width = "2px",
  height = "100%",
  ...rest
}) => {
  return (
    <Box
      as="div"
      width={width}
      height={height}
      background="linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(237, 250, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%)"
      boxShadow="0 0 15px rgba(255, 255, 255, 0.7)"
      mx={4}
      my={0}
      {...rest}
    />
  );
};

export default VerticalDivider;
