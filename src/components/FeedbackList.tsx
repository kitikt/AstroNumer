import React, { useEffect, useState } from "react";
import styles from "@/styles/FeedbackList.module.css";

interface Feedback {
  Id?: number;
  Content: string;
  Rating: number;
  PurchasedServiceId: number;
  CreatedAt?: string;
  UpdatedAt?: string;
  IsDeleted?: boolean;
  PurchasedService?: null;
}

interface PurchasedService {
  Id: number;
  ServicePackageName: string;
  PurchasedAt: string;
}

interface FeedbackListProps {
  limit?: number;
  showTitle?: boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  limit = 5,
  showTitle = true,
}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [serviceMap, setServiceMap] = useState<Map<number, string>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchPurchasedServices = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const baseURL = import.meta.env.VITE_API_URL;
      const response = await fetch(
        `${baseURL}/api/v1/purchased-service?page-index=1&page-size=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "text/plain",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.Success && data.Data.Data) {
          const serviceMapping = new Map<number, string>();
          data.Data.Data.forEach((service: PurchasedService) => {
            serviceMapping.set(service.Id, service.ServicePackageName);
          });
          setServiceMap(serviceMapping);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch service names:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError("");

      const baseURL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseURL}/api/Feedback`);

      if (response.ok) {
        const data = await response.json();
        // API returns array directly, not wrapped in success/data structure
        if (Array.isArray(data)) {
          const limitedFeedbacks = data.slice(0, limit);
          setFeedbacks(limitedFeedbacks);
          setIsUsingMockData(false);

          // Fetch service names for the feedbacks
          await fetchPurchasedServices();
        } else {
          throw new Error("Invalid response format - expected array");
        }
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      console.warn("Failed to fetch feedbacks, using mock data:", err);
      setError("Có lỗi xảy ra khi tải feedback");

      // Mock data
      const mockFeedbacks = [
        {
          Id: 1,
          Content: "Dịch vụ rất tốt, tôi rất hài lòng với kết quả!",
          Rating: 5,
          PurchasedServiceId: 1,
          CreatedAt: new Date().toISOString(),
        },
        {
          Id: 2,
          Content: "Chuyên nghiệp và nhanh chóng. Cảm ơn team!",
          Rating: 4,
          PurchasedServiceId: 2,
          CreatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          Id: 3,
          Content: "Kết quả chính xác và hữu ích. Sẽ giới thiệu cho bạn bè.",
          Rating: 5,
          PurchasedServiceId: 3,
          CreatedAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ];

      setFeedbacks(mockFeedbacks.slice(0, limit));
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars: React.JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`${styles.star} ${i <= rating ? styles.filled : ""}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Ngày không xác định";
    }
  };

  const getServiceName = (serviceId: number) => {
    return serviceMap.get(serviceId) || `Dịch vụ #${serviceId}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Đang tải feedback...</div>
      </div>
    );
  }

  if (error && feedbacks.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyText}>Chưa có feedback nào</div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackListContainer}>
      {showTitle && <h3 className={styles.title}>Đánh giá từ khách hàng</h3>}

      {isUsingMockData && (
        <div className={styles.mockDataNotice}>
          <small>💡 Đang hiển thị dữ liệu mẫu (API chưa sẵn sàng)</small>
        </div>
      )}

      <div className={styles.feedbackGrid}>
        {feedbacks.map((feedback, index) => (
          <div key={feedback.Id || index} className={styles.feedbackCard}>
            <div className={styles.feedbackHeader}>
              <div className={styles.ratingContainer}>
                {renderStars(feedback.Rating)}
                <span className={styles.ratingText}>{feedback.Rating}/5</span>
              </div>
              {feedback.CreatedAt && (
                <div className={styles.date}>
                  {formatDate(feedback.CreatedAt)}
                </div>
              )}
            </div>

            <div className={styles.feedbackContent}>
              <p className={styles.content}>{feedback.Content}</p>
            </div>

            {feedback.PurchasedServiceId > 0 && (
              <div className={styles.serviceInfo}>
                <span className={styles.serviceLabel}>Dịch vụ: </span>
                <span className={styles.serviceName}>
                  {getServiceName(feedback.PurchasedServiceId)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
