import React, { useEffect, useState } from "react";
import Divider from "@/components/Divider";
import { Toaster, toaster } from "@/components/ui/toaster";

interface ServicePackage {
  Id: number;
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
  console.log(addonPackages);

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );

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

  const handleBuy = async (serviceId: number, quantity: number) => {
    try {
     // const Id = JSON.parse(localStorage.getItem("userId") || "null");
          const Id = localStorage.getItem("userId") ?? null;

            console.log(Id);

      if (!Id) {
        toaster.create({
          title: "Chưa đăng nhập",
          description: "Vui lòng đăng nhập để tiếp tục.",
          type: "warning",
          duration: 4000,
        });
        return;
      }
      console.log(serviceId, quantity);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/payment/create-link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            Id: Id, // string
            ServiceId: serviceId, // number
            quantity: quantity, // number
          }),
        }
      );

      const result = await response.json();

      if (result?.Success && result?.Data?.PaymentUrl) {
        window.location.href = result.Data.PaymentUrl;
      } else {
        alert("Không thể tạo link thanh toán.");
        console.error(result);
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi tạo thanh toán.");
      console.error(error);
    }
  };

  return (
    <div className="!w-full !px-6 !py-10 !text-center">
      <Toaster />
      <div className="!mb-12">
        <h2 className="!text-4xl !font-bold !text-indigo-700">DỊCH VỤ VIP</h2>
        <p className="!mt-6 !text-white !max-w-2xl !mx-auto">
          Astro Numer cung cấp các gói dịch vụ cao cấp, giúp bạn hiểu rõ hơn về
          bản thân và định hướng tương lai qua Thần Số Học, Bản Đồ Sao và các
          công cụ tâm linh khác.
        </p>
      </div>

      <Divider />

      <div className="!my-12">
        <h3 className="!text-2xl !font-semibold !text-indigo-600 !mb-6">
          GÓI PREMIUM
        </h3>
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6">
          {premiumPackages.map((item, idx) => (
            <div
              key={idx}
              className="!border backdrop-blur-xl !rounded-2xl !p-6 !shadow hover:!shadow-lg !transition !duration-300 !flex !flex-col !items-center"
            >
              <p className="!text-lg !font-medium !mb-1">{item.Name}</p>
              <p className="!text-sm !text-gray-300 !mb-2">
                {item.Description}
              </p>
              <p className="!text-xl !font-bold !text-indigo-600 !mb-4">
                {item.Price.toLocaleString()} VND
              </p>
              <button
                className="!bg-indigo-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-indigo-700"
                onClick={() => handleBuy(item.Id, 1)}
              >
                Mua ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div className="!mt-12">
        <h3 className="!text-2xl !font-semibold !text-indigo-600 !mb-6">
          GÓI MỞ RỘNG
        </h3>
        <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-6">
          {addonPackages.map((item, idx) => (
            <div
              key={idx}
              className="!border backdrop-blur-xl !rounded-2xl !p-6 !shadow hover:!shadow-lg !transition !duration-300 !flex !flex-col !items-center"
            >
              <p className="!font-medium !mb-1">{item.Name}</p>
              <p className="!text-sm !text-gray-300 !mb-2">
                {item.Description}
              </p>
              <p className="!text-indigo-600 !font-bold !mb-4">
                {item.Price.toLocaleString()} VND / lần
              </p>
              <button
                className="!bg-indigo-600 !text-white !px-4 !py-2 !rounded-lg hover:!bg-indigo-700"
                onClick={() => {
                  setSelectedServiceId(item.Id);
                  setQuantity(1);
                  setShowModal(true);
                }}
              >
                Mua ngay
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal nhập số lượng */}
      {showModal && (
        <div className="!fixed !inset-0 !bg-black !bg-opacity-50 !flex !items-center !justify-center !z-50">
          <div className="!bg-white !p-6 !rounded-xl !w-full !max-w-sm">
            <h3 className="!text-lg !font-bold !mb-4 !text-indigo-700">
              Nhập số lượng muốn mua
            </h3>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="!w-full !border !rounded !px-3 !py-2 !mb-4"
            />
            <div className="!flex !justify-end !gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="!px-4 !py-2 !bg-gray-300 !rounded hover:!bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (selectedServiceId !== null) {
                    handleBuy(selectedServiceId, quantity);
                    setShowModal(false);
                  }
                }}
                className="!px-4 !py-2 !bg-indigo-600 !text-white !rounded hover:!bg-indigo-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
