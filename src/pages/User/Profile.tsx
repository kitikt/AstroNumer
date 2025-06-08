import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

interface UserProfile {
  Id: string;
  FullName: string | null;
  PhoneNumber: string;
  Email: string;
  Role: string | null;
}

const ProfilePage = () => {
  const { isLoggedIn } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setError("Vui lòng đăng nhập để xem thông tin.");
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
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "text/plain",
      },
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
        } else {
          throw new Error("Dữ liệu người dùng không hợp lệ.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#d32f2f" }}>
        Vui lòng đăng nhập để xem trang này.
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#1976d2" }}>
        Đang tải...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#d32f2f" }}>
        Lỗi: {error}
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#1976d2",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Thông tin hồ sơ
      </h1>
      {userProfile ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "6px",
          }}
        >
          <p style={{ margin: "10px 0", fontSize: "16px", color: "#424242" }}>
            <strong>ID:</strong> {userProfile.Id}
          </p>
          <p style={{ margin: "10px 0", fontSize: "16px", color: "#424242" }}>
            <strong>Họ và tên:</strong>{" "}
            {userProfile.FullName || "Chưa cập nhật"}
          </p>
          <p style={{ margin: "10px 0", fontSize: "16px", color: "#424242" }}>
            <strong>Số điện thoại:</strong> {userProfile.PhoneNumber}
          </p>
          <p style={{ margin: "10px 0", fontSize: "16px", color: "#424242" }}>
            <strong>Email:</strong> {userProfile.Email}
          </p>
          <p style={{ margin: "10px 0", fontSize: "16px", color: "#424242" }}>
            <strong>Quyền hạn:</strong> {userProfile.Role || "Chưa gán"}
          </p>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#757575" }}>
          Không có thông tin để hiển thị.
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
