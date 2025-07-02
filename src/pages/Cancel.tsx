import React, { useState, useEffect } from "react";
import {
  XCircle,
  ArrowLeft,
  AlertTriangle,
  Clock,
  ShoppingCart,
} from "lucide-react";

type CustomerInfo = {
  name?: string;
  phone?: string;
  email?: string;
};

type OrderItem = {
  name: string;
  quantity: number;
  price: number | string;
};

type OrderData = {
  orderId: string;
  amount: string;
  items: OrderItem[];
  timestamp: string;
  customerInfo: CustomerInfo;
  paymentMethod: string;
  cancelReason: string;
  expiryTime: number | null;
  savedForLater?: boolean;
};

const PaymentCancelPage = () => {
  const [orderData, setOrderData] = useState<OrderData>({
    orderId: "",
    amount: "",
    items: [],
    timestamp: "",
    customerInfo: {},
    paymentMethod: "",
    cancelReason: "",
    expiryTime: null,
  });
  const [timeRemaining, setTimeRemaining] = useState(900);

  useEffect(() => {
    const loadOrderData = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const cancel = urlParams.get("cancel");
        const orderCode = urlParams.get("orderCode");

        const storedData = JSON.parse(
          localStorage.getItem("pendingOrder") || "{}"
        );
        const cartData = JSON.parse(localStorage.getItem("cartItems") || "[]");

        const finalOrderData = {
          orderId:
            orderCode ||
            storedData.orderId ||
            urlParams.get("orderId") ||
            "ORD-" + Date.now(),
          amount: storedData.amount || urlParams.get("amount") || "0",
          paymentMethod: storedData.paymentMethod || "PayOS",
          customerInfo: storedData.customerInfo || {
            name: urlParams.get("buyerName") || storedData.buyerName || "",
            phone: urlParams.get("buyerPhone") || storedData.buyerPhone || "",
            email: urlParams.get("buyerEmail") || storedData.buyerEmail || "",
          },
          items: storedData.items ||
            cartData || [
              {
                name: "Sản phẩm mẫu",
                quantity: 1,
                price: storedData.amount || "0",
              },
            ],
          timestamp: new Date().toLocaleString("vi-VN"),
          cancelReason: cancel === "true" ? "Người dùng hủy" : "Lỗi hệ thống",
          expiryTime: storedData.expiryTime || Date.now() + 15 * 60 * 1000,
        };

        setOrderData(finalOrderData);

        const remaining = Math.max(
          0,
          Math.floor((finalOrderData.expiryTime - Date.now()) / 1000)
        );
        setTimeRemaining(remaining);
      } catch (error) {
        console.error("Error loading order data:", error);
        setOrderData({
          orderId: "ERROR-" + Date.now(),
          amount: "0",
          items: [],
          timestamp: new Date().toLocaleString("vi-VN"),
          customerInfo: {},
          paymentMethod: "",
          cancelReason: "Lỗi tải dữ liệu",
          expiryTime: null,
        });
      }
    };

    loadOrderData();

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleBackToHome = () => {
    localStorage.removeItem("pendingOrder");
    window.location.href = "/";
  };

  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-orange-50 !to-red-100 !flex !items-center !justify-center !p-4">
      <div className="!bg-white !rounded-2xl !shadow-xl !p-8 !max-w-md !w-full">
        <div className="!text-center !mb-6">
          <XCircle className="!w-20 !h-20 !text-orange-500 !mx-auto !mb-4" />
          <h1 className="!text-3xl !font-bold !text-gray-800 !mb-2">
            Thanh toán đã hủy
          </h1>
          <p className="!text-gray-600">Bạn đã hủy giao dịch thanh toán</p>
        </div>

        <div className="!bg-gray-50 !rounded-xl !p-4 !mb-6">
          <h3 className="!font-semibold !text-gray-800 !mb-3 !flex !items-center !gap-2">
            <ShoppingCart className="!w-5 !h-5" />
            Thông tin đơn hàng
          </h3>
          <div className="!space-y-2 !text-sm">
            <div className="!flex !justify-between">
              <span className="!text-gray-600">Mã đơn hàng:</span>
              <span className="!font-semibold">{orderData.orderId}</span>
            </div>
            {orderData.paymentMethod && (
              <div className="!flex !justify-between">
                <span className="!text-gray-600">Phương thức:</span>
                <span className="!font-semibold !text-blue-600">
                  {orderData.paymentMethod}
                </span>
              </div>
            )}
            {orderData.cancelReason && (
              <div className="!flex !justify-between">
                <span className="!text-gray-600">Lý do hủy:</span>
                <span className="!font-semibold !text-red-600">
                  {orderData.cancelReason}
                </span>
              </div>
            )}
            {orderData.customerInfo.name && (
              <div className="!pt-2 !border-t !border-gray-300">
                <div className="!flex !justify-between">
                  <span className="!text-gray-600">Khách hàng:</span>
                  <span className="!font-semibold">
                    {orderData.customerInfo.name}
                  </span>
                </div>
                {orderData.customerInfo.phone && (
                  <div className="!flex !justify-between">
                    <span className="!text-gray-600">SĐT:</span>
                    <span className="!font-semibold">
                      {orderData.customerInfo.phone}
                    </span>
                  </div>
                )}
              </div>
            )}
            {orderData.items.length > 0 && (
              <div className="!pt-2 !border-t !border-gray-300">
                <span className="!text-gray-600 block !mb-1">Chi tiết:</span>
                {orderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="!flex !justify-between !text-xs !text-gray-500"
                  >
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      {Number(item.price).toLocaleString("vi-VN")} VNĐ
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {timeRemaining > 0 && (
          <div className="!bg-yellow-50 !border !border-yellow-200 !rounded-xl !p-4 !mb-6">
            <div className="!flex !items-center !gap-2 !mb-2">
              <AlertTriangle className="!w-5 !h-5 !text-yellow-600" />
              <span className="!font-semibold !text-yellow-800">
                Đơn hàng sẽ hết hạn
              </span>
            </div>
            <div className="!flex !items-center !gap-2 !text-sm !text-yellow-700">
              <Clock className="!w-4 !h-4" />
              <span>Thời gian còn lại: </span>
              <span className="!font-mono !font-bold !text-yellow-800">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <p className="!text-xs !text-yellow-600 !mt-2">
              Vui lòng hoàn thành thanh toán trước khi đơn hàng hết hạn
            </p>
          </div>
        )}

        {timeRemaining === 0 && (
          <div className="!bg-red-50 !border !border-red-200 !rounded-xl !p-4 !mb-6">
            <div className="!flex !items-center !gap-2 !mb-2">
              <XCircle className="!w-5 !h-5 !text-red-600" />
              <span className="!font-semibold !text-red-800">
                Đơn hàng đã hết hạn
              </span>
            </div>
            <p className="text-sm !text-red-600">
              Đơn hàng của bạn đã hết thời gian giữ. Vui lòng tạo đơn hàng mới.
            </p>
          </div>
        )}

        <div className="!space-y-3">
          <button
            onClick={handleBackToHome}
            className="!w-full !bg-gray-50 hover:!bg-gray-100 !text-gray-600 !font-semibold !py-3 !px-4 !rounded-xl !transition-colors !flex !items-center !justify-center !gap-2"
          >
            <ArrowLeft className="!w-5 !h-5" />
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
