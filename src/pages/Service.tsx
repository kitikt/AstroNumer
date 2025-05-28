import React, { useEffect, useState } from "react";
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
        const response = await fetch("http://160.191.51.56:8081/api/v1/service-package?page-size=100");
        const result = await response.json();
        const services: ServicePackage[] = result.Data.Data;

        const premium = services.filter(pkg => pkg.ServiceTypeId === 1).sort((a, b) => a.DurationInDays - b.DurationInDays);
        const addon = services.filter(pkg => pkg.ServiceTypeId === 2);

        setPremiumPackages(premium);
        setAddonPackages(addon);
      } catch (error) {
        console.error("Error fetching service packages:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="!w-full !px-6 !py-10 !text-center">
      <div className="!mb-12">
        <h2 className="!text-4xl !font-bold !text-indigo-700">DỊCH VỤ VIP</h2>
        <p className="!mt-6 !text-white !max-w-2xl !mx-auto">
          Astro Numer cung cấp các gói dịch vụ cao cấp, giúp bạn hiểu rõ hơn về bản thân và định
          hướng tương lai qua Thần Số Học, Bản Đồ Sao và các công cụ tâm linh khác.
        </p>
      </div>

      <Divider />

      <div className="!my-12">
        <h3 className="!text-2xl !font-semibold !text-indigo-600 !mb-6">GÓI PREMIUM</h3>
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6">
          {premiumPackages.map((item, idx) => (
            <div
              key={idx}
              className="!border backdrop-blur-xl !rounded-2xl !p-6 !shadow hover:!shadow-lg !transition !duration-300 !flex !flex-col !items-center"
            >
              <p className="!text-lg !font-medium !mb-1">{item.Name}</p>
              <p className="!text-sm !text-gray-300 !mb-2">{item.Description}</p>
              <p className="!text-xl !font-bold !text-indigo-600 !mb-4">{item.Price.toLocaleString()} VND</p>
              <button className="!bg-indigo-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-indigo-700">
                Mua ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="!mt-12">
        <h3 className="!text-2xl !font-semibold !text-indigo-600 !mb-6">GÓI MỞ RỘNG</h3>
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6 ">
          {addonPackages.map((item, idx) => (
            <div
              key={idx}
              className="!border backdrop-blur-xl !rounded-2xl !p-6 !shadow hover:!shadow-lg !transition !duration-300 !flex !flex-col !items-center"
            >
              <p className="!font-medium !mb-1">{item.Name}</p>
              <p className="!text-sm !text-gray-300 !mb-2">{item.Description}</p>
              <p className="!text-indigo-600 !font-bold !mb-4">{item.Price.toLocaleString()} VND / lần</p>
              <button className="!bg-indigo-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-indigo-700">
                Mua ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
