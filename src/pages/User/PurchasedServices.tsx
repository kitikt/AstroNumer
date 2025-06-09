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
      setLoading(false);
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
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
              accept: "text/plain",
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

  const getDaysRemaining = (expiredAt: string) => {
    const now = new Date();
    const expireDate = new Date(expiredAt);
    const diffTime = expireDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "20px",
  };

  const mainCardStyle: React.CSSProperties = {
    maxWidth: "1000px",
    margin: "0 auto",
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
    color: "white",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const contentStyle: React.CSSProperties = {
    padding: "30px",
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: "40px",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const serviceCardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "15px",
    border: "1px solid rgba(79, 172, 254, 0.1)",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  };

  const serviceNameStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "10px",
  };

  const remainingStyle: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const badgeStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
  };

  const usageBadgeStyle: React.CSSProperties = {
    ...badgeStyle,
    background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  };

  const daysBadgeStyle: React.CSSProperties = {
    ...badgeStyle,
    background: "linear-gradient(135deg, #5dade2 0%, #3498db 100%)",
  };

  const emptyStateStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "60px 20px",
    color: "#7f8c8d",
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
    margin: "20px auto",
    maxWidth: "500px",
  };

  const loadingStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "60px",
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
    
    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    
    .back-button:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .service-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(79, 172, 254, 0.15);
    }
    
    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s;
    }
    
    .service-card:hover::before {
      left: 100%;
    }
    
    .loading-spinner {
      animation: pulse 2s infinite;
    }
  `;

  if (!isLoggedIn) {
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
        <div style={errorStyle}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🔒</div>
          Vui lòng đăng nhập để xem trang này.
        </div>
      </div>
    );
  }

  if (loading) {
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
        <div style={mainCardStyle}>
          <div style={loadingStyle} className="loading-spinner">
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>⏳</div>
            Đang tải dịch vụ...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
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
        <div style={errorStyle}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>❌</div>
          Lỗi: {error}
        </div>
      </div>
    );
  }

  const usageServices = services.filter(
    (service) => service.RemainingUsage !== null && service.RemainingUsage > 0
  );

  const timeBasedServices = services.filter(
    (service) => getDaysRemaining(service.ExpiredAt) > 0
  );

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
      <div style={mainCardStyle}>
        <div style={headerStyle}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🛍️</div>
          <h1 style={titleStyle}>Dịch vụ đã mua</h1>
          <p style={{ margin: "10px 0 0", opacity: 0.9, fontSize: "16px" }}>
            Quản lý và theo dõi các dịch vụ của bạn
          </p>
        </div>

        <div style={contentStyle}>
          {services.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>📦</div>
              <h3
                style={{
                  fontSize: "24px",
                  marginBottom: "10px",
                  color: "#2c3e50",
                }}
              >
                Chưa có dịch vụ nào
              </h3>
              <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                Bạn chưa mua dịch vụ nào. Hãy khám phá các gói dịch vụ của chúng
                tôi!
              </p>
            </div>
          ) : (
            <>
              {/* Usage-based services */}
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <span style={{ fontSize: "24px" }}>🎯</span>
                  Theo lần sử dụng
                  <span
                    style={{
                      ...usageBadgeStyle,
                      fontSize: "12px",
                      padding: "4px 8px",
                    }}
                  >
                    {usageServices.length}
                  </span>
                </h2>

                {usageServices.length === 0 ? (
                  <div
                    style={{
                      ...emptyStateStyle,
                      padding: "40px 20px",
                      background:
                        "linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)",
                      borderRadius: "15px",
                      border: "2px dashed rgba(79, 172, 254, 0.3)",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                      🎯
                    </div>
                    <p>Không có dịch vụ theo lần sử dụng</p>
                  </div>
                ) : (
                  usageServices.map((service) => (
                    <div
                      key={service.Id}
                      style={serviceCardStyle}
                      className="service-card"
                    >
                      <div style={serviceNameStyle}>
                        {service.ServicePackageName || service.ComboPackageName}
                      </div>
                      <div style={remainingStyle}>
                        <span style={{ color: "#7f8c8d" }}>Còn lại:</span>
                        <span style={usageBadgeStyle}>
                          🎯 {service.RemainingUsage} lần
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Time-based services */}
              <div style={sectionStyle}>
                <h2 style={sectionTitleStyle}>
                  <span style={{ fontSize: "24px" }}>📅</span>
                  Theo thời gian
                  <span
                    style={{
                      ...daysBadgeStyle,
                      fontSize: "12px",
                      padding: "4px 8px",
                    }}
                  >
                    {timeBasedServices.length}
                  </span>
                </h2>

                {timeBasedServices.length === 0 ? (
                  <div
                    style={{
                      ...emptyStateStyle,
                      padding: "40px 20px",
                      background:
                        "linear-gradient(135deg, #f8f9ff 0%, #e8f2ff 100%)",
                      borderRadius: "15px",
                      border: "2px dashed rgba(79, 172, 254, 0.3)",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                      📅
                    </div>
                    <p>Không có dịch vụ theo thời gian</p>
                  </div>
                ) : (
                  timeBasedServices.map((service) => {
                    const daysRemaining = getDaysRemaining(service.ExpiredAt);
                    const isExpiringSoon = daysRemaining <= 7;

                    return (
                      <div
                        key={service.Id}
                        style={serviceCardStyle}
                        className="service-card"
                      >
                        <div style={serviceNameStyle}>
                          {service.ServicePackageName ||
                            service.ComboPackageName}
                        </div>
                        <div style={remainingStyle}>
                          <span style={{ color: "#7f8c8d" }}>Còn lại:</span>
                          <span
                            style={{
                              ...daysBadgeStyle,
                              ...(isExpiringSoon && {
                                background:
                                  "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
                              }),
                            }}
                          >
                            📅 {daysRemaining} ngày
                            {isExpiringSoon && " ⚠️"}
                          </span>
                        </div>
                        {isExpiringSoon && (
                          <div
                            style={{
                              marginTop: "10px",
                              padding: "8px 12px",
                              background: "rgba(255, 107, 107, 0.1)",
                              borderRadius: "8px",
                              color: "#e74c3c",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            ⚠️ Dịch vụ sắp hết hạn!
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasedServices;
