import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Grid, Button, Center } from "@chakra-ui/react";
import Divider from "@/components/Divider";

interface ServicePackage {
  Name: string;
  ServiceTypeId: number;
  Description: string;
  Price: number;
  DurationInDays: number;
  MaxUsage: number;
  IsCombo: boolean;
}

const Service = () => {
  const [premiumPackages, setPremiumPackages] = useState<ServicePackage[]>([]);
  const [addonPackages, setAddonPackages] = useState<ServicePackage[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/service-package?page-size=100`
        );
        const result = await response.json();
        const services: ServicePackage[] = result.Data.Data;

        const premium = services
          .filter((pkg) => pkg.ServiceTypeId === 1)
          .sort((a, b) => a.DurationInDays - b.DurationInDays);
        const addon = services.filter((pkg) => pkg.ServiceTypeId === 2);

        setPremiumPackages(premium);
        setAddonPackages(addon);
      } catch (error) {
        console.error("Error fetching service packages:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <Box w="full" px={6} py={10} textAlign="center">
      <VStack mb={12} spacing={6}>
        <Text fontSize="4xl" fontWeight="bold" color="indigo.700">
          DỊCH VỤ VIP
        </Text>
        <Text color="white" maxW="2xl" mx="auto">
          Astro Numer cung cấp các gói dịch vụ cao cấp, giúp bạn hiểu rõ hơn về
          bản thân và định hướng tương lai qua Thần Số Học, Bản Đồ Sao và các
          công cụ tâm linh khác.
        </Text>
      </VStack>

      <Divider />

      <Box my={12}>
        <Text fontSize="2xl" fontWeight="semibold" color="indigo.600" mb={6}>
          GÓI PREMIUM
        </Text>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {premiumPackages.map((item, idx) => (
            <Box
              key={idx}
              borderWidth={1}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              p={6}
              shadow="md"
              _hover={{ shadow: "lg" }}
              transition="all 0.3s"
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="medium" mb={1}>
                {item.Name}
              </Text>
              <Text fontSize="sm" color="gray.300" mb={2}>
                {item.Description}
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="indigo.600" mb={4}>
                {item.Price.toLocaleString()} VND
              </Text>
              <Button
                bg="indigo.600"
                color="white"
                px={4}
                py={2}
                rounded="lg"
                _hover={{ bg: "indigo.700" }}
              >
                Mua ngay
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>

      <Divider />

      <Box mt={12}>
        <Text fontSize="2xl" fontWeight="semibold" color="indigo.600" mb={6}>
          GÓI MỞ RỘNG
        </Text>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          {addonPackages.map((item, idx) => (
            <Box
              key={idx}
              borderWidth={1}
              backdropFilter="blur(20px)"
              borderRadius="2xl"
              p={6}
              shadow="md"
              _hover={{ shadow: "lg" }}
              transition="all 0.3s"
              textAlign="center"
            >
              <Text fontWeight="medium" mb={1}>
                {item.Name}
              </Text>
              <Text fontSize="sm" color="gray.300" mb={2}>
                {item.Description}
              </Text>
              <Text color="indigo.600" fontWeight="bold" mb={4}>
                {item.Price.toLocaleString()} VND / lần
              </Text>
              <Button
                bg="indigo.600"
                color="white"
                px={4}
                py={2}
                rounded="lg"
                _hover={{ bg: "indigo.700" }}
              >
                Mua ngay
              </Button>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Service;
