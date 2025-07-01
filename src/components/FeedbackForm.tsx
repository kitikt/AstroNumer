import React, { useState, useEffect } from "react";
import FeedbackSuccessModal from "./FeedbackSuccessModal";
import styles from "@/styles/FeedbackForm.module.css";

interface Feedback {
  Id?: number;
  Content: string;
  Rating: number;
  PurchasedServiceId: number;
  CreatedAt?: string;
  UpdatedAt?: string;
}

interface PurchasedService {
  Id: number;
  UserId: string;
  ServicePackageId: number;
  ComboPackageId: number | null;
  PurchasedAt: string;
  ExpiredAt: string;
  RemainingUsage: number;
  ServicePackageName: string;
  ComboPackageName: string | null;
}

interface PurchasedServiceResponse {
  StatusCode: number;
  Success: boolean;
  Message: string;
  Data: {
    Data: PurchasedService[];
    Meta: {
      TotalCount: number;
      PageSize: number;
      CurrentPage: number;
      TotalPages: number;
      HasPrevious: boolean;
      HasNext: boolean;
    };
  };
  Errors: string[];
  TraceId: string;
  Meta: null;
}

interface FeedbackFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  purchasedServiceId?: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSuccess,
  onCancel,
  purchasedServiceId = 0,
}) => {
  const [formData, setFormData] = useState<Feedback>({
    Content: "",
    Rating: 5,
    PurchasedServiceId: purchasedServiceId,
  });
  const [purchasedServices, setPurchasedServices] = useState<
    PurchasedService[]
  >([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    fetchPurchasedServices();
  }, []);

  const fetchPurchasedServices = async () => {
    try {
      setLoadingServices(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Vui lòng đăng nhập để gửi feedback");
        return;
      }

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
        const data: PurchasedServiceResponse = await response.json();
        if (data.Success && data.Data.Data) {
          setPurchasedServices(data.Data.Data);
          // Set first service as default if no service is pre-selected
          if (purchasedServiceId === 0 && data.Data.Data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              PurchasedServiceId: data.Data.Data[0].Id,
            }));
          }
        } else {
          setError("Không thể tải danh sách dịch vụ đã mua");
        }
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (err) {
      console.warn("Failed to fetch purchased services:", err);
      setError("Có lỗi xảy ra khi tải danh sách dịch vụ");
    } finally {
      setLoadingServices(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("Content changed:", e.target.value); // Debug log
    setFormData({
      ...formData,
      Content: e.target.value,
    });
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const serviceId = value ? parseInt(value) : 0;
    console.log("Service changed:", value, "ServiceId:", serviceId); // Debug log
    setFormData({
      ...formData,
      PurchasedServiceId: serviceId,
    });
  };

  const handleRatingChange = (rating: number) => {
    console.log("Rating changed:", rating); // Debug log
    setFormData({
      ...formData,
      Rating: rating,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData); // Debug log

    if (!formData.Content.trim()) {
      console.log("Content validation failed"); // Debug log
      setError("Vui lòng nhập nội dung feedback");
      return;
    }

    if (!formData.PurchasedServiceId || formData.PurchasedServiceId === 0) {
      console.log(
        "Service validation failed, PurchasedServiceId:",
        formData.PurchasedServiceId
      ); // Debug log
      setError("Vui lòng chọn dịch vụ để đánh giá");
      return;
    }

    console.log("Validation passed, proceeding with submission"); // Debug log
    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vui lòng đăng nhập để gửi feedback");
        return;
      }

      const baseURL = import.meta.env.VITE_API_URL;
      console.log("Sending feedback data:", formData); // Debug log

      const response = await fetch(`${baseURL}/api/Feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status); // Debug log

      if (response.ok) {
        // API returns the created feedback object directly
        const result = await response.json();
        console.log("Feedback created successfully:", result); // Debug log

        setFormData({
          Content: "",
          Rating: 5,
          PurchasedServiceId: purchasedServiceId,
        });
        setShowSuccessModal(true);
        onSuccess?.();
      } else {
        const errorData = await response.text();
        console.error("API Error:", response.status, errorData); // Debug log
        throw new Error(`HTTP ${response.status}: ${errorData}`);
      }
    } catch (err) {
      console.error("Failed to create feedback:", err);
      setError("Dịch vụ này đã được gửi đánh giá trước đó.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsClosing(true);
    setTimeout(() => {
      onCancel?.();
    }, 300);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    handleCancel();
  };

  const renderStars = () => {
    const stars: React.JSX.Element[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`${styles.star} ${
            i <= formData.Rating ? styles.filled : ""
          }`}
          onClick={() => handleRatingChange(i)}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <>
      <div
        className={`${styles.feedbackFormContainer} ${
          isClosing ? styles.closing : ""
        }`}
      >
        <div
          className={`${styles.feedbackForm} ${
            isClosing ? styles.closing : ""
          }`}
        >
          <h2 className={styles.title}>Gửi Feedback</h2>

          {/* Debug info */}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.serviceSection}>
              <label htmlFor="service" className={styles.label}>
                Chọn dịch vụ đánh giá:
              </label>
              <select
                id="service"
                value={formData.PurchasedServiceId || ""}
                onChange={handleServiceChange}
                className={styles.select}
                disabled={loadingServices}
                required
              >
                {loadingServices ? (
                  <option value="">Đang tải dịch vụ...</option>
                ) : purchasedServices.length === 0 ? (
                  <option value="">Không có dịch vụ nào</option>
                ) : (
                  <>
                    <option value="">Chọn dịch vụ</option>
                    {purchasedServices.map((service) => (
                      <option key={service.Id} value={service.Id}>
                        {service.ServicePackageName} - Mua ngày{" "}
                        {new Date(service.PurchasedAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </div>

            <div className={styles.ratingSection}>
              <label className={styles.label}>Đánh giá của bạn:</label>
              <div className={styles.starsContainer}>
                {renderStars()}
                <span className={styles.ratingText}>{formData.Rating}/5</span>
              </div>
            </div>

            <div className={styles.contentSection}>
              <label htmlFor="content" className={styles.label}>
                Nội dung feedback:
              </label>
              <textarea
                id="content"
                value={formData.Content}
                onChange={handleInputChange}
                placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                className={styles.textarea}
                rows={5}
                required
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.buttons}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.cancelButton}
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || loadingServices}
                onClick={() => console.log("Submit button clicked")}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi Feedback"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <FeedbackSuccessModal
        isVisible={showSuccessModal}
        onClose={handleSuccessModalClose}
      />
    </>
  );
};

export default FeedbackForm;
