import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface Service {
  Id: number;
  UserId: string;
  ServicePackageId: number;
  ComboPackageId: string;
  PurchasedAt: string;
  ExpiredAt: string;
  RemainingUsage: number;
  ServicePackageName: string;
  ComboPackageName: string;
}

interface UserProfile {
  Id: string;
  FullName: string | null;
  PhoneNumber: string;
  Email: string;
  Role: string | null;
}

const PurchasedServices = () => {
  const { isLoggedIn } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setError("Vui lòng đăng nhập để xem dịch vụ.");
      setLoading(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/v1/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("Profile API Response Status:", res.status);
        if (!res.ok) {
          return res.json().then((errorData) => {
            console.log("Profile API Error:", errorData);
            throw new Error(
              `Lỗi khi tải thông tin người dùng: ${res.status} - ${
                errorData.message || "Không xác định"
              }`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.Success && data.Data) {
          setUserProfile(data.Data);
          const userId = data.Data.Id;
          console.log("User ID from profile:", userId);
          const queryParams = new URLSearchParams({
            "page-index": "1",
            "page-size": "10",
          }).toString();
          console.log(
            `Fetching: ${apiUrl}/api/v1/purchased-service?${queryParams}`
          );
          return fetch(`${apiUrl}/api/v1/purchased-service?${queryParams}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "text/plain", // Thêm header theo Swagger
            },
          });
        } else {
          throw new Error("Dữ liệu người dùng không hợp lệ.");
        }
      })
      .then((res) => {
        console.log("Purchased Service API Response Status:", res.status);
        if (!res.ok) {
          return res.json().then((errorData) => {
            console.log("Purchased Service API Error:", errorData);
            throw new Error(
              `Lỗi khi tải dịch vụ: ${res.status} - ${
                errorData.message || "Không xác định"
              }`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        if (data.Success && data.Data?.Data) {
          setServices(data.Data.Data);
        } else {
          throw new Error("Dữ liệu dịch vụ không hợp lệ.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <div>Vui lòng đăng nhập để xem trang này.</div>;
  }

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  const getDaysRemaining = (expiredAt: string) => {
    const now = new Date();
    const expireDate = new Date(expiredAt);
    const diffTime = expireDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Dịch vụ đã mua
      </h1>
      {services.length === 0 ? (
        <p>Không có dịch vụ nào được mua.</p>
      ) : (
        <div>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Theo lần dùng
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {services
              .filter(
                (service) =>
                  service.RemainingUsage !== null && service.RemainingUsage > 0
              )
              .map((service) => (
                <li key={service.Id} style={{ marginBottom: "10px" }}>
                  {service.ServicePackageName || service.ComboPackageName}:{" "}
                  {service.RemainingUsage} lần còn lại
                </li>
              ))}
          </ul>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Theo ngày
          </h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {services
              .filter((service) => getDaysRemaining(service.ExpiredAt) > 0)
              .map((service) => (
                <li key={service.Id} style={{ marginBottom: "10px" }}>
                  {service.ServicePackageName || service.ComboPackageName}:{" "}
                  {getDaysRemaining(service.ExpiredAt)} ngày còn lại
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PurchasedServices;
