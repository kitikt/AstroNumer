import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  Receipt,
  Clock,
} from "lucide-react";

type CustomerInfo = {
  name?: string;
  phone?: string;
  [key:string]: any;
};

type TransactionData = {
  orderId: string;
  amount: string;
  transactionId: string;
  timestamp: string;
  paymentMethod: string;
  customerInfo: CustomerInfo;
  items: Array<{ name: string; quantity: number; price: number }>;
};

const PaymentReturnPage = () => {
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const [transactionData, setTransactionData] = useState<TransactionData>({
    orderId: "",
    amount: "",
    transactionId: "",
    timestamp: "",
    paymentMethod: "",
    customerInfo: {},
    items: [],
  });

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const id = urlParams.get("id");
        const cancel = urlParams.get("cancel");
        const status = urlParams.get("status");
        const orderCode = urlParams.get("orderCode");

        const storedOrderData = JSON.parse(
          localStorage.getItem("pendingOrder") || "{}"
        );

        let finalStatus = "success";
        if (cancel === "true" || status === "CANCELLED") {
          finalStatus = "failed";
        } else if (code === "00" || status === "PAID") {
          finalStatus = "success";
        } else if (code && code !== "00") {
          finalStatus = "failed";
        }

        const transactionInfo: TransactionData = {
          orderId:
            orderCode ||
            storedOrderData.orderId ||
            urlParams.get("orderId") ||
            "ORD-" + Date.now(),
          amount: storedOrderData.amount || urlParams.get("amount") || "0",
          transactionId:
            id ||
            urlParams.get("transactionId") ||
            "TXN-" + Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleString("vi-VN"),
          paymentMethod: storedOrderData.paymentMethod || "PayOS",
          customerInfo: storedOrderData.customerInfo || {},
          items: storedOrderData.items || [],
        };

        setTimeout(() => {
          setPaymentStatus(finalStatus);
          setTransactionData(transactionInfo);
          if (finalStatus === "success") {
            localStorage.removeItem("pendingOrder");
          }
        }, 1500);
      } catch (error) {
        console.error("Error processing payment return:", error);
        setPaymentStatus("failed");
        setTransactionData({
          orderId: "ERROR-" + Date.now(),
          amount: "0",
          transactionId: "ERROR",
          timestamp: new Date().toLocaleString("vi-VN"),
          paymentMethod: "",
          customerInfo: {},
          items: [],
        });
      }
    };

    checkPaymentStatus();
  }, []);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleViewReceipt = () => {
    alert("Đang tạo hóa đơn...");
  };

  if (paymentStatus === "loading") {
    return (
      <div className="!min-h-screen !bg-gradient-to-br !from-blue-50 !to-indigo-100 !flex !items-center !justify-center !p-4">
        <div className="!bg-white !rounded-2xl !shadow-xl !p-8 !max-w-md !w-full !text-center">
          <div className="!mb-6">
            <Loader2 className="!w-16 !h-16 !text-blue-500 !animate-spin !mx-auto !mb-4" />
            <h2 className="!text-2xl !font-bold !text-gray-800 !mb-2">
              Đang xử lý thanh toán
            </h2>
            <p className="!text-gray-600">Vui lòng chờ trong giây lát...</p>
          </div>
          <div className="!w-full !bg-gray-200 !rounded-full !h-2">
            <div
              className="!bg-blue-500 !h-2 !rounded-full !animate-pulse"
              style={{ width: "70%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="!min-h-screen !bg-gradient-to-br !from-green-50 !to-emerald-100 !flex !items-center !justify-center !p-4">
      <div className="!bg-white !rounded-2xl !shadow-xl !p-8 !max-w-md !w-full">
        {paymentStatus === "success" ? (
          <>
            <div className="!text-center !mb-6">
              <CheckCircle className="!w-20 !h-20 !text-green-500 !mx-auto !mb-4 !animate-bounce" />
              <h1 className="!text-3xl !font-bold !text-gray-800 !mb-2">
                Thanh toán thành công!
              </h1>
              <p className="!text-gray-600">
                Giao dịch của bạn đã được xử lý thành công
              </p>
            </div>

            <div className="!bg-gray-50 !rounded-xl !p-4 !mb-6 !space-y-3">
              <div className="!flex !justify-between !items-center">
                <span className="!text-gray-600">Mã đơn hàng:</span>
                <span className="!font-semibold !text-gray-800">
                  {transactionData.orderId}
                </span>
              </div>
              <div className="!flex !justify-between !items-center">
                <span className="!text-gray-600">Số tiền:</span>
                <span className="!font-semibold !text-green-600">
                  {Number(transactionData.amount).toLocaleString("vi-VN")} VNĐ
                </span>
              </div>
              <div className="!flex !justify-between !items-center">
                <span className="!text-gray-600">Mã giao dịch:</span>
                <span className="!font-semibold !text-gray-800">
                  {transactionData.transactionId}
                </span>
              </div>
              <div className="!flex !justify-between !items-center">
                <span className="!text-gray-600">Phương thức:</span>
                <span className="!font-semibold !text-blue-600">
                  {transactionData.paymentMethod}
                </span>
              </div>
              <div className="!flex !justify-between !items-center">
                <span className="!text-gray-600 !flex !items-center !gap-1">
                  <Clock className="!w-4 !h-4" />
                  Thời gian:
                </span>
                <span className="!font-semibold !text-gray-800">
                  {transactionData.timestamp}
                </span>
              </div>

              {transactionData.customerInfo.name && (
                <div className="!pt-2 !border-t !border-gray-200">
                  <div className="!flex !justify-between !items-center">
                    <span className="!text-gray-600">Khách hàng:</span>
                    <span className="!font-semibold !text-gray-800">
                      {transactionData.customerInfo.name}
                    </span>
                  </div>
                  {transactionData.customerInfo.phone && (
                    <div className="!flex !justify-between !items-center">
                      <span className="!text-gray-600">SĐT:</span>
                      <span className="!font-semibold !text-gray-800">
                        {transactionData.customerInfo.phone}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {transactionData.items.length > 0 && (
                <div className="!pt-2 !border-t !border-gray-200">
                  <span className="!text-gray-600 !text-sm !mb-2 !block">
                    Sản phẩm:
                  </span>
                  {transactionData.items.map((item, index) => (
                    <div
                      key={index}
                      className="!flex !justify-between !text-sm !text-gray-700 !mb-1"
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

            <div className="!space-y-3">
              <button
                onClick={handleViewReceipt}
                className="!w-full !bg-blue-500 hover:!bg-blue-600 !text-white !font-semibold !py-3 !px-4 !rounded-xl !flex !items-center !justify-center !gap-2"
              >
                <Receipt className="!w-5 !h-5" />
                Xem hóa đơn
              </button>
              <button
                onClick={handleBackToHome}
                className="!w-full !bg-gray-100 hover:!bg-gray-200 !text-gray-700 !font-semibold !py-3 !px-4 !rounded-xl !flex !items-center !justify-center !gap-2"
              >
                <ArrowLeft className="!w-5 !h-5" />
                Về trang chủ
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="!text-center !mb-6">
              <XCircle className="!w-20 !h-20 !text-red-500 !mx-auto !mb-4" />
              <h1 className="!text-3xl !font-bold !text-gray-800 !mb-2">
                Thanh toán thất bại
              </h1>
              <p className="!text-gray-600">
                Đã có lỗi xảy ra trong quá trình thanh toán
              </p>
            </div>

            <div className="!bg-red-50 !border !border-red-200 !rounded-xl !p-4 !mb-6">
              <p className="!text-red-700 !text-sm">
                Giao dịch không thể hoàn thành. Vui lòng kiểm tra lại và thử
                lại.
              </p>
            </div>

            <div className="!space-y-3">
              <button
                onClick={() => window.history.back()}
                className="!w-full !bg-red-500 hover:!bg-red-600 !text-white !font-semibold !py-3 !px-4 !rounded-xl"
              >
                Thử lại
              </button>
              <button
                onClick={handleBackToHome}
                className="!w-full !bg-gray-100 hover:!bg-gray-200 !text-gray-700 !font-semibold !py-3 !px-4 !rounded-xl !flex !items-center !justify-center !gap-2"
              >
                <ArrowLeft className="!w-5 !h-5" />
                Về trang chủ
              </button>
            </div>
          </>
        )}

        <div className="!mt-6 !pt-4 !border-t !border-gray-200 !text-center">
          <p className="!text-xs !text-gray-500">
            Cần hỗ trợ? Liên hệ: support@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturnPage;
