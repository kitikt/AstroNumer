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

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const cardStyle: React.CSSProperties = {
    maxWidth: "500px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    animation: "fadeInUp 0.6s ease-out",
  };

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    padding: "40px 30px",
    textAlign: "center",
    position: "relative",
  };

  const avatarStyle: React.CSSProperties = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    margin: "0 auto 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    color: "white",
    fontWeight: "bold",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "28px",
    fontWeight: "700",
    color: "white",
    margin: "0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const contentStyle: React.CSSProperties = {
    padding: "30px",
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: "25px",
    padding: "20px",
    background: "linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)",
    borderRadius: "12px",
    border: "1px solid rgba(79, 172, 254, 0.1)",
    transition: "all 0.3s ease",
    position: "relative",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "600",
    color: "#4facfe",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
    display: "block",
  };

  const valueStyle: React.CSSProperties = {
    fontSize: "16px",
    color: "#2c3e50",
    fontWeight: "500",
  };

  const errorStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
    boxShadow: "0 8px 20px rgba(238, 90, 36, 0.3)",
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "40px",
    color: "#4facfe",
    fontSize: "18px",
    fontWeight: "500",
  };

  const backButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    left: "20px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    padding: "12px 20px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    zIndex: 10,
  };

  // Add keyframes animation via style tag
  const animationStyles = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }
    
    .profile-field:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(79, 172, 254, 0.15);
    }
    
    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .loading-spinner {
      animation: pulse 2s infinite;
    }
  `;

  if (!isLoggedIn) {
    return (
      <div style={containerStyle}>
        <style>{animationStyles}</style>
        <div style={cardStyle}>
          <div style={errorStyle}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔒</div>
            Vui lòng đăng nhập để xem trang này.
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <style>{animationStyles}</style>
        <div style={cardStyle}>
          <div style={loadingStyle} className="loading-spinner">
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>⏳</div>
            Đang tải thông tin...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <style>{animationStyles}</style>
        <div style={cardStyle}>
          <div style={errorStyle}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>❌</div>
            Lỗi: {error}
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplay = (role: string | null): string => {
    if (!role || role === "Chưa gán") return "Người dùng";
    return role;
  };

  const getRoleBadgeColor = (role: string | null): string => {
    switch (role) {
      case "Admin":
        return "#e74c3c";
      case "Manager":
        return "#f39c12";
      default:
        return "#27ae60";
    }
  };

  return (
    <div style={containerStyle}>
      <style>{animationStyles}</style>
      <a
        href="/"
        style={backButtonStyle}
        className="back-button"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
      >
        ← Về trang chủ
      </a>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={avatarStyle}>{getInitials(userProfile?.FullName)}</div>
          <h1 style={titleStyle}>Thông tin hồ sơ</h1>
        </div>

        {userProfile ? (
          <div style={contentStyle}>
            <div style={fieldStyle} className="profile-field">
              <span style={labelStyle}>Họ và tên</span>
              <div style={valueStyle}>
                {userProfile.FullName || "Chưa cập nhật"}
              </div>
            </div>

            <div style={fieldStyle} className="profile-field">
              <span style={labelStyle}>Số điện thoại</span>
              <div style={valueStyle}>{userProfile.PhoneNumber}</div>
            </div>

            <div style={fieldStyle} className="profile-field">
              <span style={labelStyle}>Email</span>
              <div style={valueStyle}>{userProfile.Email}</div>
            </div>

            <div style={fieldStyle} className="profile-field">
              <span style={labelStyle}>Quyền hạn</span>
              <div
                style={{
                  ...valueStyle,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {getRoleDisplay(userProfile.Role)}
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "white",
                    background: getRoleBadgeColor(userProfile.Role),
                  }}
                >
                  {getRoleDisplay(userProfile.Role)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div style={contentStyle}>
            <div
              style={{
                textAlign: "center",
                color: "#7f8c8d",
                padding: "40px",
                fontSize: "16px",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>📄</div>
              Không có thông tin để hiển thị.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
