import React, { useRef } from "react";
import styles from "@/styles/Header.module.css";
import { Avatar, Box, Button, Heading, HStack, Icon, Popover, Portal, Text } from "@chakra-ui/react";
import { FiLogOut, FiUser } from "react-icons/fi";

const AdminHeader: React.FC = () => {
  const navbarRef = useRef<HTMLHeadElement>(null);

  return (
    <header ref={navbarRef} style={{ position: 'fixed', width: '100vw', zIndex: 99 }}>
      <HStack justify={'space-between'} w={'full'} pl={4} pr={10} bg={'black'}>
        <div className={styles.imageContainer}>
          <img src="/images/logo.png" alt="Logo" className={styles.logo} />
          <Heading className={styles.brandText}>ASTRONUMER</Heading>
        </div>
        <Popover.Root positioning={{ placement: "bottom-end" }}>
          <Popover.Trigger asChild>
            <Button bg={'none'}>
              <Avatar.Root size={'md'}>
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content w={'2xs'}>
                <Popover.Body m={0} p={0}>
                  <Button bg={'none'} p={0} w={'full'} border={0} h={50}>
                    <HStack
                      position="relative"
                      _hover={{ bg: "gainsboro" }}
                      align="center"
                      gap={4}
                      py={0}
                      w={'full'}
                      h={'full'}
                      justify={'center'}
                      borderRadius={'inherit'}
                    >
                      <Box>
                        <Icon as={FiUser} boxSize={5} color="black" />
                      </Box>
                      <Text color={'black'}>
                        Profile
                      </Text>
                    </HStack>
                  </Button>
                  <Button bg={'none'} p={0} w={'full'} border={0} h={50}>
                    <HStack
                      position="relative"
                      _hover={{ bg: "gainsboro" }}
                      align="center"
                      gap={4}
                      w={'full'}
                      h={'full'}
                      justify={'center'}
                      borderRadius={'inherit'}
                    >
                      <Box>
                        <Icon as={FiLogOut} boxSize={5} color="black" />
                      </Box>
                      <Text color={'black'}>
                        Logout
                      </Text>
                    </HStack>
                  </Button>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>

      </HStack>
    </header>
  );
};

export default AdminHeader;
